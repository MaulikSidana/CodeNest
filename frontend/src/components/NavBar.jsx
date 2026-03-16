import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function TopNavBar() {
    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.replace("/login");
    }


  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Left: Nav Links */}
        <nav className="flex items-center gap-6 text-sm text-gray-600">
            <button  onClick={handleLogout} className="text-red-600 hover:underline">
            Logout
          </button>

          <Link to="/about" className="hover:text-gray-900">
            About
          </Link>

          <Link to="/problems" className="hover:text-gray-900">
            Problems
          </Link>

          <Link to="/dashboard" className="hover:text-gray-900">
            Dashboard
          </Link>

          
        </nav>

        {/* Right: Logo */}
        <Link
          to="/problems"
          className="text-lg font-semibold text-gray-800"
        >
          Code Nest
        </Link>

      </div>
    </header>
  );
}
