const noteService = require("../services/noteService");

const createNote = async (req, res) => {
  try {
    const { videoId, content } = req.body;
    const userId = req.headers["x-user-id"];

    const note = await noteService.addNote(userId, videoId, content);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.headers["x-user-id"];

    const notes = await noteService.getNotes(userId, videoId);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.headers["x-user-id"];

    await noteService.deleteNote(noteId, userId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};

module.exports = { createNote, getNotes, deleteNote };
