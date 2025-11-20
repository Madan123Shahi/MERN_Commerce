// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminRequired && user.role !== "admin") {
    return <div className="p-8">Access denied: admins only</div>;
  }

  return children;
};

export default ProtectedRoute;
