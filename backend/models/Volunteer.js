const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // club user
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Volunteer", volunteerSchema);