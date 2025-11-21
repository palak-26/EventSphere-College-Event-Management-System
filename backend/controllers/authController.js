const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// AUTH MIDDLEWARE
// =========================
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id + role inside token
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// =========================
// REGISTER
// =========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,   
      role
    });

    await user.save();

    res.json({ message: "Registered successfully", user });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // Compare with passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash); 
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Role must match
    if (user.role != role) {
      return res.status(403).json({
        message: `Invalid role selected. You are registered as "${user.role}".`,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err); // NOW SHOWS REAL ERROR
    res.status(500).json({ message: err.message });
  }
};

// =========================
// User
// =========================
exports.getUserProfile = async (req, res) => {
  try {
    const { role, id, name } = req.params;

    // Verify role is correct
    if (!["admin", "club", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role in URL" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure URL role matches stored role
    if (user.role !== role) {
      return res.status(403).json({ message: "Role mismatch in URL" });
    }

    // Optionally verify name slug
    const formattedName = user.name.replace(/\s+/g, "-");
    if (name !== formattedName) {
      return res.status(400).json({
        message: `Incorrect name in URL — expected ${formattedName}`,
      });
    }

    res.json({
      success: true,
      user,
      profileURL: `/auth/${role}/${id}/${formattedName}`
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
