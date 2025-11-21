import React from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function VolunteerManagement() {
  const volunteers = [
    {
      id: 1,
      name: "Aarav Sharma",
      event: "Tech Talk on AI",
      date: "Sep 25, 2023",
      role: "Event Assistant",
    },
    {
      id: 2,
      name: "Riya Mehta",
      event: "Annual College Fest",
      date: "Sep 22, 2023",
      role: "Crowd Management",
    },
    {
      id: 3,
      name: "Dev Patel",
      event: "Dance Workshop",
      date: "Oct 4, 2023",
      role: "Stage Support",
    },
  ];

  return (
    <LayoutWithSidebar>
      <h2 className="text-3xl font-bold mb-6 text-white">Volunteer Management</h2>

      <div className="space-y-4">
        {volunteers.map((v) => (
          <div
            key={v.id}
            className="surface md:w-full flex items-center justify-between p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                {v.name.split(" ")[0][0]}
              </div>

              <div>
                <h3 className="text-lg font-semibold">{v.name}</h3>
                <p className="text-sm text-gray-600">
                  Assigned to: <span className="font-medium">{v.event}</span>
                </p>
                <p className="text-sm text-gray-400">{v.role} • {v.date}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
                Approve
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </LayoutWithSidebar>
  );
}
