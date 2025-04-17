import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-600 to-yellow-400 flex flex-col items-center justify-center text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
      
      <h1 className="text-[10rem] font-extrabold drop-shadow-xl animate-bounce z-10">
        404
      </h1>
      
      <p className="text-2xl sm:text-3xl font-bold text-center mb-8 z-10 animate-pulse">
        You’ve entered the vortex of nowhere!
      </p>
      
      <Link
        to="/"
        className="z-10 bg-black bg-opacity-50 border-2 border-white text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-white hover:text-black transition duration-300 shadow-lg animate-wiggle"
      >
        Take Me Home
      </Link>

      {/* Custom animation */}
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          .animate-wiggle {
            animation: wiggle 0.4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
