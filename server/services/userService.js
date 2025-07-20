const userDao = require("../dao/userDao");

const findOrCreateUser = async (googleProfile, tokens) => {
  const existingUser = await userDao.findUserByGoogleId(googleProfile.id);

  if (existingUser) {
    return existingUser;
  }

  const newUser = await userDao.createUser({
    googleId: googleProfile.id,
    displayName: googleProfile.displayName,
    email: googleProfile.emails[0].value,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  return newUser;
};

module.exports = { findOrCreateUser };
