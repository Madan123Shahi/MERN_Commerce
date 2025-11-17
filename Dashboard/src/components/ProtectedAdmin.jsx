import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../auth/useAuth';

export default function ProtectedAdmin({ children }) {
  const user = getUser();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
