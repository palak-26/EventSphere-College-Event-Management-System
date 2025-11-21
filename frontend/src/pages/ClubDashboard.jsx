import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import { Link } from "react-router-dom";
import club from "../assets/club.png";
import API from "../utils/api";

export default function ClubDashboard() {
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    API.get("/events/public/approved")
      .then((res) => setRecentEvents(res.data))
      .catch((err) => console.error("Error loading recent events", err));
  }, []);

  return (
    <LayoutWithSidebar>
      <div className="px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 ">

        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">

          {/* CLUB PROFILE CARD */}
          <div className="surface text-center flex flex-col items-center p-6 rounded-2xl">
            <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden mb-4 rounded-full">
              <img src={club} alt="profile" className="w-full h-full object-cover" />
            </div>

            <div className="text-lg sm:text-xl font-semibold">
              Tech Club
            </div>

            <div className="text-gray-700 text-sm mt-1">Organizer: Alice</div>

            <button className="btn-primary w-full mt-5 py-2 rounded-lg">
              <Link to="/create-event">Create Event</Link>
            </button>
          </div>

          {/* CLUB SCORE */}
          <div className="surface p-4 rounded-2xl text-center">
            <div className="text-gray-800 text-sm font-bold">Club Score</div>
            <div className="kpi font-bold text-3xl mt-2">420 pts</div>
          </div>
        </div>



        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-6 ">

          {/* KPIs */}
          <div className="space-y-2 md:grid md:grid-cols-3 gap-4">
            <div className="surface rounded-2xl p-4 text-center">
              <div className="text-blue-950 font-bold text-sm">Events Hosted</div>
              <div className="kpi mt-2 text-3xl font-bold">12</div>
            </div>

            <div className="surface rounded-2xl p-4 text-center">
              <div className="text-blue-950 text-sm">Participants</div>
              <div className="kpi mt-2 text-3xl font-bold">1200</div>
            </div>

            <div className="surface rounded-2xl p-4 text-center">
              <div className="text-blue-950 text-sm">Approval Rate</div>
              <div className="kpi mt-2 text-3xl font-bold">88%</div>
            </div>
          </div>



          {/* UPCOMING EVENTS */}
          <div className="surface rounded-2xl p-6 max-h-[450px] overflow-y-auto">
            <div className="flex items-center">
                <h3 className="text-xl font-semibold kpi">Upcoming Events</h3>
            </div>

            <div className="mt-4 space-y-4">
              {recentEvents.length === 0 ? (
                <div className="text-gray-400 text-sm">No upcoming events</div>
                
              ) : (
                recentEvents.map((ev) => (
                  <div
                    key={ev._id}
                    className="bg-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start md:items-center border border-white/5"
                  >
                    {/* Event Banner */}
                    <img
                      src={`http://localhost:5000${ev.banner}`}
                      className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-lg"
                      alt="event-banner"
                    />

                    {/* Event Info */}
                    <div className="flex-1">
                      <div className=" font-semibold text-base">
                        {ev.title}
                      </div>

                      <div className="text-gray-700 text-xs mt-1">
                        {new Date(ev.date).toLocaleDateString()}
                      </div>

                      <div className="text-gray-800 text-sm mt-1 line-clamp-2">
                        {ev.description}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 self-center">
                      <Link
                        to={`/events/${ev._id}`}
                        className="btn-primary px-3 py-1 rounded-md text-sm text-white"
                      >
                        View
                      </Link>

                      <Link
                        to="/club/manage-events"
                        className="btn-primary px-3 py-1 rounded-md text-sm text-white"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </LayoutWithSidebar>
  );
}
