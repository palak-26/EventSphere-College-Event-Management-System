    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const connectDB = require('./config/db');
    const authRoutes = require('./routes/auth.js');
    const userRoutes = require('./routes/users');
    const eventRoutes = require('./routes/events');          
    const adminEventsRoute = require("./routes/adminEvents");
    const certificateRoutes = require('./routes/certificates');

    const app = express();
    connectDB();

    const allowedOrigins = [
  "https://eventsphere-hu6d.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
    app.use(express.json());
    // static uploads first
    app.use("/uploads", express.static("uploads"));

    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/events", eventRoutes);           // main event routes
    app.use("/api/admin/events", adminEventsRoute); // admin event approve/reject
    app.use("/api/certificates", certificateRoutes);
    app.use("/api/clubs", require("./routes/clubs"));
    app.use("/api/leaderboard", require("./routes/leaderboard"));


    // ---------------------------------

    app.get('/', (req,res)=>res.send('EventSphere API'));

    const PORT = process.env.PORT ;
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
