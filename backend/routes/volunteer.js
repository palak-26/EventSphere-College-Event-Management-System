const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const { authMiddleware } = require("../controllers/authController");

// =====================
// APPLY FOR VOLUNTEER
// =====================
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const { eventId, clubId } = req.body;

    const exists = await Volunteer.findOne({
      student: req.user.id,
      event: eventId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const volunteer = await Volunteer.create({
      student: req.user.id,
      event: eventId,
      club: clubId,
    });

    res.json({ message: "Request sent", volunteer });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// CLUB VIEW REQUESTS
// =====================
router.get("/club", authMiddleware, async (req, res) => {
  try {
    const requests = await Volunteer.find()
      .populate({
        path: "event",
        match: { createdBy: req.user.id },
        select: "title"
      })
      .populate("student", "name");

    // remove null events
    const filtered = requests.filter(r => r.event);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// UPDATE STATUS
// =====================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================
// STUDENT VIEW
// =====================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const myRequests = await Volunteer.find({ student: req.user.id })
      .populate("event", "title")
      .populate("club", "name");

    res.json(myRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;