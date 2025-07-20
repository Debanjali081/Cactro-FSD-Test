const userService = require("../services/userService");

const handleOAuthCallback = async (req, res) => {
  try {
    const { profile, tokens } = req.body;

    const user = await userService.findOrCreateUser(profile, tokens);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email,
        accessToken: user.accessToken,
      }
    });
  } catch (err) {
    console.error("OAuth Error:", err.message);
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = { handleOAuthCallback };
