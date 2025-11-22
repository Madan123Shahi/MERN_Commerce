import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validations/userValidations";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
    general: "",
  });

  const [loadingCreate, setLoadingCreate] = useState(false); // for Create button
  const [loadingLogin, setLoadingLogin] = useState(false); // for Login button
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // LIVE VALIDATION
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    try {
      await registerSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setErrors({
      name: "",
      email: "",
      password: "",
      secretKey: "",
      general: "",
    });

    try {
      await registerSchema.validate(form, { abortEarly: false });
    } catch (validationErr) {
      const newErrors = {};
      validationErr.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setLoadingCreate(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        secretKey: form.secretKey,
      });

      navigate("/login");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err?.response?.data?.message || "Register failed",
      }));
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Create Admin</h2>

        {errors.general && (
          <div className="mb-3 text-red-600">{errors.general}</div>
        )}

        {/* NAME */}
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-green-500 rounded px-3 py-2 outline-none hover:ring-2 hover:ring-green-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        {/* EMAIL */}
        <label className="block mt-3">
          <span className="text-sm">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border-2 border-green-500 rounded px-3 py-2 outline-none hover:ring-2 hover:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>

        {/* PASSWORD */}
        <label className="block mt-3">
          <span className="text-sm">Password</span>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full border-2 border-green-500 rounded px-3 py-2 outline-none hover:ring-2 hover:ring-green-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </label>

        {/* SECRET KEY */}
        <label className="block mt-3">
          <span className="text-sm">Secret Key</span>

          <div className="relative">
            <input
              name="secretKey"
              type={showSecretKey ? "text" : "password"}
              value={form.secretKey}
              onChange={handleChange}
              className="mt-1 block w-full border-2 border-green-500 rounded px-3 py-2 outline-none hover:ring-2 hover:ring-green-500"
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowSecretKey((prev) => !prev)}
            >
              {showSecretKey ? "🙈" : "👁️"}
            </span>
          </div>

          {errors.secretKey && (
            <p className="text-red-500 text-sm">{errors.secretKey}</p>
          )}
        </label>

        {/* CREATE BUTTON */}
        <button
          disabled={loadingCreate}
          className="cursor-pointer mt-6 w-full py-2 bg-green-600 text-white rounded disabled:bg-green-400"
        >
          {loadingCreate ? (
            <div className="flex justify-center items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating...
            </div>
          ) : (
            "Create"
          )}
        </button>

        {/* LOGIN BUTTON */}
        <div className="mt-3 text-sm text-center">
          <button
            type="button"
            onClick={() => {
              setLoadingLogin(true);
              setTimeout(() => navigate("/login"), 500);
            }}
            className="text-green-700 underline cursor-pointer flex items-center justify-center gap-2 mx-auto"
            disabled={loadingLogin}
          >
            {loadingLogin ? (
              <>
                <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                Redirecting...
              </>
            ) : (
              "Already have an account? Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
