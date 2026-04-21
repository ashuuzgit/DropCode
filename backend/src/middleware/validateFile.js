const multer = require('multer');
const { fileTypeFromBuffer } = require('file-type');
const { isAllowedType } = require('../utils/fileTypes');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: async (req, file, cb) => {
    try {
      const buffer = file.buffer;
      const type = await fileTypeFromBuffer(buffer);
      if (!type || !isAllowedType(type.mime)) {
        return cb(new Error('Invalid file type'));
      }
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  }
});

module.exports = upload;