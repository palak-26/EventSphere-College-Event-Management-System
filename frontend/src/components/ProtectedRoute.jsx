import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white p-10">Loading...</div>;

  // If not logged in
  if (!user) return <Navigate to="/login" replace />;

  // If role mismatch
  if (!roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
