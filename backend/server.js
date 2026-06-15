require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const adminEventsRoute = require("./routes/adminEvents");
const certificateRoutes = require("./routes/certificates");
const chatRoutes = require("./routes/chat.js");

const app = express();
connectDB();

// ----------------------
// CREATE HTTP SERVER
// ----------------------
const server = http.createServer(app);

// ----------------------
// SOCKET.IO SETUP
// ----------------------
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://eventsphere-hu6d.onrender.com",
    ],
    credentials: true,
  },
});

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join club room
  socket.on("joinRoom", (club) => {
    socket.join(club);
  });

  // Send message
  socket.on("sendMessage", async (data) => {
  try {
    console.log("📩 Incoming message:", data); // 👈 ADD THIS

    const Message = require("./models/Message");

    const newMessage = await Message.create({
      sender: data.sender,
      club: data.club,
      message: data.message,
    });

    console.log("✅ Saved in DB:", newMessage);

    const populated = await newMessage.populate("sender", "name");

    io.to(data.club).emit("receiveMessage", populated);

  } catch (err) {
    console.error("❌ Socket error:", err);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ----------------------
// CORS CONFIG
// ----------------------
const allowedOrigins = [
  "https://eventsphere-hu6d.onrender.com",
  "http://localhost:5173",
  "http://localhost:5000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ----------------------
// STATIC FILES (IMAGES)
// ----------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/events", adminEventsRoute);
app.use("/api/certificates", certificateRoutes);
app.use("/api/clubs", require("./routes/clubs"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/chat", chatRoutes);
app.use("/api/volunteer", require("./routes/volunteer"));

// ----------------------
app.get("/", (req, res) => res.send("EventSphere API"));

// ----------------------
// START SERVER (IMPORTANT CHANGE)
// ----------------------
const PORT = process.env.PORT;

server.listen(PORT, () =>
  console.log(`🚀 Server + Socket running on port ${PORT}`)
);