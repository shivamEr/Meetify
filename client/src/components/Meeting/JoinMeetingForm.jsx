import React from 'react';

const JoinMeetingForm = () => {
  return (
    <form className="max-w-md mx-auto bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 p-8 rounded-3xl shadow-2xl text-white space-y-6 mt-10 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-lime-400 opacity-20 blur-3xl rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 blur-2xl rounded-full pointer-events-none animate-spin-slow"></div>

      <h2 className="text-3xl font-extrabold text-center drop-shadow-md">🔓 Join a Meeting</h2>

      <input
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
        placeholder="Your Name"
        required
      />

      <input
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
        placeholder="Group Name"
        required
      />

      <input
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
        placeholder="Meeting Key (if private)"
      />

      <button
        type="button"
        className="w-full bg-white text-green-700 font-bold px-4 py-3 rounded-full hover:bg-green-100 transition-all duration-300 shadow-lg"
      >
        🚪 Join Meeting
      </button>
    </form>
  );
};

export default JoinMeetingForm;
