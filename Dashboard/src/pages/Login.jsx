// Soft Green Themed Login
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validations/userValidations";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // LIVE VALIDATION
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    try {
      await loginSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    try {
      await loginSchema.validate(form, { abortEarly: false });
    } catch (validationErr) {
      const newErrors = { email: "", password: "", general: "" };
      validationErr.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/admin");
    } catch (err) {
      if (!err.response) {
        setErrors((prev) => ({
          ...prev,
          general: "Server is offline. Please try again later.",
        }));
        return;
      }

      const message = err.response.data?.message || "Login failed.";

      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Incorrect email" }));
      } else if (message.toLowerCase().includes("password")) {
        setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
      } else {
        setErrors((prev) => ({ ...prev, general: message }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">

      {/* CARD */}
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden"
      >
        {/* SOFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-40"></div>

        <div className="relative z-10">

          <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
            Admin Login
          </h2>

          {/* GENERAL ERROR */}
          {errors.general && (
            <p className="text-red-600 text-sm mb-2 text-center">{errors.general}</p>
          )}

          {/* EMAIL */}
          <label className="block mb-3">
            <span className="text-sm text-green-900">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border-2 rounded-lg outline-none transition
                ${errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-green-300 focus:border-green-500 bg-green-50"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </label>

          {/* PASSWORD */}
          <label className="block mb-4">
            <span className="text-sm text-green-900">Password</span>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border-2 rounded-lg pr-10 outline-none transition
                  ${errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-green-300 focus:border-green-500 bg-green-50"
                  }`}
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute right-3 top-3 text-green-700 hover:text-green-900"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </label>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg font-semibold
                       shadow hover:bg-green-500 transition disabled:bg-green-300 cursor-pointer"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>

          {/* REGISTER LINK */}
          <div className="mt-4 text-sm text-center">
            <a href="/register" className="text-green-700 font-medium hover:underline">
              Create admin account
            </a>
          </div>

        </div>
      </form>
    </div>
  );
}
