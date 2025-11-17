import React from 'react';
import { clearUser, getUser } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => { clearUser(); navigate('/admin/login'); };

  return (
    <header className="w-full bg-white p-4 shadow flex justify-between">
      <p className="font-semibold">Admin Dashboard</p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">{user?.name || 'Admin'}</span>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
