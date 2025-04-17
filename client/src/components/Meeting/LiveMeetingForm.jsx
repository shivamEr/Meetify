import React from 'react';
import { Link } from 'react-router-dom';

const LiveMeetingList = ({ meetings }) => {
  return (
    <div className="relative bg-gradient-to-r from-fuchsia-600 via-purple-700 to-indigo-800 text-white p-6 rounded-3xl shadow-xl mt-10 overflow-hidden">
      {/* Glowing animated background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-2xl animate-spin-slow"></div>

      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-lg">
        🚀 Live Meetings
      </h2>

      {meetings.length === 0 ? (
        <p className="text-center text-white/80">No live meetings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {meetings.map((meeting, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2">{meeting.name}</h3>
              <p className="text-white/90"><strong>Topic:</strong> {meeting.topic}</p>
              <p className="text-white/90"><strong>Language:</strong> {meeting.language}</p>
              <p className="text-white/90"><strong>Privacy:</strong> {meeting.privacy}</p>
              <p className="text-white/90"><strong>Capacity:</strong> {meeting.capacity}</p>
              <Link to="/room"><button className="mt-4 bg-yellow-400 text-purple-900 font-bold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition-all duration-200">
                ✨ Join Now
              </button></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveMeetingList;
