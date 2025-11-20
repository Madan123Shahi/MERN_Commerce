import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import ProtectedAdmin from "./components/ProtectedAdmin";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login */}
        <Route path="/auth/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
        </Route>

        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
