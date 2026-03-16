import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../../app/axios";
import { useAuth } from "../../app/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await app.post("/login", {
        email,
        password,
        role
      });

      login(res.data.token,role);
    
      navigate("/problems");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
      <div className="w-full max-w-lg px-6">

        {/* Brand */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Code<span className="text-blue-600">Nest</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Build logic. Break limits.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setRole("user")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition
                ${
                  role === "user"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600"
                }`}
            >
              User
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition
                ${
                  role === "admin"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600"
                }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full bg-transparent border-b-2 border-gray-300
                py-2 text-lg text-gray-900
                focus:outline-none focus:border-blue-600
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full bg-transparent border-b-2 border-gray-300
                py-2 text-lg text-gray-900
                focus:outline-none focus:border-blue-600
                transition
              "
            />
          </div>

          <button
            onClick={handleLogin}
            className="
              w-full mt-10 py-3 text-lg font-medium
              text-white bg-blue-600
              hover:bg-blue-700
              transition
            "
          >
            Sign in
          </button>
        </div>

        
        {/* Register (only for user role) */}
{role === "user" && (
  <div className="mt-12 text-center text-gray-600">
    New User here?{" "}
    <Link
      to="/register"
      className="text-blue-600 font-medium hover:underline"
    >
      Create an account
    </Link>
  </div>
)}
</div>
</div>
  );
}