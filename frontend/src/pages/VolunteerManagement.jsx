import { useEffect, useState } from "react";
import API from "../utils/api";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function VolunteerManagement() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/volunteer/club")
      .then(res => setRequests(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/volunteer/${id}`, { status });

    setRequests(prev =>
      prev.map(r => r._id === id ? { ...r, status } : r)
    );
  };

  return (
    <LayoutWithSidebar>
      <h1 className="text-white text-2xl mb-4">Volunteer Requests</h1>

      <div className="space-y-4">
        {requests.map(r => (
          <div key={r._id} className="bg-white p-4 rounded">

            <p><b>{r.student.name}</b></p>
            <p>{r.event.title}</p>
            <p>Status: {r.status}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => updateStatus(r._id, "approved")} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
              <button onClick={() => updateStatus(r._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </div>

          </div>
        ))}
      </div>
    </LayoutWithSidebar>
  );
}