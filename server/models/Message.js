const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    type: { type: String, enum: ['text', 'file'], default: 'text' },
    timestamp: { type: Date, default: Date.now }
});
  