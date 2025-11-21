import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";
import { FiArrowLeft } from "react-icons/fi";
export default function EditEvent() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/events/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await API.put(`/events/${id}`, form);
    alert("Event updated!");
    navigate("/club/manage-events");
  };

  return (
    <LayoutWithSidebar>
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl text-white font-bold mb-4"> 
          <div className="flex items-center">
            <Link to="/club/manage-events"><FiArrowLeft className="h-5"/></Link> 
            <p>Edit Event</p>
          </div>
        </h1>
        <form className="surface p-6 rounded-xl space-y-4" onSubmit={submit}>
          <label htmlFor="title" className="font-bold">Event Title</label>
          <input name="title" value={form.title || ""} onChange={onChange} className="input" placeholder="Event Title"/>
           <label htmlFor="description" className="font-bold">Event Description</label>
          <textarea name="description" value={form.description || ""} onChange={onChange} className="input" placeholder="Event Description" />

          <div className="grid grid-cols-3 gap-3 ">
            <div>
              <label htmlFor="date" className="font-bold">Date</label>
              <input type="date" name="date" value={form.date || ""} onChange={onChange} className="input" />
            </div>
             <div>
              <label htmlFor="time" className="font-bold">Time</label>
             <input type="time" name="time" value={form.time || ""} onChange={onChange} className="input" />
             </div>
             <div>
            <label htmlFor="number" className="font-bold">Capacity</label>
            <input type="number" name="capacity" value={form.capacity || ""} onChange={onChange} className="input" placeholder="Capacity" />
             </div>
             <div>
  <label className="font-bold">Status</label>
  <select
    name="status"
    value={form.status || ""}
    onChange={onChange}
    className="input bg-[#0d1026]/50"
  >
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="completed">Completed</option>
  </select>
</div>

          </div>
          <label htmlFor="venue" className="font-bold">Venue</label>
          <input name="venue" value={form.venue || ""} onChange={onChange} className="input" />

          <button className="btn-primary px-4 py-2 rounded">Save Changes</button>
        </form>
      </div>
    </LayoutWithSidebar>
  );
}
