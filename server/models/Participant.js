const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
    role: { type: String, enum: ['host', 'guest'], default: 'guest' },
    isMuted: { type: Boolean, default: false },
    isKicked: { type: Boolean, default: false }
});
  