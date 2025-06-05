// src/pages/Notes.jsx
import React, { useState, useEffect } from "react";

function Notes({ userId }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes for this user
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/notes/${userId}`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Error fetching notes:", err));
  }, [userId]);

  // Add a new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userId, title, content }),
    });
    const data = await res.json();
    setNotes([...notes, data]);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleAddNote}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Note</button>
      </form>
      <hr />
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
