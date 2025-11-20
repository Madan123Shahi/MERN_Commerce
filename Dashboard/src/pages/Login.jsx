import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data); // backend sets httpOnly cookie
      login(res.data.user); // update context
      navigate("/admin"); // redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full border rounded p-2"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full border rounded p-2"
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>
          <button
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-2 rounded"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
