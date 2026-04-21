const express = require('express');
const { createFolder, getFolder, deleteFolder } = require('../controllers/folderController');
const { createFolderLimiter, accessFolderLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/create', createFolderLimiter, createFolder);
router.get('/:code', accessFolderLimiter, getFolder);
router.delete('/:code', deleteFolder);

module.exports = router;