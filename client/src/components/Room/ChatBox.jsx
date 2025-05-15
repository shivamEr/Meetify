import React, { useState } from 'react';

export default function ChatBox({ messages, sendMessage }) {
  const [chatInput, setChatInput] = useState("");
  const handleMessage = ()=>{
    sendMessage(chatInput);
    setChatInput("");
  }
  return (
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
          onKeyDown={e => e.key === 'Enter' && handleMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button onClick={handleMessage} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>
  );
}
