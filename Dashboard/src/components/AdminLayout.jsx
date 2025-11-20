import React from "react";
import Header from "./Header";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">{children}</main>
    </div>
  );
}
