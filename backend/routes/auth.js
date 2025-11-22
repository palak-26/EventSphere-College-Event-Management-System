const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserProfile,
  authMiddleware
} = require("../controllers/authController");
const User = require("../models/User");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/:role/:id/:name", authMiddleware, getUserProfile);

module.exports = router;
