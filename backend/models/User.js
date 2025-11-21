const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type:String, required: true },
  email: { type:String, required: true, unique: true },
  passwordHash: { type:String, required: true },
  role: { type:String, enum:['student','club','admin'], default:'student' },
  events_participated : {type:Number , default:0},
  createdAt: { type:Date, default: Date.now },
  profilePicture: { type:String, default: '/assets/student_profile.png' },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', default: null }
});

module.exports = mongoose.model('User', UserSchema);
