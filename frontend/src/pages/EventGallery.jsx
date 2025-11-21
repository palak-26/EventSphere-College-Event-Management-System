import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import API from '../utils/api';
import { useState,useEffect } from 'react';

export default function EventGallery(){
  const [recentEvents, setRecentEvents] = useState([]);
  useEffect(() => {
  API.get("/events")
    .then(res => {
      console.log(res.data); 
      setRecentEvents(res.data.filter(ev => ev.status === "completed"));
    })
    .catch(err => console.error("Error loading recent events", err));
}, []);

    
  return (
    <LayoutWithSidebar>
      <h2 className="text-2xl font-bold mb-4 text-white">Events Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentEvents.length === 0 ? (
                    <div className="text-gray-300 text-sm">No recent events yet.</div>
                  ) : (
                    recentEvents.map(ev => (
                      <div key={ev._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4 hover:scale-105 transition-all">
                        
                        {/* Event Banner */}
                        <img
                          src={`http://localhost:5000${ev.banner}`}
                          className="w-72 h-48 object-cover"
                          alt="event-banner"
                        />
                
                        <div className="flex-1">
                          <div className="font-semibold text-center ">{ev.title}</div>
                          <div className="subtle text-sm text-center">
                            {new Date(ev.date).toLocaleDateString()}
                          </div>
                        </div>
                  </div>
        )))}
      </div>
    </LayoutWithSidebar>
  );
}
