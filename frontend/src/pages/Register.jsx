import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import logo from "../assets/logo.png";
import registerIllustration from "../assets/register.png"; 

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f29] to-[#0f1a3a] px-6">
      
      <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-[70%] max-w-5xl">

        {/* LEFT Illustration Panel */}
        <div className="hidden md:flex w-1/2 bg-white  items-center justify-center p-10">
          <img
            src={registerIllustration}
            alt="Register Illustration"
            className="w-[200%] drop-shadow-2xl"
          />
        </div>

        {/* RIGHT Form Card */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-r-2xl">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="EventSphere" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-gray-900">EventSphere</h2>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 mb-8">
            Join the platform to manage or attend events effortlessly.
          </p>

          <form className="space-y-1" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium ">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Role Select */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Select Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="club">Club</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
