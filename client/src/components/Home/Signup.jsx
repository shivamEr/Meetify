// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const json = await response.json();
      if (json.success) {
        // console.log("Signup Data:", formData);
        toast.success('You Registered Succesfully!', {
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
      else {
        console.log("Unable to Signup");
        toast.error('PLease complete all field!', {
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
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-500 to-emerald-600 p-4">
      <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-green-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-xl transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
