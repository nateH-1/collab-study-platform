import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-neutral-900 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome</h1>
      <button
        className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
}


  