import { useEffect, useState } from "react";
import socket from "../utils/socket";
import API from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function CommunityChat() {
  const { user } = useAuth();

  const [selectedClub, setSelectedClub] = useState("Dance Club");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const clubs = ["Dance Club", "Sports Club", "Literature Club"];

  
  useEffect(() => {
    socket.emit("joinRoom", selectedClub);

    API.get(`/chat/${encodeURIComponent(selectedClub)}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

  }, [selectedClub]);

  // RECEIVE REAL-TIME MESSAGE
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: user._id,
      club: selectedClub,
      message: text,
    });

    setText("");
  };

  return (
    <div className="flex w-full h-full gap-4">

      {/* LEFT */}
      <div className="w-[40%] bg-white text-black rounded-2xl p-4">
        <h3 className="font-semibold mb-4">Communities</h3>

        {clubs.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedClub(c)}
            className={`w-full mb-2 p-2 rounded ${
              selectedClub === c ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* CHAT */}
      <div className="flex w-[80%] bg-white rounded-2xl flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b font-semibold text-black">
          {selectedClub}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[60%] px-3 py-2 rounded-lg ${
                msg.sender._id === user._id
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-600"
              }`}
            >
              <div className="text-s  font-bold">
                {msg.sender.name}
              </div>
              <div className="text-s font-semibold">
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 flex gap-2 border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded px-3 py-2 text-black"
            placeholder="Type message..."
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}