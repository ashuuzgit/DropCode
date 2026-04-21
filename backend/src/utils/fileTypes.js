const allowedTypes = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'video/mp4': 'video',
  'video/avi': 'video',
  'application/pdf': 'raw',
  'text/plain': 'raw',
  'text/markdown': 'raw',
  'application/javascript': 'raw',
  'application/json': 'raw',
  'text/x-python': 'raw',
  'text/x-c++src': 'raw'
};

const isAllowedType = (mime) => allowedTypes[mime];

const getResourceType = (mime) => allowedTypes[mime] || 'raw';

module.exports = { allowedTypes, isAllowedType, getResourceType };