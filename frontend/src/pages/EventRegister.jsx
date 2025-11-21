import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutWithSidebar from "../components/LayoutWithSidebar";
import API from "../utils/api";

export default function EventRegister() {
  const { id } = useParams();
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/events/${id}/check`)
      .then((res) => setRegistered(res.data.registered))
      .catch(() => {});
  }, [id]);

  const registerNow = async () => {
    try {
      await API.post(`/events/${id}/register`);
      alert("Registered successfully!");
      navigate("/student");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <LayoutWithSidebar>
      <div className="p-8 max-w-xl mx-auto text-white">
        <h1 className="text-2xl font-bold">Confirm Registration</h1>
        <p className="subtle mt-2">You are registering for this event.</p>

        <button
          disabled={registered}
          onClick={registerNow}
          className={`mt-6 px-6 py-3 rounded-lg ${
            registered ? "bg-gray-400 cursor-not-allowed" : "btn-primary"
          }`}
        >
          {registered ? "Already Registered" : "Register Now"}
        </button>
      </div>
    </LayoutWithSidebar>
  );
}
