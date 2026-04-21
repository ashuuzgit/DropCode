const express = require('express');
const { uploadFiles } = require('../controllers/uploadController');
const upload = require('../middleware/validateFile');
const { uploadLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', uploadLimiter, upload.array('files'), uploadFiles);

module.exports = router;