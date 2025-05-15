import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import useMedia from '../hooks/useMedia';

import VideoGrid from '../components/Room/VideoGrid';
import Controls from '../components/Room/Controls';
import ChatBox from '../components/Room/ChatBox';

import { toast, Bounce } from 'react-toastify';

export default function VideoChat() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const username = localStorage.getItem('username');

  const localVideo = useRef(null);
  const {
    socketRef,
    peersRef,
    remoteStreams,
    messages,
    // chatInput,
    // setChatInput,
    sendMessage,
  } = useSocket(roomId, username, localVideo);

  const {
    isCameraOn,
    isMicOn,
    toggleCamera,
    toggleMic,
    handleScreenShare
  } = useMedia(socketRef, peersRef, localVideo);

  const handleLeave = () => {
    toast.success('Left From Meeting!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    socketRef.current?.disconnect();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🎥 Room: {roomId}</h1>

      <VideoGrid localVideo={localVideo} remoteStreams={remoteStreams} />

      <Controls
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        toggleCamera={toggleCamera}
        toggleMic={toggleMic}
        handleScreenShare={handleScreenShare}
        toggleChat={() => setShowChat(prev => !prev)}
        handleLeave={handleLeave}
      />

      {showChat && (
        <ChatBox
          messages={messages}
          // chatInput={chatInput}
          // setChatInput={setChatInput}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}
