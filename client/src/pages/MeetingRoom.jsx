import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

// Icons
import {
  FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash,
  FaDesktop, FaEllipsisH, FaPhoneSlash,
  FaComment,
} from 'react-icons/fa';

export default function VideoChat() {
  const apiUrl = import.meta.env.VITE_SOCKET_SERVER;
  const { roomId } = useParams();

  const socketRef = useRef(null);
  const localVideo = useRef(null);
  const localStream = useRef(null);
  const peersRef = useRef({});

  const [remoteStreams, setRemoteStreams] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const username = localStorage.getItem('username');
  // console.log(username);

  // Setup media and socket handlers
  useEffect(() => {
    // Initialize socket once per component lifecycle
    if (!socketRef.current) {
      socketRef.current = io(apiUrl, { transports: ['websocket'] });
    }
    const socket = socketRef.current;

    const start = async () => {
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      if (localVideo.current) localVideo.current.srcObject = stream;

      // Join the room
      socket.emit('join-room', {
        roomId,
        user: { id: socket.id, name: username }
      });

      // When a new user joins
      socket.on('user-joined', async (userId) => {
        if (peersRef.current[userId]) return;
        const peer = createPeer(userId, socket);
        peersRef.current[userId] = peer;

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit('signal', { to: userId, from: socket.id, signal: offer });
      });

      // Handle signaling data
      socket.on('signal', async ({ from, signal }) => {
        let peer = peersRef.current[from];
        if (!peer) {
          peer = createPeer(from, socket);
          peersRef.current[from] = peer;
        }

        if (signal.type === 'offer') {
          await peer.setRemoteDescription(new RTCSessionDescription(signal));
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socket.emit('signal', { to: from, from: socket.id, signal: answer });
        } else if (signal.type === 'answer') {
          await peer.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
          await peer.addIceCandidate(new RTCIceCandidate(signal));
        }
      });

      // When a user leaves
      socket.on('user-left', (userId) => {
        if (peersRef.current[userId]) {
          peersRef.current[userId].close();
          delete peersRef.current[userId];
        }
        setRemoteStreams(prev => prev.filter(s => s.userId !== userId));
      });

      // Media toggle events
      socket.on('media-toggle', ({ from, type, state }) => {
        console.log(`Peer ${from} toggled ${type}: ${state}`);
      });

      // Screen share events
      socket.on('screen-share-started', ({ from }) => {
        console.log(`Peer ${from} started screen share`);
      });
      socket.on('screen-share-stopped', ({ from }) => {
        console.log(`Peer ${from} stopped screen share`);
      });
    };

    start();

    // Cleanup on unmount or roomId change
    return () => {
      socket.off('user-joined');
      socket.off('signal');
      socket.off('user-left');
      socket.off('media-toggle');
      socket.off('screen-share-started');
      socket.off('screen-share-stopped');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, apiUrl]);

  // Chat message listener
  useEffect(() => {
    const socket = socketRef.current;
    const handleMessage = (msg) => setMessages(prev => [...prev, msg]);
    socket.on('chat-message', handleMessage);
    return () => socket.off('chat-message', handleMessage);
  }, []);

  // Helper to create RTCPeerConnection
  const createPeer = (peerId, socket) => {
    // fetching stun credential
    //  const response = await fetch(`${apiUrl}/api/ice-servers`);
    //  const iceServers = await response.json();
    //  console.log(iceServers);

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.xirsys.com" }
      ]
    });
    localStream.current.getTracks().forEach(track => pc.addTrack(track, localStream.current));

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('signal', { to: peerId, from: socket.id, signal: e.candidate });
      }
    };

    pc.ontrack = (e) => {
      const newStream = e.streams[0];
      newStream.userId = peerId;
      setRemoteStreams(prev => [...prev.filter(s => s.id !== newStream.id), newStream]);
    };

    return pc;
  };

  // Screen sharing
  const handleScreenShare = async () => {
    const socket = socketRef.current;
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = Object.values(peersRef.current)
        .flatMap(p => p.getSenders())
        .find(s => s.track.kind === 'video');

      if (sender) sender.replaceTrack(screenTrack);
      socket.emit('screen-share-start', { roomId });

      screenTrack.onended = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const cameraTrack = cameraStream.getVideoTracks()[0];
        if (sender) sender.replaceTrack(cameraTrack);
        if (localVideo.current) localVideo.current.srcObject = cameraStream;
        socket.emit('screen-share-stop', { roomId });
      };

      if (localVideo.current) localVideo.current.srcObject = screenStream;
    } catch (err) {
      console.error('[VideoChat] Error sharing screen:', err);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    const socket = socketRef.current;
    const videoTrack = localStream.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);
    socket.emit('media-toggle', { roomId, type: 'video', state: videoTrack.enabled });
  };

  // Toggle microphone
  const toggleMic = () => {
    const socket = socketRef.current;
    const audioTrack = localStream.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
    socket.emit('media-toggle', { roomId, type: 'audio', state: audioTrack.enabled });
  };

  // Send chat message
  const sendMessage = () => {
    const socket = socketRef.current;
    if (!chatInput.trim()) return;
    const msg = { sender: username, message: chatInput };
    socket.emit('chat-message', { roomId, ...msg });
    setMessages(prev => [...prev, msg]);
    setChatInput('');
  };
  
  const navigate = useNavigate();
  const handleLeft = ()=>{
    const socket = socketRef.current;
    socket.disconnect();
    console.log("f-user disconnect")
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🎥 Room: {roomId}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <video ref={localVideo} autoPlay muted playsInline className="rounded-2xl shadow-lg border border-gray-700" />
        {remoteStreams.map((stream, i) => (
          <video
            key={i}
            autoPlay
            playsInline
            className="rounded-2xl shadow-lg border border-gray-700"
            ref={video => video && (video.srcObject = stream)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">

        <button onClick={handleScreenShare} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow"><FaDesktop /></button>
        <button onClick={toggleCamera} className={`px-4 py-2 rounded-lg shadow ${isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>{isCameraOn ? <FaVideo /> : <FaVideoSlash />}</button>
        <button onClick={toggleMic} className={`px-4 py-2 rounded-lg shadow ${isMicOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>{isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}</button>
        <button onClick={() => setShowChat(prev => !prev)} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg shadow"><FaComment /></button>
        <button className={`px-4 py-2 rounded-lg shadow  bg-green-600 hover:bg-green-700`}><FaEllipsisH /></button>
        {/* <button className={`px-4 py-2 rounded-lg shadow  bg-green-600 hover:bg-green-700`}><FaHandPaper/></button> */}
        <button className={`px-4 py-2 rounded-lg shadow  bg-red-600 hover:bg-red-700`} onClick={handleLeft}><FaPhoneSlash/></button>
      </div>

      {showChat && (
        <div className="bg-gray-800 rounded-xl p-4 shadow-md max-w-xl mx-auto">
          <div className="h-40 overflow-y-auto space-y-1 border-b border-gray-700 pb-2">
            {messages.map((msg, i) => (
              <div key={i} className="flex">
                <span className="font-semibold text-blue-400 mr-2">{msg.sender}:</span>
                <span>{msg.message}</span>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button onClick={sendMessage} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}