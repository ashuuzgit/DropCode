const multer = require('multer');
const { isAllowedType } = require('../utils/fileTypes');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    try {
      // Note: in multer fileFilter, file.buffer is not available yet.
      // Validate using the declared MIME type and do deep checks later if needed.
      if (!isAllowedType(file.mimetype)) {
        return cb(new Error('Invalid file type'));
      }
      cb(null, true);
    } catch (err) {
      cb(err);
    }
  }
});

module.exports = upload;