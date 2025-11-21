import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: 0,
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (image) fd.append("image", image);

    try {
      await API.post("/events/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event created (pending approval)");
      navigate("/club/manage-events");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <LayoutWithSidebar>
  <div className="w-full px-4 py-4 md:px-8 text-white">

    <h1 className="text-2xl font-bold mb-4 md:text-3xl">
      Create Event
    </h1>

    <form
      onSubmit={submit}
      className="bg-white p-5 rounded-xl shadow-lg space-y-4 max-w-2xl mx-auto"
    >

      {/* Title */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Event Title</label>
        <input
          name="title"
          onChange={onChange}
          value={form.title}
          placeholder="Enter event title"
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Event Description</label>
        <textarea
          name="description"
          onChange={onChange}
          value={form.description}
          placeholder="Enter event description"
          className="border border-gray-300 rounded-lg px-4 py-2 h-24 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Date - Time - Capacity */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-gray-700 font-medium mb-1 block">Date</label>
          <input
            type="date"
            name="date"
            onChange={onChange}
            value={form.date}
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-1 block">Time</label>
          <input
            type="time"
            name="time"
            onChange={onChange}
            value={form.time}
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium mb-1 block">Capacity</label>
          <input
            type="number"
            name="capacity"
            onChange={onChange}
            value={form.capacity}
            placeholder="0"
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Venue */}
      <div>
        <label className="text-gray-700 font-medium mb-1 block">Venue</label>
        <input
          name="venue"
          onChange={onChange}
          value={form.venue}
          placeholder="Enter venue"
          className="border border-gray-300 w-full rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-gray-700 font-semibold">Event Banner</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50 hover:bg-gray-100"
        />
      </div>

      {/* Submit */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl text-lg font-semibold">
        Create Event
      </button>
    </form>
  </div>
</LayoutWithSidebar>

  );
}
