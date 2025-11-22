import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Enter a valid email (must include @ and a domain)"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long with one uppercase, one lowercase, one digit, and one special character"
    )
    .required("Password is required"),
  secretKey: yup.string().required("Secret key is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Enter a valid email (must include @ and a domain)"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long with one uppercas & lowercase letter, one digit and one special character"
    )
    .required("Password is required"),
});
