import React, { useState } from 'react';
import CreateMeetingForm from '../components/Meeting/CreateMeetingForm';
import JoinMeetingForm from '../components/Meeting/JoinMeetingForm';
import LiveMeetingList from '../components/Meeting/LiveMeetingForm';

const MeetingHub = () => {
  const sample = [
    {
      name: "Daily Standup",
      topic: "Team Updates",
      language: "English",
      privacy: "Private",
      capacity: 10,
    },
    {
      name: "React Workshop",
      topic: "React Basics & Hooks",
      language: "English",
      privacy: "Public",
      capacity: 100,
    },
    {
      name: "French Speaking Club",
      topic: "Conversational French",
      language: "French",
      privacy: "Public",
      capacity: 25,
    },
    {
      name: "Product Strategy",
      topic: "Q2 Roadmap Planning",
      language: "English",
      privacy: "Private",
      capacity: 15,
    },
    {
      name: "Open AI Q&A",
      topic: "AI and ChatGPT Discussion",
      language: "English",
      privacy: "Public",
      capacity: 200,
    },
  ];
  
  const [meetings, setMeetings] = useState(sample);

  const handleCreateMeeting = (newMeeting) => {
    setMeetings([...meetings, newMeeting]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Meeting Hub</h1>
        <p className="text-gray-600">Create or Join meetings, and view active sessions</p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        <CreateMeetingForm onCreate={handleCreateMeeting} />
        <JoinMeetingForm />
      </div>

      <LiveMeetingList meetings={meetings} />
    </div>
  );
};

export default MeetingHub;
