import React, { useState } from "react";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  // Add a resource (file is not uploaded, only info is saved for preview)
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || (!url.trim() && !desc.trim() && !file)) return;
    setResources([
      ...resources,
      {
        id: Date.now(),
        title: title.trim(),
        desc: desc.trim(),
        url: url.trim(),
        fileName: file ? file.name : "",
        fileSize: file ? file.size : 0,
        fileType: file ? file.type : "",
      }
    ]);
    setTitle("");
    setDesc("");
    setUrl("");
    setFile(null);
  };

  // Delete a resource
  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#181818] py-10 px-2">
      <div className="max-w-xl mx-auto bg-[#232323] rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-white">Resources</h2>
        {/* Add Resource */}
        <form onSubmit={handleAdd} className="mb-8">
          <input
            placeholder="Resource Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="URL (link to file or website, optional)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="block w-full mb-4 px-4 py-2 rounded-md bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label className="block mb-4 text-gray-300">
            Upload File (optional)
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              className="block mt-2"
            />
            {file && (
              <div className="mt-2 text-sm text-gray-400">
                <span className="font-semibold">{file.name}</span>
                {"  "}
                <span>({(file.size / 1024).toFixed(1)} KB, {file.type || "Unknown type"})</span>
              </div>
            )}
          </label>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add Resource
          </button>
        </form>
        <hr className="border-gray-600 mb-6" />
        {/* Resources List */}
        {resources.length === 0 ? (
          <div className="text-center text-gray-400">
            No resources shared yet. Add your first one!
          </div>
        ) : (
          <ul className="space-y-4">
            {resources.map(r => (
              <li key={r.id} className="bg-[#1a1a1a] rounded-lg p-4 shadow flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white font-semibold">{r.title}</span>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-400 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
                {r.desc && <p className="mt-2 text-gray-200">{r.desc}</p>}
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-indigo-400 hover:underline break-all"
                  >
                    {r.url}
                  </a>
                )}
                {r.fileName && (
                  <div className="mt-2 text-sm text-gray-400">
                    <span className="font-semibold">{r.fileName}</span>
                    {"  "}
                    <span>({(r.fileSize / 1024).toFixed(1)} KB, {r.fileType || "Unknown type"})</span>
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
