import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import hero from '../assets/hero.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#070B18] relative overflow-x-hidden min-h-screen">

      {/* Glass Navbar */}
      <header className="backdrop-blur-xl  fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between overflow-x-hidden">

          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="logo" className="h-9 w-9 flex-shrink-0" />
            <span className="text-white text-lg sm:text-xl font-semibold tracking-wide">
              EventSphere
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-white">
            <Link to="/home" className="hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
            <Link to="/login" className="hover:text-blue-400">Login</Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-xl pl-2 flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden backdrop-blur-3xl transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-4 px-6 text-center text-white gap-4 text-base ">
            <Link onClick={() => setMenuOpen(false)} to="/home" className='hover:text-blue-400'>Home</Link>
            <Link onClick={() => setMenuOpen(false)} to="/about" className='hover:text-blue-400'>About</Link>
            <Link onClick={() => setMenuOpen(false)} to="/login" className='hover:text-blue-400'>Login</Link>

            <Link
              onClick={() => setMenuOpen(false)}
              to="/register"
              className="px-3 py-2 bg-blue-600 rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Glow Background Accents */}
      <div className="absolute top-[15%] -left-[40%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-[5%] right-[-30%] w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center relative z-[2]">

        {/* LEFT TEXT */}
        <div className="col-span-8 md:col-span-6 text-white text-center md:text-left">

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold overflow leading-tight break-words">
            Organize. Discover. <br className="hidden sm:block" />
            Celebrate — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              all on EventSphere.
            </span>
          </h1>

          <p className="text-gray-300 mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            A unified platform for college events, clubs, and students.
            Simplify registrations, generate certificates, analyze engagement,
            and grow your club — all in one place. 
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex justify-center md:justify-start gap-6">

            <Link
              to="/register"
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-600/30 transition"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="text-gray-300 text-lg hover:text-white transition"
            >
              Explore Events →
            </Link>
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="col-span-8 md:col-span-6 flex justify-center relative">

          {/* Soft Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl rounded-3xl"></div>

          <img
            src={hero}
            alt="hero illustration"
            className="relative w-[100%] sm:w-[70%] lg:w-[90%] mx-auto drop-shadow-2xl"
          />
        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center mt-6 sm:mt-10 pb-10 text-white/60 text-xs sm:text-sm">
        <div>© {new Date().getFullYear()} EventSphere — Organize. Discover. Celebrate.</div>
        <div className="mt-1">Created by Palak Neekhra</div>
      </div>

    </div>
  );
}
