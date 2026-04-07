const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserProfile,
  authMiddleware
} = require("../controllers/authController");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);
router.get("/:role/:id/:name", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
