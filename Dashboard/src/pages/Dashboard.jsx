import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import Products from "./Products";
import CreateProduct from "./CreateProduct";

export default function Dashboard() {
  return (
    <AdminLayout>

      {/* HEADER PANEL */}
      <div className="bg-green-100 border border-green-300 rounded-xl shadow-sm p-5 mb-8 relative overflow-hidden">

        {/* LIGHT GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-r from-green-50 to-green-200 opacity-30"></div>

        <div className="relative z-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-900">Manage Products</h2>

          <div className="flex gap-3">

            {/* View Products Button */}
            <Link
              to="products"
              className="px-4 py-2 rounded-lg border border-green-500 
                         text-green-700 font-medium bg-white hover:bg-green-50 
                         transition shadow-sm"
            >
              View Products
            </Link>

            {/* Add Product Button */}
            <Link
              to="products/create"
              className="px-4 py-2 rounded-lg bg-green-600 text-white 
                         font-semibold shadow hover:bg-green-500 transition"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateProduct />} />
        </Routes>
      </div>

    </AdminLayout>
  );
}
