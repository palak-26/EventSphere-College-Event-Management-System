import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import Card from '../components/EventCard';
import { useState, useEffect } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  const [recentEvents, setRecentEvents] = useState([]);
    useEffect(() => {
    API.get("/events/public/approved")
      .then(res => setRecentEvents(res.data))
      .catch(err => console.error("Error loading recent events", err));
  }, []);
  return (
    <LayoutWithSidebar>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
        <div className="surface p-6">
          <div className="subtle">Total Events</div>
          <div className="kpi mt-2">24</div>
        </div>
        <div className="surface p-6">
          <div className="subtle">Total Participants</div>
          <div className="kpi mt-2">3512</div>
        </div>
        <div className="surface p-6">
          <div className="subtle">Certificates Issued</div>
          <div className="kpi mt-2">884</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6 ">
        <div className="surface p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Events</h3>
            <div className="subtle"><Link to="/club/events">View all</Link></div>
          </div>

          <div className="mt-4 space-y-3 w-full">
            {recentEvents.length === 0 ? (
              <div className="text-gray-300 text-sm">No recent events yet.</div>
            ) : (
              recentEvents.map(ev => (
                <div key={ev._id} className="flex items-center gap-4 py-3 border-b">
                  
                  {/* Event Banner */}
                  <img
                    src={`http://localhost:5000${ev.banner}`}
                    className="w-28 h-20 object-cover rounded"
                    alt="event-banner"
                  />
          
                  <div className="flex-1">
                    <div className="font-semibold ">{ev.title}</div>
                    <div className="subtle text-sm">
                      {new Date(ev.date).toLocaleDateString()}
                    </div>
                    <div className="font-semibold ">{ev.description}</div>
                  </div>
          
                  <div>
                    <button className="px-3 py-1 btn-primary">
                      <Link to={`/events/${ev._id}`}>View</Link>
                    </button>
                  </div>
          
                </div>
              ))
            )}
          </div>
        </div>
         <div className="surface p-6">
          <h3 className="text-lg font-semibold">Activity Feed</h3>
          <div className="mt-4 subtle">No major alerts</div>
        </div>
       
      </div>
    </LayoutWithSidebar>
  );
}
