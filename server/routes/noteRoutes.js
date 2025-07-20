const express = require("express");
const router = express.Router();
const { createNote, getNotes, deleteNote } = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); 

// POST /api/notes
router.post("/", createNote);

// GET /api/notes/:videoId
router.get("/:videoId", getNotes);

// DELETE /api/notes/:id
router.delete("/:id", deleteNote);

module.exports = router;
