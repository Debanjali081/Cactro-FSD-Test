const axios = require("axios");
const commentDao = require("../dao/commentDao");
const noteDao = require("../dao/noteDao");
const eventService = require("../services/eventService");

const getVideoDetails = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: { part: "snippet", id: videoId, key: apiKey },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video details" });
  }
};

const updateVideoDetails = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { videoId } = req.params;
    const accessToken = req.headers["authorization"];

    const response = await axios.put(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet`,
      {
        id: videoId,
        snippet: { title, description },
      },
      {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    await eventService.logAction(req.headers["x-user-id"], "Updated Video", videoId);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to update video details" });
  }
};

// 💬 Comment Handlers
const getComments = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.headers["x-user-id"];
 const comments = await commentDao.getCommentsByVideoId(videoId);
  res.json(comments);
};

const addComment = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.headers["x-user-id"];
  const { text } = req.body;
  const comment = await commentDao.addComment(videoId, userId, text);
  res.status(201).json(comment);
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.headers["x-user-id"];
  await commentDao.deleteComment(commentId, userId);
  res.status(204).send();
};

const replyToComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.headers["x-user-id"];
  const { text } = req.body;
  const reply = await commentDao.addReply(commentId, userId, text);
  res.status(201).json(reply);
};

// 📝 Notes Handlers
const getNote = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.headers["x-user-id"];

  if (!userId || userId === "null") {
    return res.status(400).json({ error: "Missing user ID in headers" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  const notes = await noteDao.getNotesByUserAndVideo(userId, videoId);
  res.json(notes);
};

const saveNote = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.headers["x-user-id"];
  const { content } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing user ID in headers" });
  }

  const updated = await noteDao.saveNote(videoId, userId, content);
  res.status(200).json(updated);
};


module.exports = {
  getVideoDetails,
  updateVideoDetails,
  getComments,
  addComment,
  deleteComment,
  replyToComment,
  getNote,
  saveNote,
};
