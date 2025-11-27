import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
  <header className="bg-linear-to-r from-green-400 to-green-600 shadow-md">
  <div className="container flex items-center justify-between h-16 text-white">
    <h1 className="text-xl font-bold">Shopping Duniya - Admin</h1>

    <div className="flex items-center gap-4">
      {user && <span className="text-base">Hi, {user.name}</span>}

      <button
        onClick={logout}
        className="cursor-pointer px-4 py-1 rounded bg-white text-green-600 font-medium shadow hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  </div>
</header>
  );
}
