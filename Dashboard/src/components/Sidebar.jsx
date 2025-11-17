import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  return (
    <aside className="w-64 bg-emerald-700 text-white p-5">
      <h1 className="text-xl font-bold mb-6">Admin</h1>
      <ul className="space-y-3">
        <li><Link to="/admin" className="block py-2 px-3 hover:bg-emerald-600 rounded">Dashboard</Link></li>
        <li><Link to="/admin/products" className="block py-2 px-3 hover:bg-emerald-600 rounded">Products</Link></li>
      </ul>
    </aside>
  );
}
