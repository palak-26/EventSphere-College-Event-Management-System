const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/authController');
const generateCertificate = require('../utils/generateCertificate');
const Certificate = require('../models/Certificate');
const Event = require('../models/Event');

router.post('/generate', authMiddleware, async (req,res)=>{
  // expects { eventId, userId } - admin/club can request or user for self
  const { eventId, userId } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ msg:'Event not found' });

  // generate PDF and save filename
  const filename = await generateCertificate({ event, userId });
  const cert = new Certificate({ event: eventId, user: userId, filename });
  await cert.save();
  res.json({ filename, id: cert._id });
});

module.exports = router;
