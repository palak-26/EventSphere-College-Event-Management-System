import React, { useEffect, useState } from "react";
import API from "../utils/api";
import EventCard from "../components/EventCard";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function EventsList(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  API.get("/events")
    .then(res => {
      console.log("Events API:", res.data);
      setEvents(res.data || []);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);


  return (
    <LayoutWithSidebar>
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-6  text-white">Upcoming Events</h1>
      {loading ? <div className="text-white ">Loading...</div> :
        (events.length === 0 ? <div>No events yet.</div> :
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 ">{events.map(ev => <EventCard key={ev._id} event={ev} />)}</div>
        )
      }
    </div>
    </LayoutWithSidebar>
  )
}
