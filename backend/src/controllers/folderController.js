const Folder = require('../models/Folder');
const { generateCode, getExpiryDate } = require('../utils/codeGenerator');
const crypto = require('crypto');

const createFolder = async (req, res) => {
  try {
    const { expiry = '24h' } = req.body;
    let code;
    do {
      code = generateCode();
    } while (await Folder.findOne({ code }));
    const editToken = crypto.randomUUID();
    const folder = new Folder({
      code,
      expiresAt: getExpiryDate(expiry),
      editToken
    });
    await folder.save();
    res.json({ code, editToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFolder = async (req, res) => {
  try {
    const { code } = req.params;
    const folder = await Folder.findOne({ code });
    if (!folder) return res.status(404).json({ error: 'Folder not found' });
    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { code } = req.params;
    const { editToken } = req.body;
    const folder = await Folder.findOne({ code });
    if (!folder || folder.editToken !== editToken) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    // Delete files from Cloudinary
    const cloudinary = require('../config/cloudinary');
    for (const file of folder.files) {
      const publicId = file.url.split('/').pop().split('.')[0];
      const resourceType = file.type.startsWith('image/') ? 'image' : 'raw';
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }
    await Folder.deleteOne({ _id: folder._id });
    res.json({ message: 'Folder deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createFolder, getFolder, deleteFolder };