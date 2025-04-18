const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: String,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['public', 'private'] },
    password: String,
    maxUsers: Number,
    expiresAt: Date,
    isActive: { type: Boolean, default: true }
  });
  