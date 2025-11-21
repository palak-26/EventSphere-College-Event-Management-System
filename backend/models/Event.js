const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club", default: null },

  banner: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },

  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
