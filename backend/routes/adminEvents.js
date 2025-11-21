const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { authMiddleware } = require("../controllers/authController");

// Get pending events (admin only)
router.get("/pending", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });
  const events = await Event.find({ status: "pending" }).populate("createdBy", "name email");
  res.json(events);
});

router.get("/public/approved", async (req, res) => {
  try {
    console.log("[EVENTS] GET /public/approved");
    const events = await Event.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    console.error("[EVENTS] public/approved err", err);
    res.status(500).json({ message: err.message });
  }
});

// Update status (approve/reject)
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Unauthorized" });

    const { status } = req.body;

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Updated", event: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  const events = await Event.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.json(events);
});

module.exports = router;
