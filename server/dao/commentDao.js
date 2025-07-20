// dao/commentDao.js
const Comment = require("../models/Comment");

const createComment = async ({ videoId, userId, username, text }) => {
  const comment = new Comment({ videoId, userId, username, text });
  return await comment.save();
};

const getCommentsByVideoId = async (videoId) => {
  return await Comment.find({ videoId }).sort({ createdAt: -1 });
};

const deleteCommentById = async (commentId, userId) => {
  return await Comment.findOneAndDelete({ _id: commentId, userId });
};

const replyToComment = async ({ commentId, userId, username, replyText }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  comment.replies.push({ userId, username, text: replyText });
  return await comment.save();
};

module.exports = {
  createComment,
  getCommentsByVideoId,
  deleteCommentById,
  replyToComment,
};
