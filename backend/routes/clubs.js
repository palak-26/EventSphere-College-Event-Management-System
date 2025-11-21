// backend/routes/clubs.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/authController');
const requireRole = require('../middleware/roleAuth');
const clubController = require('../controllers/clubController');

router.get('/', clubController.listAll);
router.post('/', authMiddleware, requireRole('club'), clubController.createClub);

// admin only: list pending & approve
router.get('/pending', authMiddleware, requireRole('admin'), clubController.listPending);
router.put('/:id/approve', authMiddleware, requireRole('admin'), clubController.approveClub);
router.get("/public", async (req, res) => {
  const events = await Event.find({ status: "approved" })
    .sort({ date: 1 });

  res.json(events);
});


module.exports = router;
