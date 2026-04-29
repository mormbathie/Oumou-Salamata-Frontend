import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateStudent from "../pages/CreateStudent";
import EditStudent from "../pages/EditStudent";
import StudentDetails from "../pages/StudentDetails";
import Students from "../pages/Students";
import PrivateRoute from "../routes/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students" element={<Students />} />
      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}