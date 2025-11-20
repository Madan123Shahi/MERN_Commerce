import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedAdmin = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!user) return <Navigate to="/login" />; // not logged in

  if (role && user.role !== role) return <Navigate to="/unauthorized" />; // role mismatch

  return children;
};

export default ProtectedAdmin;
