import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function About() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B18] relative overflow-hidden">

      {/* Glass Navbar */}
      <header className="backdrop-blur-xl fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
              About EventSphere
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-white">
            <Link to="/home" className="text-gray-200 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition">About</Link>
            <Link to="/login" className="text-gray-200 hover:text-white transition">Login</Link>

            <Link
              to="/register"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium shadow-md"
            >
              Get Started
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden text-white text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden backdrop-blur-xl  transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4 text-center text-white text-base">
            <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">About</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Login</Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-white pb-20">

        {/* Vision */}
        <div className="bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl border border-white/10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
            EventSphere is a unified, intelligent platform designed to simplify, automate 
            and enhance all college event management activities. From club-hosted events 
            to inter-departmental competitions, EventSphere brings everything into one 
            seamless digital ecosystem — empowering students, clubs, and administrators 
            with transparency, efficiency, and real-time engagement.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🎯 Role-Based Access</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Dedicated dashboards for Admins, Clubs, and Students — ensuring each user
              gets tools crafted for their needs.
            </p>
          </div>

          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📝 Smart Event Approvals</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Admins can approve or reject events instantly. Clubs get real-time updates
              across the platform.
            </p>
          </div>

          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🤖 AI-Powered Club Analytics</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Intelligent insights on trends, engagement, and event performance — helping
              clubs grow strategically.
            </p>
          </div>

          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📸 Event Gallery & Certificates</h3>
            <p className="text-white/80 text-sm sm:text-base">
              Students can track past events, view galleries, and download certificates —
              all in one place.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl border border-white/10 shadow-xl mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            College events are more than activities — they foster teamwork, creativity, 
            leadership, and community. Our mission is to digitize and streamline event 
            management so students focus on participating, clubs focus on impact, and 
            admins ensure smooth operations.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-14 text-white/60 text-xs sm:text-sm">
          <div>© {new Date().getFullYear()} EventSphere — Organize. Discover. Celebrate.</div>
          Created by Palak Neekhra
        </div>
      </div>

    </div>
  );
}
