import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/LoginPage";
import Register from "../pages/Register/RegisterPage";
import Home from "../pages/Home/HomePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/routes/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);


