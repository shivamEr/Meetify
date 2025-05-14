import React from 'react';
import {
  FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash,
  FaDesktop, FaEllipsisH, FaPhoneSlash, FaComment
} from 'react-icons/fa';

export default function Controls({ isCameraOn, isMicOn, toggleCamera, toggleMic, handleScreenShare, toggleChat, handleLeave }) {
  return (
    <div className="flex justify-center gap-4">
      <button onClick={handleScreenShare} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow"><FaDesktop /></button>
      <button onClick={toggleCamera} className={`px-4 py-2 rounded-lg shadow ${isCameraOn ? 'bg-red-600' : 'bg-green-600'}`}>{isCameraOn ? <FaVideo /> : <FaVideoSlash />}</button>
      <button onClick={toggleMic} className={`px-4 py-2 rounded-lg shadow ${isMicOn ? 'bg-red-600' : 'bg-green-600'}`}>{isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}</button>
      <button onClick={toggleChat} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg shadow"><FaComment /></button>
      <button className="px-4 py-2 rounded-lg shadow bg-green-600 hover:bg-green-700"><FaEllipsisH /></button>
      <button onClick={handleLeave} className="px-4 py-2 rounded-lg shadow bg-red-600 hover:bg-red-700"><FaPhoneSlash /></button>
    </div>
  );
}
