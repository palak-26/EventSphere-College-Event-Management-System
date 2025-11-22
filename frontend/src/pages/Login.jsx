import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import logo from "../assets/logo.png";
import loginArt from "../assets/login.png";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) return setError("Please select your role.");
    
    try {
      const { data } = await API.post("/auth/login", { ...form, role });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      navigate(`/${data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] to-[#0F172A] flex items-center justify-center px-4 sm:px-6 py-8">
      
      {/* AUTH CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-3 items-center mb-6 justify-center md:justify-start">
            <img src={logo} className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-gray-900">EventSphere</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center md:text-left">
            Welcome back
          </h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Sign in to manage events, analyze insights, or join activities.
          </p>

          {/* ROLE SELECTOR */}
          <div className="flex gap-3 mb-6">
            {[
              { label: "Admin", value: "admin", icon: "👩‍💼" },
              { label: "Club", value: "club", icon: "🏆" },
              { label: "Student", value: "student", icon: "🎓" },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex-1 py-3 border rounded-xl flex flex-col items-center text-sm font-medium transition ${
                  role === r.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1">{r.icon}</div>
                {r.label}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <p className="text-red-600 bg-red-100 p-2 rounded-md text-sm text-center">
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4 text-center">
            New here?{" "}
            <a href="/register" className="text-blue-600 font-semibold">
              Create an account
            </a>
          </p>
        </div>

        {/* RIGHT SIDE ILLUSTRATION */}
        <div className="hidden md:flex flex-col justify-center items-center">
          <img
            src={loginArt}
            alt="illustration"
            className="w-60 lg:w-80 drop-shadow-xl object-contain"
          />
        </div>

      </div>
    </div>
  );
}
