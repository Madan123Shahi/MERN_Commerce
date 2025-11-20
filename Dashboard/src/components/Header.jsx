import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/admin" className="text-xl font-bold">
          Shopping Duniya - Admin
        </Link>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm">Hi, {user.name}</span>}
          <Link to="/admin/products" className="px-3 py-1 rounded border">
            Products
          </Link>
          <Link
            to="/admin/products/create"
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Add
          </Link>
          <button onClick={logout} className="px-3 py-1 rounded border">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
