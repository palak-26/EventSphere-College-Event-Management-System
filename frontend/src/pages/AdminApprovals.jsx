import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";

export default function AdminApprovals() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    API.get("/admin/events/pending").then((res) => setPending(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/admin/events/${id}/status`, { status });
    setPending((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <LayoutWithSidebar>
      <div className="p-8">

        <h1 className="text-3xl font-bold text-white mb-6">Pending Event Approvals</h1>

        {pending.length === 0 && <p className="subtle">No pending events</p>}

        <div className="space-y-6">
          {pending.map((ev) => (
            <div key={ev._id} className="surface p-6 rounded-xl flex gap-6">
              
              <img
                src={`http://localhost:5000${ev.banner}`}
                className="w-40 h-28 rounded-lg object-cover"
                alt=""
              />

              <div className="flex-1">
                <h2 className="text-x font-semibold">{ev.title}</h2>
                <p className="subtle text-sm mt-1">Organized by {ev.createdBy.name}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => updateStatus(ev._id, "approved")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(ev._id, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </LayoutWithSidebar>
  );
}
