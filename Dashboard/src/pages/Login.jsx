import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <label className="block">
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
        <button className="mt-6 w-full py-2 bg-blue-600 text-white rounded">
          Login
        </button>
        <div className="mt-3 text-sm text-center">
          <a href="/register" className="text-blue-600">
            Create admin account
          </a>
        </div>
      </form>
    </div>
  );
}
