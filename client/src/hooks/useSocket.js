import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import createPeer from '../utils/createPeer';

export default function useSocket(roomId, username, localVideo) {
  const apiUrl = import.meta.env.VITE_SOCKET_SERVER;
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const localStream = useRef(null);

  const [remoteStreams, setRemoteStreams] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(apiUrl, { transports: ['websocket'] });
    }
    const socket = socketRef.current;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      if (localVideo.current) localVideo.current.srcObject = stream;

      socket.emit('join-room', {
        roomId,
        user: { id: socket.id, name: username }
      });

      socket.on('user-joined', async (userId) => {
        if (peersRef.current[userId]) return;
        const peer = createPeer(userId, socket, localStream.current, setRemoteStreams);
        peersRef.current[userId] = peer;

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit('signal', { to: userId, from: socket.id, signal: offer });
      });

      socket.on('signal', async ({ from, signal }) => {
        let peer = peersRef.current[from];
        if (!peer) {
          peer = createPeer(from, socket, localStream.current, setRemoteStreams);
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

      socket.on('user-left', (userId) => {
        if (peersRef.current[userId]) {
          peersRef.current[userId].close();
          delete peersRef.current[userId];
        }
        setRemoteStreams(prev => prev.filter(s => s.userId !== userId));
      });

      socket.on('chat-message', msg => {
        setMessages(prev => [...prev, msg]);
      });
    };

    start();

    return () => {
      socket.disconnect();
      socketRef.current = null;
      peersRef.current = {};
    };
  }, [roomId, apiUrl]);

  const sendMessage = () => {
    const socket = socketRef.current;
    if (!chatInput.trim()) return;
    const msg = { sender: username, message: chatInput };
    socket.emit('chat-message', { roomId, ...msg });
    setMessages(prev => [...prev, msg]);
    setChatInput('');
  };

  return {
    socketRef,
    peersRef,
    remoteStreams,
    messages,
    chatInput,
    setChatInput,
    sendMessage,
  };
}
