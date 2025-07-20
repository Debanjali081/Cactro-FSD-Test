const express = require("express");
const router = express.Router();
const { createNote, getNotes, deleteNote } = require("../controllers/noteController");



// POST /api/notes
router.post("/" ,createNote);

// GET /api/notes/:videoId
router.get("/:videoId", getNotes);

// DELETE /api/notes/delete/:id ✅ fixed
router.delete("/:id", deleteNote);

module.exports = router;
