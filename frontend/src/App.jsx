import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Problems from "./pages/problems";
import Question from "./pages/QuestionPage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import { useAuth } from "../app/AuthContext";
import UserNavBar from "./components/NavBar";
import AdminNavBar from "./admin/NavBar";
import ProtectedRoute,{ AdminRoute }  from "../app/ProtectedRoute";
import AddQuestion from "./admin/AddQuestion";
import AdminDashboard from "./admin/Dashboard";
import UpdateQuestion from "./admin/UpdateQuestion";
import ViewQuestion from "./admin/ViewQuestion";

export default function App() {
  const { token ,role} = useAuth();

  return (
    <BrowserRouter>
    {token && (role === "admin" ? <AdminNavBar /> : <UserNavBar />)}

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login /> }/>
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/problems" element={<Problems />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/:title" element={<Question />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/add-question" element={<AddQuestion />} />
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           <Route path="/admin/question/:id" element={<ViewQuestion />} />
           <Route path="/admin/update-question/:id" element={<UpdateQuestion />} />
        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={token ? "/problems" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}