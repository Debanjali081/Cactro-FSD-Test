const User = require("../models/User");

const findUserByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = { findUserByGoogleId, createUser };
