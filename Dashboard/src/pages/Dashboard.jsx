import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import Products from "./Products";
import CreateProduct from "./CreateProduct";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <Link to="products" className="px-3 py-1 border rounded">
            Products
          </Link>
          <Link
            to="products/create"
            className="px-3 py-1 ml-2 bg-blue-600 text-white rounded"
          >
            Add Product
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<div>Welcome to admin dashboard</div>} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
      </Routes>
    </AdminLayout>
  );
}
