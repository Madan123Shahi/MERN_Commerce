// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // boolean

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true); // START loading

//     try {
//       await login(form.email, form.password);
//       navigate("/admin");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false); // END loading
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form
//         onSubmit={submit}
//         className="w-full max-w-md bg-white p-6 rounded shadow"
//       >
//         <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

//         {error && <div className="mb-3 text-red-600">{error}</div>}

//         <label className="block">
//           <span className="text-sm">Email</span>
//           <input
//             type="email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="mt-1 block w-full border rounded px-3 py-2"
//           />
//         </label>

//         <label className="block mt-3">
//           <span className="text-sm">Password</span>
//           <input
//             type="password"
//             required
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="mt-1 block w-full border rounded px-3 py-2"
//           />
//         </label>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-6 w-full py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
//         >
//           {loading ? (
//             <div className="flex justify-center items-center gap-2">
//               {/* Spinner */}
//               <div
//                 className="w-4 h-4 border-2 border-white
//                 border-t-transparent rounded-full animate-spin"
//               ></div>
//               Logging in...
//             </div>
//           ) : (
//             "Login"
//           )}
//         </button>

//         <div className="mt-3 text-sm text-center">
//           <a href="/register" className="text-blue-600">
//             Create admin account
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { loginSchema } from "../validations/userValidations";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     general: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setErrors({ email: "", password: "", general: "" });
//     setLoading(true);

//     try {
//       await login(form.email, form.password);
//       navigate("/admin");
//     } catch (err) {
//       const message = err?.response?.data?.message || "Login failed";

//       // Handle specific errors
//       if (message.toLowerCase().includes("email")) {
//         setErrors((prev) => ({ ...prev, email: "Email is incorrect" }));
//       } else if (message.toLowerCase().includes("password")) {
//         setErrors((prev) => ({ ...prev, password: "Password is incorrect" }));
//       } else {
//         setErrors((prev) => ({ ...prev, general: message }));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form
//         onSubmit={submit}
//         className="w-full max-w-md bg-white p-6 rounded shadow"
//       >
//         <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

//         {/* General error */}
//         {errors.general && (
//           <div className="mb-3 text-red-600">{errors.general}</div>
//         )}

//         <label className="block">
//           <span className="text-sm">Email</span>
//           <input
//             type="email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className={`mt-1 block w-full border-2 border-blue-500 outline-none rounded px-3 py-2
//               hover:ring-2 hover:ring-blue-500 ${
//                 errors.email ? "border-red-500" : ""
//               }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </label>

//         <label className="block mt-3">
//           <span className="text-sm">Password</span>
//           <input
//             type="password"
//             required
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className={`mt-1 block w-full border-2 border-blue-500 outline-none rounded px-3 py-2
//               hover:ring-2 hover:ring-blue-500 ${
//                 errors.password ? "border-red-500" : ""
//               }`}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </label>

//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-6 w-full py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
//         >
//           {loading ? (
//             <div className="flex justify-center items-center gap-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Logging in...
//             </div>
//           ) : (
//             "Login"
//           )}
//         </button>

//         <div className="mt-3 text-sm text-center">
//           <a href="/register" className="text-blue-600">
//             Create admin account
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }

// Live Error Validation
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👈 icons
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validations/userValidations";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 add this

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
      const message = err?.response?.data?.message || "Login failed";

      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Email is incorrect" }));
      } else if (message.toLowerCase().includes("password")) {
        setErrors((prev) => ({ ...prev, password: "Password is incorrect" }));
      } else {
        setErrors((prev) => ({ ...prev, general: message }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

        {errors.general && (
          <div className="mb-3 text-red-600">{errors.general}</div>
        )}

        {/* EMAIL */}
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`mt-1 block w-full border-2 rounded px-3 hover:ring-2 hover:ring-blue-500 py-2 outline-none ${
              errors.email ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </label>

        {/* PASSWORD */}
        <label className="block mt-3">
          <span className="text-sm">Password</span>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle here
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`mt-1 block w-full border-2 rounded px-3 py-2 pr-10 outline-none hover:ring-2 hover:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-blue-500"
              }`}
            />

            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </label>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded disabled:bg-blue-400 cursor-pointer"
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

        <div className="mt-3 text-sm text-center">
          <a href="/register" className="text-blue-600">
            Create admin account
          </a>
        </div>
      </form>
    </div>
  );
}
