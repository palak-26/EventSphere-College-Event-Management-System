import { io } from "socket.io-client";

const socket = io("http://localhost:5000" || "https://eventsphere-backend-yok4.onrender.com");

export default socket;