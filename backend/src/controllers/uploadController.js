const Folder = require('../models/Folder');
const cloudinary = require('../config/cloudinary');
const { getResourceType } = require('../utils/fileTypes');

const uploadFiles = async (req, res) => {
  try {
    const { code } = req.body;
    const folder = await Folder.findOne({ code });
    if (!folder) return res.status(404).json({ error: 'Folder not found' });

    const uploadedFiles = [];
    for (const file of req.files) {
      const resourceType = getResourceType(file.mimetype);
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
        resource_type: resourceType,
        public_id: `${code}/${file.originalname}`,
        format: file.mimetype.split('/')[1]
      });
      uploadedFiles.push({
        name: file.originalname,
        url: result.secure_url,
        type: file.mimetype,
        size: file.size
      });
    }
    folder.files.push(...uploadedFiles);
    await folder.save();
    res.json({ files: uploadedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadFiles };