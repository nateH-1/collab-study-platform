import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SidebarLayout from "./layouts/SidebarLayout";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Groups from "./pages/Groups";
import Resources from "./pages/Resources";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard pages */}
      <Route
        element={isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />}
      >
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/resources" element={<Resources />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
