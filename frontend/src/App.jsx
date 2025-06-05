import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

function App() {
  //const userId = "YOUR_USER_ID"; // Replace with your MongoDB user's _id for now
  const userId = "59b99db4cfa9a34dcd7885b6"; // mongodb user ID for testing purposes


  return (
    <div>
      <nav>
        <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 16 }}>Register</Link>
        <Link to="/notes">Notes</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes userId={userId} />} />
        <Route path="/" element={<h1>Welcome Home!</h1>} />
      </Routes>
    </div>
  );
}

export default App;




