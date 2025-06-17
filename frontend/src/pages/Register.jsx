import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Registration successful! You can now log in.");
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1000); // Optional: auto-redirect to login after success
      } else {
        setMsg(data.message || "Registration failed.");
      }
    } catch (err) {
      setMsg("Network error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818] relative">
      {/* Back Arrow to Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center text-indigo-400 hover:text-indigo-200 font-semibold text-lg"
        aria-label="Back to Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Home
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-[#232323] rounded-xl shadow-xl px-12 py-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Register
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 rounded bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mb-4 w-full px-4 py-2 rounded bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold mb-4 transition"
        >
          Register
        </button>
        {msg && (
          <div className={`text-center mt-2 ${success ? "text-green-400" : "text-red-500"}`}>
            {msg}
          </div>
        )}
        <div className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
