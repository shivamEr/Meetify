const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topic: String,
  language: String,
  privacy: { type: String, enum: ['Public', 'Private'], default: 'Private' },
  password: String, // Only needed if private
  capacity: { type: Number, default: 10 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // optional
  status: { type: String, enum: ['open', 'full', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date} // Optional for TTL-based cleanup
});

// Optional: TTL index to auto-delete rooms
RoomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 100 });

module.exports = mongoose.model('Room', RoomSchema);
