import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export default function Register() {
  const [name, setName] = useState("");      
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(`${api}/register`, {
        userName:name,        
        email,
        password,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("User already exists");
      } else {
        alert("Registration failed");
      }
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
            Create your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full bg-transparent border-b-2 border-gray-300
                py-2 text-lg text-gray-900
                focus:outline-none focus:border-blue-600
                transition
              "
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
            onClick={handleRegister}
            className="
              w-full mt-10 py-3 text-lg font-medium
              text-white bg-blue-600
              hover:bg-blue-700
              transition
            "
          >
            Create account
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-12 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
