import React, { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import API from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import { Link } from "react-router-dom";

export default function ManageEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Load events
  useEffect(() => {
    async function load() {
      try {
        let res;

        if (user.role === "admin") {
          res = await API.get("/events");
        } else if (user.role === "club") {
          res = await API.get("/events");
        } else {
          res = { data: [] };
        }

        setEvents(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    }
    load();
  }, [user]);

  // Delete event
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      alert("Event deleted");

      setEvents((prev) => prev.filter((ev) => ev._id !== id));
      setFiltered((prev) => prev.filter((ev) => ev._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  // Search filter
  useEffect(() => {
    setFiltered(
      events.filter((ev) =>
        ev.title?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, events]);

  // Status color
  const getStatusBadge = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    if(status == "pending") return "bg-pink-100 text-pink-700 "
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <LayoutWithSidebar>
      <div className="px-4 py-6 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Manage Events
          </h1>

          {user.role !== "student" && (
            <Link
              to="/create-event"
              className="btn-primary w-full md:w-auto text-center py-2 px-5 rounded-lg"
            >
              + Create Event
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-5 relative w-full max-w-lg">
          <FiSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search events"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Responsive Table Wrapper */}
        <div className="bg-white rounded-xl shadow p-2 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                <th className="p-3 md:p-4 font-semibold">Name</th>
                <th className="p-3 md:p-4 font-semibold">Date</th>
                <th className="p-3 md:p-4 font-semibold">Registrations</th>
                <th className="p-3 md:p-4 font-semibold">Status</th>
                <th className="p-3 md:p-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No events found.
                  </td>
                </tr>
              )}

              {filtered.map((ev) => (
                <tr
                  key={ev._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Event Name */}
                  <td className="p-3 md:p-4 flex items-center gap-3">
                    <img
                      src={
                        ev.banner
                          ? `https://eventsphere-backend-yok4.onrender.com/auth${ev.banner}`
                          : "/default-event.jpg"
                      }
                      className="h-10 w-10 md:h-12 md:w-12 rounded-md border object-cover"
                    />

                    <div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base">
                        {ev.title}
                      </div>
                      <div className="text-gray-500 text-xs md:text-sm">
                        {ev.createdBy?.name || "Organizer"}
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-3 md:p-4 text-gray-700 text-sm md:text-base">
                    {ev.date
                      ? new Date(ev.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>

                  {/* Registrations */}
                  <td className="p-3 md:p-4 text-gray-700 text-sm md:text-base">
                    {ev.participants?.length || 0}
                  </td>

                  {/* Status */}
                  <td className="p-3 md:p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getStatusBadge(
                        ev.status
                      )}`}
                    >
                      {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 md:p-4 flex gap-3 text-gray-600">
                    {/* View */}
                    <Link
                      to={`/events/${ev._id}`}
                      className="hover:text-blue-500"
                    >
                      <FiEye size={18} />
                    </Link>

                    {/* Edit */}
                    {user.role !== "student" && (
                      <Link
                        to={`/edit-event/${ev._id}`}
                        className="hover:text-yellow-500"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                    )}

                    {/* Delete */}
                    {user.role !== "student" && (
                      <button
                        className="hover:text-red-500"
                        onClick={() => deleteEvent(ev._id)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </LayoutWithSidebar>
  );
}
