const allowedTypes = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'image/webp': 'image',
  'video/mp4': 'video',
  'video/avi': 'video',
  'video/quicktime': 'video',
  'video/x-msvideo': 'video',
  'video/webm': 'video',
  'application/pdf': 'raw',
  'text/plain': 'raw',
  'text/markdown': 'raw',
  'text/x-markdown': 'raw',
  'application/javascript': 'raw',
  'application/json': 'raw',
  'application/zip': 'raw',
  'application/x-zip-compressed': 'raw',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'raw',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'raw',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'raw',
  'application/msword': 'raw',
  'application/vnd.ms-excel': 'raw',
  'application/vnd.ms-powerpoint': 'raw',
  'text/x-python': 'raw',
  'text/x-c++src': 'raw',
  'application/octet-stream': 'raw'
};
const isAllowedType = (mime) => Boolean(mime);

const getResourceType = (mime) => allowedTypes[mime] || 'raw';

module.exports = { allowedTypes, isAllowedType, getResourceType };