import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events/my-registrations").then((res) => setEvents(res.data));
  }, []);

  return (
    <LayoutWithSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6">My Registered Events</h1>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev._id} className="surface p-4 rounded-xl">
              <img
                src={`http://localhost:5000${ev.banner}`}
                className="w-full h-40 rounded-xl object-cover"
                alt=""
              />
              <h2 className="text-black text-lg text-center font-semibold mt-3">
                {ev.title}
              </h2>
              <p className="subtle text-sm text-center">{ev.date}</p>

              <div className="w-full flex justify-center">
                <Link
                to={`/events/${ev._id}`}
                className="btn-primary  block text-center mt-4 py-2 rounded-lg"
              >
                View Details
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutWithSidebar>
  );
}
