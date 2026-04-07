import React, { useEffect, useState } from "react";
import API from "../utils/api";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function VolunteerManagement() {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch volunteer requests
  useEffect(() => {
    API.get("/volunteer/club")
      .then(res => {
        console.log("Volunteer Requests:", res.data);
        setRequests(res.data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  // ✅ Update status (approve/reject)
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/volunteer/${id}`, { status });

      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, status } : r)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LayoutWithSidebar>
      <h2 className="text-3xl font-bold mb-6 text-white">
        Volunteer Management
      </h2>

      {/* ✅ Empty State */}
      {requests.length === 0 ? (
        <p className="text-gray-300">No volunteer requests yet</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white w-full flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl shadow-md"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                  {r.student?.name?.[0]}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {r.student?.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Event:{" "}
                    <span className="font-medium">
                      {r.event?.title}
                    </span>
                  </p>

                  <p className="text-sm text-gray-400">
                    Status: {r.status}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-3 mt-3 md:mt-0">
                <button
                  onClick={() => updateStatus(r._id, "approved")}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(r._id, "rejected")}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </LayoutWithSidebar>
  );
}