// backend/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Club = require('../models/Club');

// public leaderboard aggregated by club
router.get('/', async (req, res) => {
  // aggregate events per club (approved)
  const agg = await Event.aggregate([
    { $match: { status: 'approved' } },
    { $group: { _id: '$club', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 50 }
  ]);
  // populate club names
  const results = [];
  for (const a of agg) {
    const club = await Club.findById(a._id);
    results.push({ club: club ? club.name : 'Unknown', events: a.count });
  }
  res.json(results);
});

module.exports = router;
