const Event = require("../models/Event");
const User = require("../models/User");

// Create event (club creates)
// req.user must exist (from authMiddleware)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, venue, capacity, banner } = req.body;
    const createdBy = req.user.id; // token contains id
    const clubId = req.user.role === "club" ? req.user.id : req.body.clubId || null;

    const event = new Event({
      title, description, category, date, time, venue, capacity, banner, createdBy, clubId
    });

    await event.save();
    res.status(201).json({ message: "Event created, pending admin approval", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public: list all approved events
exports.listApprovedEvents = async (req, res) => {
  try {
    const q = {};
    // optional filtering by clubId, category, search etc.
    if (req.query.clubId) q.clubId = req.query.clubId;
    q.status = "approved";

    const events = await Event.find(q).populate("createdBy", "name email role").sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get details
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name role");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register user for event
exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.status !== "approved") return res.status(400).json({ message: "Event is not open for registration" });

    if (event.participants.includes(userId)) return res.status(400).json({ message: "Already registered" });

    if (event.capacity && event.participants.length >= event.capacity) {
      return res.status(400).json({ message: "Event full" });
    }

    event.participants.push(userId);
    await event.save();

    res.json({ message: "Registered successfully", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Club: list own events (any status)
exports.listClubEvents = async (req, res) => {
  try {
    // club user sees own events; admin can provide clubId in query
    const q = {};
    if (req.user.role === "club") q.createdBy = req.user.id;
    if (req.query.clubId && req.user.role === "admin") q.createdBy = req.query.clubId;
    const events = await Event.find(q).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


