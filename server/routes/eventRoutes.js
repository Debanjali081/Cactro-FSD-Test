const express = require("express");
const router = express.Router();
const { getUserLogs } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); 

// GET /api/events
router.get("/", getUserLogs);

module.exports = router;
