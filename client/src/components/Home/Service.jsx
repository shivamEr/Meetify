const features = [
    { title: "Real-Time Video Conferencing", desc: "Seamless, high-quality video & audio powered by WebRTC technology." },
    { title: "AI Meeting Summarization", desc: "Automatically summarize meetings using AI and send PDF to attendees." },
    { title: "Group & Permission Control", desc: "Public/private meetings with admin controls and invite-based access." },
    { title: "AI Assistant Chat", desc: "In-meeting chatbot helps with tasks, questions, and highlights." },
    { title: "Meeting Archives & Search", desc: "Access previous meetings, transcripts, and summaries at any time." },
    { title: "Smart Analytics", desc: "View engagement, sentiment, and action items after every session." },
  ];
  
  const Services = () => (
    <section id="services" className="py-16 bg-gray-100 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded shadow hover:shadow-md transition duration-300">
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
  export default Services;
  