const express = require("express");
const router = express.Router();
const {
  getVideoDetails,
  updateVideoDetails,
  getComments,
  addComment,
  deleteComment,
  replyToComment,
  getNote,
  saveNote
} = require("../controllers/videoController");

// Basic video fetch
router.get("/:videoId", getVideoDetails);

// Update title/description
router.put("/:videoId/update", updateVideoDetails);

// Comments
router.get("/:videoId/comments", getComments);
router.post("/:videoId/comments", addComment);
router.delete("/:videoId/comments/:commentId", deleteComment);
router.post("/:videoId/comments/:commentId/reply", replyToComment);

// Notes
router.get("/:videoId/notes", getNote);
router.post("/:videoId/notes", saveNote);

module.exports = router;
