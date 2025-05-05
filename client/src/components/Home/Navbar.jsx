import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authenticate/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-700 to-fuchsia-700 shadow-md py-4 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white">BharatMeet</h1>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-white">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link to="/#about" className="hover:text-yellow-300 transition duration-300">About</Link>
          <Link to="/#services" className="hover:text-yellow-300 transition duration-300">Our Services</Link>

          {isAuthenticated ? (
            <>
              <Link to="/meeting" className="hover:text-yellow-300 transition duration-300">Meeting</Link>
              <button onClick={handleLogOut} className="hover:text-yellow-300 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition duration-300">Login</Link>
              <Link to="/signup" className="hover:text-yellow-300 transition duration-300">Register</Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-900 px-6 pt-4 pb-6 text-white space-y-3 text-sm font-semibold">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Home</Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">About</Link>
          <Link to="/#services" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Our Services</Link>

          {isAuthenticated ? (
            <>
              <Link to="/meeting" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Meeting</Link>
              <button onClick={() => { handleLogOut(); setMenuOpen(false); }} className="block hover:text-yellow-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;