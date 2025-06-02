import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
      <h1>Student Platform Frontend</h1>
      <p>Backend says: {message}</p>
      <nav>
        <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;


