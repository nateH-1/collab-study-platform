import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";


function App() {
  const userId = "59b99db4cfa9a34dcd7885b6";
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/notes" element={<Notes userId={userId} />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;






