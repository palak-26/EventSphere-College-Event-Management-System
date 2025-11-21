import React, { useState, useEffect } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import student from "../assets/student.svg";
import { Link } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();  
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    API.get("/events/public/approved")
      .then(res => setRecentEvents(res.data))
      .catch(err => console.error("Error loading recent events", err));
  }, []);

  // Registered count (if event has registeredStudents array)
  const registeredCount = recentEvents.filter(ev =>
    ev.participants?.includes(user._id)
  ).length;

  // Upcoming events
  const upcomingCount = recentEvents.filter(
    ev => new Date(ev.date) > new Date()
  ).length;

  return (
    <LayoutWithSidebar>
      <div className="relative left-10 w-full text-white">

        {/* Page Title */}
        <h1 className="text-2xl mb-2 md:text-3xl font-bold  md:mb-6">
          {user?.name?.split(" ")[0]}'s Dashboard!
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="lg:col-span-1 space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl text-center shadow-lg p-6">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4">
                <img src={student} alt="profile" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600 text-sm">
                Computer Science • 4th year
              </p>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl mt-4">
                <Link to="/certificates" className="font-bold">My Certificates</Link>
              </button>

              <button className="mt-2 text-gray-600 text-sm hover:text-gray-800">
                Edit Profile
              </button>
            </div>

            {/* Club Info */}
            <div className="bg-white text-center rounded-2xl p-4 shadow-lg">
              <p className="text-gray-500 text-sm">Member of</p>
              <p className="text-gray-900 font-semibold">Tech Club</p>
              <p className="text-gray-500 text-sm mt-1">Role: Member</p>
            </div>

          </div>



          {/* RIGHT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-800 font-semibold">Registered</p>
                <p className="mt-2 text-3xl font-bold kpi">{registeredCount}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-800 font-semibold">Upcoming</p>
                <p className="mt-2 text-3xl font-bold kpi">{upcomingCount}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                <p className="text-gray-800 font-semibold">Certificates</p>
                <p className="mt-2 text-3xl font-bold kpi">1</p>
              </div>
            </div>



            {/* Recent Events Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">My Recent Events</h3>
                <Link to="/events" className="text-gray-500 hover:text-gray-700 text-sm">
                  See all →
                </Link>
              </div>

              <div className="mt-4 space-y-6">
                {recentEvents.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recent events.</p>
                ) : (
                  recentEvents.slice(0, 3).map(ev => (
                    <div
                      key={ev._id}
                      className="text-center items-center bg-white flex flex-col sm:flex-row sm:text-start gap-4 p-4 border rounded-xl shadow"
                    >
                      {/* Image */}
                      <img
                        src={`http://localhost:5000${ev.banner}`}
                        className="w-full sm:w-32 h-24 object-cover rounded-lg"
                      />

                      {/* Text */}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{ev.title}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(ev.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 text-sm mt-1">{ev.description}</p>
                      </div>

                      {/* Button */}
                      <div className="flex items-center">
                        <Link
                          to={`/events/${ev._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>



            {/* FOOTER CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <p className="font-semibold text-gray-900">Suggested Events</p>
                <p className="text-gray-500 text-sm mt-1">
                  Based on your interests
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <p className="font-semibold text-gray-900">Notifications</p>
                <p className="text-gray-500 text-sm mt-1">
                  No new notifications
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </LayoutWithSidebar>
  );
}
