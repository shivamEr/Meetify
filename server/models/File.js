const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  });
  