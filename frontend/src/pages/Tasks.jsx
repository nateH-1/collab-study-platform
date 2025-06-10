import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: taskText, completed: false }
    ]);
    setTaskText("");
  };

  // Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edited task
  const handleEditTask = (e) => {
    e.preventDefault();
    setTasks(tasks.map((task) =>
      task.id === editingId ? { ...task, text: editText } : task
    ));
    setEditingId(null);
    setEditText("");
  };

  // Mark as complete/incomplete
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-[#181818] py-10 px-2">
      <div className="max-w-xl mx-auto bg-[#232323] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Tasks</h2>
        <form onSubmit={handleAddTask} className="mb-8 flex">
          <input
            placeholder="Enter a new task"
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
            required
            className="flex-1 mr-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add Task
          </button>
        </form>
        <hr className="border-gray-600 mb-6" />
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400">
            No tasks yet. Start by adding your first task!
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li
                key={task.id}
                className={`bg-[#1a1a1a] rounded-lg p-4 shadow flex flex-col ${task.completed ? "opacity-60" : ""}`}
              >
                {editingId === task.id ? (
                  <form onSubmit={handleEditTask} className="flex flex-col gap-2">
                    <input
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="block w-full px-3 py-2 rounded bg-[#232323] text-white border border-indigo-500"
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
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-lg ${task.completed ? "line-through text-gray-400" : "text-white font-semibold"} cursor-pointer`}
                      onClick={() => toggleComplete(task.id)}
                      title="Toggle complete"
                    >
                      {task.text}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(task)}
                        className="text-indigo-400 hover:text-indigo-200 font-semibold"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-400 hover:text-red-600 font-semibold"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

  