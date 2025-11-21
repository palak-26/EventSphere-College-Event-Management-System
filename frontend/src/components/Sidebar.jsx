import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiHome, FiUsers, FiCalendar, FiAward, FiImage, FiFlag, FiMeh, FiLogOut } from "react-icons/fi";
import { MdEventAvailable } from "react-icons/md";

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <div className="w-64 min-h-screen md:rounded-lg bg-[#0B132B] text-white p-6">
      <div className="flex items-center mb-10 justify-between">
        <h2 className="text-2xl font-bold  tracking-wide">EventSphere</h2>
      </div>

      {/* DASHBOARD */}
      <nav className="space-y-4 text-[17px]">
        
        <Link to={`/${user?.role}`} className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
          <FiHome className="text-xl" /> Dashboard
        </Link>

        {/* ADMIN LINKS */}
        {user?.role === "admin" && (
          <>
            <Link to="/manage-events" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiCalendar className="text-xl" /> Event Approvals
            </Link>
            <Link to="/clubs/pending" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiUsers className="text-xl" /> Club Approvals
            </Link>
            <Link to="/leaderboard" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiAward className="text-xl" /> Leaderboard
            </Link>
            <Link to="/login" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiLogOut className="text-xl" /> Logout
            </Link>
          </>
        )}

        {/* CLUB LINKS */}
        {user?.role === "club"  && (
          <>
            <Link to="/create-event" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiCalendar className="text-xl" /> Create Event
            </Link>
            <Link to="/club/manage-events" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiCalendar className="text-xl" /> Manage Events
            </Link>
            <Link to="/club/volunteers" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiUsers className="text-xl" /> Volunteers
            </Link>
            <Link to="/leaderboard" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiAward className="text-xl" /> Leaderboard
            </Link>
            <Link to="/analytics" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiAward className="text-xl" /> AI Analytics
            </Link>
             <Link to="/gallery" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiImage className="text-xl" /> Events Gallery
            </Link>
            <Link to="/login" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiLogOut className="text-xl" /> Logout
            </Link>
          </>
        )}

        {/* STUDENT LINKS */}
        {user?.role === "student" && (
          <>
            <Link to="/events" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiCalendar className="text-xl" /> Events
            </Link>
            <Link to="/gallery" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiImage className="text-xl" /> Gallery
            </Link>
            <Link to="/certificates" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiAward className="text-xl" /> Certificates
            </Link>
             <Link to="/my-events" label="My Events" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition"> 
              <MdEventAvailable className="text-xl" />My Events
             </Link>
             <Link to="/suggestions" label="suggestions" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition"> 
             💡 Suggestions
             </Link>
             <Link to="/leaderboard" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition">
              <FiAward className="text-xl" /> Leaderboard
            </Link>
            <Link to="/login" className="flex items-center p-2 rounded-md gap-3 hover:bg-blue-800 transition" >
              <FiLogOut className="text-xl"  /> Logout
            </Link>
          </>
        )}

      </nav>

      {/* SUPPORT */}
      <div className="mt-16 text-white/60 text-sm">
        Contact Support <br />
        admin@college.edu
      </div>
    </div>
  );
}
