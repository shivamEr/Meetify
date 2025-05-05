const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topic: String,
  language: String,
  privacy: { type: String, enum: ['Public', 'Private'], default: 'Private' },
  password: String, // Only needed if private
  capacity: { type: Number, default: 10 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['open', 'full', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 5 * 60 * 1000) }
});

// TTL index to auto-delete rooms
RoomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Room', RoomSchema);