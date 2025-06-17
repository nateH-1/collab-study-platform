import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function SidebarLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    if(window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    navigate("/login");
  }
  }
  return (
    <div className="flex h-screen bg-[#181818]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1e1e] text-white flex flex-col p-6 gap-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Student Platform</h2>
        <NavLink to="/tasks" className="hover:bg-blue-700 px-4 py-2 rounded-xl" activeclassname="bg-blue-700">
          Tasks
        </NavLink>
        <NavLink to="/notes" className="hover:bg-blue-700 px-4 py-2 rounded-xl" activeclassname="bg-blue-700">
          Notes
        </NavLink>
        <NavLink to="/groups" className="hover:bg-blue-700 px-4 py-2 rounded-xl" activeclassname="bg-blue-700">
          Groups
        </NavLink>
        <NavLink to="/resources" className="hover:bg-blue-700 px-4 py-2 rounded-xl" activeclassname="bg-blue-700">
          Resources
        </NavLink>
        <button
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto text-white bg-[#181818]">
        <Outlet />
      </main>
    </div>
  );
}
