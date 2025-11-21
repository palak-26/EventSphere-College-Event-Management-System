// backend/routes/club.js
const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../controllers/authController");
const requireRole = require("../middleware/roleAuth");
const Club = require("../models/Club");
const User = require("../models/User");

/* -------------------------------------------------------
   CREATE CLUB (Club registration)
   Role required: club
--------------------------------------------------------- */
router.post("/", authMiddleware, requireRole("club"), async (req, res) => {
  try {
    const { name, description, type } = req.body;

    const club = new Club({
      name,
      description,
      type,
      createdBy: req.user.id,
      verified: false, // admin has to approve
    });

    await club.save();
    res.json({ msg: "Club request submitted for approval", club });
  } catch (err) {
    console.error("Create Club Error:", err);
    res.status(500).json({ msg: "Error creating club" });
  }
});

/* -------------------------------------------------------
   GET ALL CLUBS (Public)
--------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find().populate("createdBy", "name email role");
    res.json(clubs);
  } catch (err) {
    console.error("Fetch Clubs Error:", err);
    res.status(500).json({ msg: "Error fetching clubs" });
  }
});

/* -------------------------------------------------------
   GET ONLY VERIFIED CLUBS (Public)
--------------------------------------------------------- */
router.get("/verified", async (req, res) => {
  try {
    const clubs = await Club.find({ verified: true })
      .populate("createdBy", "name email");
    res.json(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching verified clubs" });
  }
});

/* -------------------------------------------------------
   GET PENDING CLUBS (Admin)
--------------------------------------------------------- */
router.get("/pending", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const pendingClubs = await Club.find({ verified: false })
      .populate("createdBy", "name email");
    res.json(pendingClubs);
  } catch (err) {
    console.error("Fetch Pending Clubs Error:", err);
    res.status(500).json({ msg: "Error fetching pending clubs" });
  }
});

/* -------------------------------------------------------
   APPROVE CLUB (Admin)
--------------------------------------------------------- */
router.put("/:id/approve", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ msg: "Club not found" });

    club.verified = true;
    await club.save();

    res.json({ msg: "Club approved successfully", club });
  } catch (err) {
    console.error("Approve Club Error:", err);
    res.status(500).json({ msg: "Error approving club" });
  }
});

/* -------------------------------------------------------
   REJECT CLUB (Admin)
--------------------------------------------------------- */
router.put("/:id/reject", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ msg: "Club not found" });

    await Club.findByIdAndDelete(req.params.id);

    res.json({ msg: "Club rejected and removed" });
  } catch (err) {
    console.error("Reject Club Error:", err);
    res.status(500).json({ msg: "Error rejecting club" });
  }
});

/* -------------------------------------------------------
   GET CLUB BY ID (Public)
--------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!club) return res.status(404).json({ msg: "Club not found" });

    res.json(club);
  } catch (err) {
    console.error("Get Club Error:", err);
    res.status(500).json({ msg: "Error fetching club" });
  }
});

/* -------------------------------------------------------
   UPDATE CLUB PROFILE (Only Club Owner)
--------------------------------------------------------- */
router.put("/:id", authMiddleware, requireRole("club"), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ msg: "Club not found" });

    // Only the creator can update the club
    if (club.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "You are not authorized to update this club" });

    const { name, description, type } = req.body;

    club.name = name || club.name;
    club.description = description || club.description;
    club.type = type || club.type;

    await club.save();

    res.json({ msg: "Club updated successfully", club });
  } catch (err) {
    console.error("Update Club Error:", err);
    res.status(500).json({ msg: "Error updating club" });
  }
});

/* -------------------------------------------------------
   DELETE CLUB (Admin only)
--------------------------------------------------------- */
router.delete("/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) return res.status(404).json({ msg: "Club not found" });

    await club.deleteOne();

    res.json({ msg: "Club deleted successfully" });
  } catch (err) {
    console.error("Delete Club Error:", err);
    res.status(500).json({ msg: "Error deleting club" });
  }
});

module.exports = router;
