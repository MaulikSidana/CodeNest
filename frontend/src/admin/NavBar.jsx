import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import Dashboard from "../pages/Dashboard";

export default function AdminNavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">

          {/* Logout (LEFT MOST) */}
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>

          {/* Admin Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/admin/add-question" className="hover:text-gray-300">
              Add Question
            </Link>


            <Link to="/admin/dashboard" className="hover:text-gray-300">
                Dashboard
            </Link>
          </nav>
        </div>

        {/* RIGHT: Admin Badge */}
        <div className="text-sm font-semibold tracking-wide">
          Admin Panel
        </div>

      </div>
    </header>
  );
}
