const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { authMiddleware } = require("../controllers/authController");

// ✅ GET messages by club
router.get("/:club", authMiddleware, async (req, res) => {
  try {
    const club = decodeURIComponent(req.params.club);

    const messages = await Message.find({ club })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;