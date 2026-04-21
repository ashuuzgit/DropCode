const crypto = require('crypto');

const generateCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars
};

const getExpiryDate = (duration) => {
  const now = new Date();
  switch (duration) {
    case '24h': return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case '7d': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case '30d': return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    default: return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }
};

module.exports = { generateCode, getExpiryDate };