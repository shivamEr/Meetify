import React from "react";

const AuthModel = ({ onAuthToggle }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-2xl max-w-4xl w-full p-8 grid md:grid-cols-2 gap-10 relative overflow-hidden">
        <button
          onClick={onAuthToggle}
          className="absolute top-4 right-4 text-xl font-bold text-gray-200 hover:text-red-500 transition duration-200"
        >
          ✖
        </button>

        {/* Login Form */}
        <div className="flex flex-col justify-center items-center p-6 bg-white text-gray-800 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Login</h2>
          <form className="space-y-6 w-full max-w-xs">
            <input
              type="text"
              className="w-full border-2 border-blue-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Username"
              required
            />
            <input
              type="password"
              className="w-full border-2 border-blue-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Password"
              required
            />
            <button className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300 transform hover:scale-105">
              Login
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className="flex flex-col justify-center items-center p-6 bg-white text-gray-800 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">Register</h2>
          <form className="space-y-6 w-full max-w-xs">
            <input
              type="text"
              className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              placeholder="Username"
              required
            />
            <input
              type="email"
              className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              placeholder="Password"
              required
            />
            <button className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-xl transition duration-300 transform hover:scale-105">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModel;
