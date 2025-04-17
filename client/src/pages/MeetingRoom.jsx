import React, { useState } from 'react';
import { FaMicrophoneSlash, FaVideoSlash, FaDesktop, FaEllipsisH, FaSmile, FaHandPaper, FaRobot, FaPhoneSlash } from 'react-icons/fa';

const MeetingRoom = () => {
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="h-screen w-full bg-[#121212] text-white flex flex-col justify-between items-center px-6 py-4 relative">
      
      {/* AI Panel */}
      {showAI && (
        <div className="absolute top-6 right-6 bg-[#1f1f1f] p-5 rounded-xl shadow-xl w-72 z-50">
          <h5 className="text-lg font-semibold mb-4">🤖 AI Assistant</h5>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>📄 <strong>Summary</strong></li>
            <li>📝 <strong>Action Items</strong></li>
            <li>📊 <strong>Meeting Analytics</strong></li>
            <li>🌐 <strong>Live Translation</strong></li>
            <li>💬 <strong>Chat Assistant</strong></li>
          </ul>
        </div>
      )}

      {/* Meeting Info */}
      <div className="absolute bottom-28 left-6 text-gray-400 text-sm">
        12:58 PM &nbsp; | &nbsp; <strong>qhd-zery-kcx</strong>
      </div>

      {/* Video / Avatars */}
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="text-center">
          <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
            S
          </div>
          <div className="mt-4 text-xl font-medium">Gaust User</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-black/60 px-6 py-4 rounded-full flex gap-5 items-center justify-center shadow-lg">
        <button title="Mic" className="hover:bg-gray-700 p-3 rounded-full">
          <FaMicrophoneSlash size={20} />
        </button>
        <button title="Camera" className="hover:bg-gray-700 p-3 rounded-full">
          <FaVideoSlash size={20} />
        </button>
        <button title="Present" className="hover:bg-gray-700 p-3 rounded-full">
          <FaDesktop size={20} />
        </button>
        <button title="More" className="hover:bg-gray-700 p-3 rounded-full">
          <FaEllipsisH size={20} />
        </button>
        <button title="Emoji" className="hover:bg-gray-700 p-3 rounded-full">
          <FaSmile size={20} />
        </button>
        <button title="Raise Hand" className="hover:bg-gray-700 p-3 rounded-full">
          <FaHandPaper size={20} />
        </button>
        <button
          title="AI Assistant"
          className="hover:bg-gray-700 p-3 rounded-full"
          onClick={() => setShowAI(!showAI)}
        >
          <FaRobot size={20} />
        </button>
        <button title="End Call" className="bg-red-600 hover:bg-red-700 p-3 rounded-full">
          <FaPhoneSlash size={20} />
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
