import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function Suggestions() {
  const [suggested, setSuggested] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/events/suggested").then((res) => setSuggested(res.data));
    API.get("/users/notifications").then((res) => setNotifications(res.data));
  }, []);

  return (
    <LayoutWithSidebar>
      <div className="p-8">

        <h1 className="text-3xl text-white font-bold">Suggested Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {suggested.map((ev) => (
            <div key={ev._id} className="surface p-4 rounded-xl">
              <img src={ev.banner} className="h-32 w-full rounded-xl object-cover" />
              <h2 className="text-white mt-3 font-semibold">{ev.title}</h2>
              <Link to={`/events/${ev._id}`} className="btn-primary block text-center mt-4 py-2 rounded-lg">
                View Details
              </Link>
            </div>
          ))}
        </div>

        <h1 className="text-3xl text-white font-bold mt-12">Notifications</h1>

        <div className="surface mt-4 p-4 rounded-xl">
          {notifications.length === 0 ? (
            <p className="subtle">No new notifications</p>
          ) : (
            notifications.map((note, i) => (
              <div key={i} className="border-b py-3 text-white">
                {note.text}
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutWithSidebar>
  );
}
