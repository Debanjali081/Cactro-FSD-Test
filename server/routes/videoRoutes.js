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


router.get("/:videoId", getVideoDetails);

router.put("/:videoId/update", updateVideoDetails);


router.get("/:videoId/comments", getComments);

router.post("/:videoId/comments", addComment);

router.delete("/:videoId/comments/:commentId", deleteComment);

router.post("/:videoId/comments/:commentId/reply", replyToComment);


router.get("/:videoId/notes", getNote);

router.post("/:videoId/notes", saveNote);

module.exports = router;
