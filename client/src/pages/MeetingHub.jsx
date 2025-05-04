import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import CreateMeetingForm from '../components/Meeting/CreateMeetingForm';
import LiveMeetingList from '../components/Meeting/LiveMeetingForm';

const MeetingHub = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`${apiUrl}/rooms`);
      console.log(res);
      setMeetings(res.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeeting = async (newMeeting) => {
    try {
      const res = await axios.post(`${apiUrl}/rooms`, newMeeting);
      setMeetings(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Error creating meeting:', err);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const toggleCreateRoom = ()=>{
    setShowCreateRoom(!showCreateRoom);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Meeting Hub</h1>
        <p className="text-gray-600">Create or Join meetings, and view active sessions</p>
      </header>

      <div>
      <button onClick={toggleCreateRoom} className="mt-4 bg-yellow-400 text-purple-900 font-bold py-2 rounded-full shadow w-40 hover:bg-yellow-300 transition-all duration-200"
              >Create Room</button>
          {showCreateRoom?<CreateMeetingForm onCreate={handleCreateMeeting} />:""}
      </div>

      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading meetings...</p>
      ) : (
        <LiveMeetingList meetings={meetings} />
      )}
    </div>
  );
};

export default memo(MeetingHub);
