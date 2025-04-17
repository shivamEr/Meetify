import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onAuthToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-700 to-fuchsia-700 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white">Meetify</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-white">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <a href="#about" className="hover:text-yellow-300 transition duration-300">About</a>
          <a href="#services" className="hover:text-yellow-300 transition duration-300">Our Services</a>
          <Link to="/meeting" className="hover:text-yellow-300 transition duration-300">Meeting</Link>
          <button
            onClick={onAuthToggle}
            className="hover:text-yellow-300 focus:outline-none transition duration-300"
          >
            Login / Register
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none text-white"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white text-gray-800 border-t border-gray-100">
          <Link to="/" className="block text-sm text-gray-700 hover:text-yellow-500 transition duration-300">Home</Link>
          <a href="#about" className="block text-sm text-gray-700 hover:text-yellow-500 transition duration-300">About</a>
          <a href="#services" className="block text-sm text-gray-700 hover:text-yellow-500 transition duration-300">Our Services</a>
          <Link to="/meeting" className="block text-sm text-gray-700 hover:text-yellow-500 transition duration-300">Meeting</Link>
          <button
            onClick={() => {
              onAuthToggle();
              setIsMobileMenuOpen(false);
            }}
            className="block text-sm text-gray-700 hover:text-yellow-500 transition duration-300"
          >
            Login / Register
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
