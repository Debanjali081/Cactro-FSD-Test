const express = require("express");
const router = express.Router();
const { getUserLogs } = require("../controllers/eventController");



// GET /api/events
router.get("/", getUserLogs);

module.exports = router;
