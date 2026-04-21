const redis = require('../config/redis');

const rateLimit = (key, windowMs, maxRequests) => {
  return async (req, res, next) => {
    const clientKey = `${key}:${req.ip}`;
    const requests = await redis.incr(clientKey);
    if (requests === 1) {
      await redis.expire(clientKey, windowMs / 1000);
    }
    if (requests > maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  };
};

const createFolderLimiter = rateLimit('createFolder', 60 * 1000, 5); // 5 per min
const accessFolderLimiter = rateLimit('accessFolder', 60 * 1000, 10); // 10 per min
const uploadLimiter = rateLimit('upload', 60 * 1000, 20); // 20 per min

module.exports = { createFolderLimiter, accessFolderLimiter, uploadLimiter };