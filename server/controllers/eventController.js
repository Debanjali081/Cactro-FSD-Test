const EventLog = require("../models/EventLog");

const getUserLogs = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const logs = await EventLog.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch event logs" });
  }
};

module.exports = { getUserLogs };
