const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const folderSchema = new mongoose.Schema({
  code: { type: String,
     required: true,
      unique: true },

  files: {
    type: [fileSchema],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  editToken: { type: String, select: false }
});

// TTL index
folderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Folder', folderSchema);