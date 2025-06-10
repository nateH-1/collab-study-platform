import React, { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Add a new note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setNotes([...notes, { id: Date.now(), title, content }]);
    setTitle("");
    setContent("");
  };

  // Delete note
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Start editing
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Save edit
  const handleEditNote = (e) => {
    e.preventDefault();
    setNotes(notes.map((note) =>
      note.id === editingId ? { ...note, title: editTitle, content: editContent } : note
    ));
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="min-h-screen bg-[#181818] py-10 px-2">
      <div className="max-w-xl mx-auto bg-[#232323] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Notes</h2>
        <form onSubmit={handleAddNote} className="mb-8">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add Note
          </button>
        </form>
        <hr className="border-gray-600 mb-6" />
        {notes.length === 0 ? (
          <div className="text-center text-gray-400">
            No notes yet. Start by adding your first note!
          </div>
        ) : (
          <ul className="space-y-4">
            {notes.map(note => (
              <li key={note.id} className="bg-[#1a1a1a] rounded-lg p-4 shadow flex flex-col">
                {editingId === note.id ? (
                  <form onSubmit={handleEditNote} className="space-y-2">
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="block w-full px-3 py-2 rounded bg-[#232323] text-white border border-indigo-500"
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="block w-full px-3 py-2 rounded bg-[#232323] text-white border border-indigo-500 min-h-[60px]"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-white font-semibold">{note.title}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(note)}
                          className="text-indigo-400 hover:text-indigo-200 font-semibold"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-red-400 hover:text-red-600 font-semibold"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-200">{note.content}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


