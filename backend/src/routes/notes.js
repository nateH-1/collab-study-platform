// src/routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE a note
router.post('/', async (req, res) => {
  try {
    const { user, title, content } = req.body;
    const note = new Note({ user, title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
});

// GET all notes for a user
router.get('/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notes', error: err.message });
  }
});

// UPDATE a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note', error: err.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
});

module.exports = router;
