const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../controllers/authController');

// Middleware to check if user is admin
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admin access only' });
  }
  next();
}

/**
 * GET ALL USERS — ADMIN ONLY
 */
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
});

/**
 * GET USER BY ID — ADMIN OR SELF
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user' });
  }
});

/**
 * UPDATE USER PROFILE — SELF ONLY
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'You can only update your own profile' });
    }

    const { name, profilePicture } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, profilePicture },
      { new: true }
    ).select('-passwordHash');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update profile' });
  }
});

/**
 * DELETE USER — ADMIN ONLY
 */
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete user' });
  }
});

/**
 * GET USERS BY CLUB — ADMIN OR CLUB LEADER
 */
router.get('/club/:clubId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'club') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const users = await User.find({ clubId: req.params.clubId }).select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch club members' });
  }
});


module.exports = router;
