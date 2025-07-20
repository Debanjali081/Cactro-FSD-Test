const noteDao = require("../dao/noteDao");
const eventDao = require("../dao/eventDao");

const addNote = async (userId, videoId, content) => {
  const note = await noteDao.createNote({ user: userId, videoId, content });
  await eventDao.logEvent(userId, "Added Note", videoId);
  return note;
};

const getNotes = async (userId, videoId) => {
  return await noteDao.getNotesByUserAndVideo(userId, videoId);
};

const deleteNote = async (noteId, userId) => {
  const deletedNote = await noteDao.deleteNote(noteId, userId);
  if (deletedNote) {
    await eventDao.logEvent(userId, "Deleted Note", deletedNote.videoId);
  }
  return deletedNote;
};

module.exports = { addNote, getNotes, deleteNote };
