import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  if (!event) return null; // prevents crash

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4">
        {event?.banner ? (
            <img src={`http://localhost:5000${event.banner}`} alt={event?.title || "event"} className="rounded"  />
          
          
        ) : (
          <div className="text-sm text-gray-400">No image</div>
        )}
      <div className="flex-1">
        <div className="font-semibold text-center text-lg">
          {event?.title || "Untitled Event"}
        </div>

        <div className="text-sm text-center text-gray-500">
          {event?.createdBy?.name || "Club"}  
        </div>
        <div className="text-sm text-center text-gray-500">
          {event?.date || "No Date"}
        </div>
      </div>

      <div>
        <Link
          to={`/events/${event._id}`}
          className="btn-primary px-4 py-2 rounded"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
