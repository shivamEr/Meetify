import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authenticate/AuthContext";
import { toast, Bounce } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;
const Login = ({ handleLoging }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ye dynamic data typing allow krega
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, }));
  };

  const { login } = useAuth(); // using context api

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Api Fetching to login with token authentication
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })

    const data = await response.json();
    // result success aaya to
    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      login();
      // console.log("Login Data:", data);
      toast.success('You Logged In!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      localStorage.setItem('username', data.username);
      navigate("/meeting");
    }
    else {
      // console.log("Not able to loging");
      toast.error('Write correct eamil or password!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-blue-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-blue-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
