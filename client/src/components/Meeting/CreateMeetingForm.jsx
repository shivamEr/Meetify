import React, { useState } from 'react';

const CreateMeetingForm = ({ onCreate }) => {
  const [privacy, setPrivacy] = useState('public');
  const [meetingKey, setMeetingKey] = useState('');

  const handlePrivacyChange = (value) => {
    setPrivacy(value);
    if (value === 'private') {
      const key = Math.random().toString(36).substr(2, 10).toUpperCase();
      setMeetingKey(key);
    } else {
      setMeetingKey('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.groupName.value,
      topic: form.topic.value,
      language: form.language.value,
      capacity: form.capacity.value,
      privacy,
      meetingKey,
    };
    onCreate(data);
    form.reset();
    setPrivacy('public');
    setMeetingKey('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 p-8 rounded-3xl shadow-2xl text-white space-y-6 mt-10 relative overflow-hidden">
      {/* Glowing background animation */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-500 opacity-30 blur-3xl rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 opacity-20 blur-2xl rounded-full pointer-events-none animate-spin-slow"></div>

      <h2 className="text-3xl font-extrabold text-center drop-shadow-md">🎤 Create a New Meeting</h2>

      <input
        name="groupName"
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
        placeholder="Group Name"
        required
      />

      <input
        name="topic"
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
        placeholder="Meeting Topic"
        required
      />

      <select
        name="language"
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Bhojpuri</option>
        <option>Maithili</option>
        <option>Other</option>
      </select>

      <input
        name="capacity"
        type="number"
        min="2"
        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
        placeholder="Capacity"
        required
      />

      <div className="flex items-center space-x-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="privacy"
            value="public"
            checked={privacy === 'public'}
            onChange={() => handlePrivacyChange('public')}
            className="accent-yellow-400"
          />
          <span className="ml-2 text-white/90">Public</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="privacy"
            value="private"
            checked={privacy === 'private'}
            onChange={() => handlePrivacyChange('private')}
            className="accent-yellow-400"
          />
          <span className="ml-2 text-white/90">Private</span>
        </label>
      </div>

      {privacy === 'private' && (
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Secret Meeting Key</label>
          <input
            type="text"
            value={meetingKey}
            readOnly
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-yellow-300 font-mono"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-yellow-400 text-purple-900 font-bold px-4 py-3 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
      >
        🚀 Create Meeting
      </button>
    </form>
  );
};

export default CreateMeetingForm;
