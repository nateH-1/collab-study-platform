import React, { useState } from "react";

export default function Groups() {
  // All available groups in the platform (simulate as shared/public for now)
  const [allGroups, setAllGroups] = useState([
    // Example initial group
    // { id: 1, name: "Math Study Group", desc: "All about calculus and more." }
  ]);
  // Groups this user has joined
  const [myGroups, setMyGroups] = useState([]);
  // For creating a new group
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  // For joining a group
  const [joinName, setJoinName] = useState("");
  const [joinError, setJoinError] = useState("");

  // Create a new group
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    // Prevent duplicate group names
    if (allGroups.some(g => g.name === name.trim())) {
      alert("A group with that name already exists.");
      return;
    }
    const newGroup = { id: Date.now(), name: name.trim(), desc };
    setAllGroups([...allGroups, newGroup]);
    setName("");
    setDesc("");
  };

  // Join a group by name
  const handleJoinGroup = (e) => {
    e.preventDefault();
    setJoinError("");
    const found = allGroups.find(g => g.name === joinName.trim());
    if (!found) {
      setJoinError("No group with that name found.");
      return;
    }
    if (myGroups.some(g => g.id === found.id)) {
      setJoinError("You already joined this group.");
      return;
    }
    setMyGroups([...myGroups, found]);
    setJoinName("");
  };

  // Leave a joined group
  const handleLeave = (id) => {
    setMyGroups(myGroups.filter(g => g.id !== id));
  };

  // Delete a group (owner only)
  const handleDelete = (id) => {
    setAllGroups(allGroups.filter(g => g.id !== id));
    setMyGroups(myGroups.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#181818] py-10 px-2">
      <div className="max-w-xl mx-auto bg-[#232323] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Groups</h2>

        {/* Create Group */}
        <form onSubmit={handleAddGroup} className="mb-8">
          <input
            placeholder="Group Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Create Group
          </button>
        </form>

        {/* Join Group */}
        <form onSubmit={handleJoinGroup} className="mb-8">
          <div className="flex gap-4">
            <input
              placeholder="Enter Group Name to Join"
              value={joinName}
              onChange={e => setJoinName(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Join Group
            </button>
          </div>
          {joinError && (
            <div className="text-red-400 mt-2">{joinError}</div>
          )}
        </form>

        {/* My Groups */}
        <div className="mb-6">
          <h3 className="text-xl text-white font-bold mb-3">My Groups</h3>
          {myGroups.length === 0 ? (
            <div className="text-gray-400">You haven’t joined any groups yet.</div>
          ) : (
            <ul className="space-y-4">
              {myGroups.map(g => (
                <li key={g.id} className="bg-[#1a1a1a] rounded-lg p-4 shadow flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-white font-semibold">{g.name}</span>
                    <button
                      onClick={() => handleLeave(g.id)}
                      className="text-red-400 hover:text-red-600 font-semibold"
                    >
                      Leave
                    </button>
                  </div>
                  {g.desc && <p className="mt-2 text-gray-200">{g.desc}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <hr className="border-gray-600 mb-6" />

        {/* All Groups (for reference/testing) */}
        <div>
          <h3 className="text-xl text-white font-bold mb-3">All Groups</h3>
          {allGroups.length === 0 ? (
            <div className="text-gray-400">No groups have been created yet.</div>
          ) : (
            <ul className="space-y-4">
              {allGroups.map(g => (
                <li key={g.id} className="bg-[#292929] rounded-lg p-4 shadow flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{g.name}</span>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-red-400 hover:text-red-600 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                  {g.desc && <p className="mt-2 text-gray-200">{g.desc}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
