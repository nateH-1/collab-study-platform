import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="flex items-center space-x-6 py-4 px-8 bg-neutral-900 shadow">
      <Link
        to="/"
        className="font-semibold text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        Home
      </Link>
      
      <Link
        to="/notes"
        className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        Notes
      </Link>
      <Link
        to="/groups"
        className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        Groups
      </Link>
      <Link
        to="/tasks"
        className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        Tasks
      </Link>
      <Link
        to="/resources"
        className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        Resources
      </Link>
      {isLoggedIn ? (
        <Link
          to="/logout"
          className="ml-auto font-medium text-red-400 hover:text-red-600 transition-colors"
        >
          Logout
        </Link>
      ) : (
        <>
          <Link
            to="/login"
            className="ml-auto font-medium text-green-400 hover:text-green-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-medium text-green-400 hover:text-green-600 transition-colors"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
