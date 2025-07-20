const eventDao = require("../dao/eventDao");

const logAction = async (userId, action, videoId) => {
  return await eventDao.logEvent(userId, action, videoId);
};

module.exports = { logAction };
