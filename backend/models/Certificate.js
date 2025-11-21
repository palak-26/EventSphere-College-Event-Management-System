const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issuedAt: { type: Date, default: Date.now },
  filename: { type: String }, // path to generated PDF
});

module.exports = mongoose.model('Certificate', CertificateSchema);
