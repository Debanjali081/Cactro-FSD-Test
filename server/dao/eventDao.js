const EventLog = require("../models/EventLog");

const logEvent = async (userId, action, videoId) => {
  return await EventLog.create({ user: userId, action, videoId });
};

module.exports = { logEvent };
