const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");
const { authMiddleware } = require("../controllers/authController");
const User = require("../models/User")


/* ------------------------------
   1) CREATE EVENT (CLUB)
--------------------------------*/
router.post(
  "/create",
  authMiddleware,
 upload.single("image"),
  async (req, res) => {
    
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const { title, description, date, time, venue, capacity } = req.body;

      const newEvent = new Event({
        title,
        description,
        date,
        time,
        venue,
        capacity,
        createdBy: req.user.id,
        banner: req.file ? `/uploads/events/${req.file.filename}` : null,
        status: "pending",
      });


      await newEvent.save();
      res.json({ message: "Event created successfully!", event: newEvent });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



/* ------------------------------
   2) PUBLIC - APPROVED EVENTS
--------------------------------*/
router.get("/public/approved", async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" })
      .limit(2)
      .sort({ createdAt: 1 })
      .populate("createdBy", "name email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ------------------------------
   3) MY REGISTRATIONS (STUDENT)
--------------------------------*/
router.get("/my-registrations", authMiddleware, async (req, res) => {
  const events = await Event.find({ participants: req.user.id });
  res.json(events);
});


/* ------------------------------
   4) CHECK IF REGISTERED
--------------------------------*/
router.get("/:id/check", authMiddleware, async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res.status(404).json({ registered: false });

  res.json({
    registered: event.participants.includes(req.user.id)
  });
});


/* ------------------------------
   5) REGISTER FOR EVENT
--------------------------------*/
router.post("/:id/register", authMiddleware, async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res.status(404).json({ message: "Event not found" });

  if (event.participants.includes(req.user.id))
    return res.status(400).json({ message: "Already registered" });

  event.participants.push(req.user.id);
  User.updateOne({_id: req.user.id},{$inc: {events_participated:1}} )
  await event.save();

  res.json({ message: "Registered successfully!" });
});


/* ------------------------------
  GET ALL EVENTS
--------------------------------*/
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE event (CLUB only, must be owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Fetch event
    const event = await Event.findById(req.params.id);
    console.log("DELETE HIT:", req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only clubs who created the event can delete it
    if (req.user.role !== "club" || event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ------------------------------
   UPDATE EVENT (CLUB)
--------------------------------*/
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


/* ------------------------------
  EVENT DETAILS 
--------------------------------*/
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!event)
      return res.status(404).json({ message: "Not found" });

    res.json(event);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});



module.exports = router;
