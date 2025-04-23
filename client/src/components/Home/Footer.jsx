const Footer = () => (
  <footer className="bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-700 text-white py-8 px-4 text-center relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-500 opacity-20 blur-3xl rounded-full pointer-events-none animate-pulse"></div>

    <div className="relative z-10 space-y-2">
      <p className="text-lg font-semibold tracking-wide">© 2025 <span className="text-yellow-300">AI BharatMeet</span></p>
      <p className="text-sm text-white/80">
        Designed with <span className="animate-ping inline-block text-red-400">❤️</span> to empower teams with smart collaboration.
      </p>
    </div>
  </footer>
);

export default Footer;
