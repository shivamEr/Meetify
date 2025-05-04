const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: { type: String, default: '' }, // optional
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // optional
  roomsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }], // optional
  roomsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],  // optional
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
