import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";
import { FiArrowLeft, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();   
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Event load error:", err));
  }, [id]);

  if (!event) return <div className="text-white p-8">Loading...</div>;

  return (
    <LayoutWithSidebar>
      <div className=" md:w-[1024px] relative left-15 flex flex-col ">
        <FiArrowLeft onClick={()=> navigate("/events")} className="h-10 w-5 text-white -mt-16 font-bold"/>
        {/* Banner */}
        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`http://localhost:5000${event.banner}`}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mt-6">{event.title}</h1>

        {/* Info */}
        <div className="flex items-center gap-6 text-white/80 mt-4">
          <div className="flex items-center gap-2">
            <FiCalendar /> {event.date} • {event.time}
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin /> {event.venue}
          </div>
          <div className="flex items-center gap-2">
            <FiUsers /> {event.participants?.length || 0} registered
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 mt-6 leading-relaxed">{event.description}</p>

        {/* REGISTER BUTTON — Student Only */}
        {user?.role === "student" && (
          <div className="mt-8">
            <Link
              to={`/event/${id}/register`}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </LayoutWithSidebar>
  );
}
