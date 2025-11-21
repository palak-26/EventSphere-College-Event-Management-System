// backend/controllers/clubController.js
const Club = require('../models/Club');
const User = require('../models/User');

exports.listPending = async (req, res) => {
  const pending = await Club.find({ verified: false }).populate('createdBy','name email');
  res.json(pending);
};

exports.approveClub = async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ msg: 'Club not found' });
  club.verified = true;
  await club.save();
  res.json(club);
};

// create club - user registers as club (role 'club' needed)
exports.createClub = async (req, res) => {
  const payload = req.body;
  payload.createdBy = req.user.id;
  payload.verified = false;
  const c = await Club.create(payload);
  res.json(c);
};

// list clubs (public)
exports.listAll = async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
};
