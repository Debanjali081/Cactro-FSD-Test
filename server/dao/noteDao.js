const Note = require("../models/Note");

const createNote = async (data) => {
  return await Note.create(data);
};

const getNotesByUserAndVideo = async (userId, videoId) => {
  return await Note.find({ user: userId, videoId });
};

const deleteNote = async (noteId, userId) => {
  return await Note.findOneAndDelete({ _id: noteId, user: userId });
};

module.exports = { createNote, getNotesByUserAndVideo, deleteNote };
