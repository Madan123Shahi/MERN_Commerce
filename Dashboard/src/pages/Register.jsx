import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        secretKey: form.secretKey, // backend expects secretKey for /users/admin route; but /auth/register creates normal user
      });
      // after creating admin you still need to login
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Create Admin</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block mt-3">
          <span className="text-sm">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block mt-3">
          <span className="text-sm">Password</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block mt-3">
          <span className="text-sm">Admin Secret Key</span>
          <input
            value={form.secretKey}
            onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
        <button className="mt-6 w-full py-2 bg-green-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
}
