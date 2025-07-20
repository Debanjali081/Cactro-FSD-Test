const router = require('express').Router();
const passport = require('passport');

const CLIENT_HOME_URL = process.env.CLIENT_HOME_URL || 'https://cactro-fsd-test.onrender.com';


// Start Google OAuth
console.log("GET /google");
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Callback after Google login
console.log("GET /google/callback");
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Optional: Send token as a cookie or query param here
    res.redirect(`${CLIENT_HOME_URL}/dashboard`);
  }
);

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send({ success: true });
  });
});

module.exports = router;
