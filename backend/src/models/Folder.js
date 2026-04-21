const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  code: { type: String,
     required: true,
      unique: true },
      
  files: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  editToken: { type: String, select: false }
});

// TTL index
folderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Folder', folderSchema);