import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
