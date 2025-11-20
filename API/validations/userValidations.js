import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .lowercase()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@ $ ! % * ? &)"
    )
    .required("Password is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid Email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .matches(/[a-z]/, "Password must contain atleast one lowercase letter")
    .matches(/[0-9]/, "Password must contain atleast one digit number")
    .matches(
      /[!~`@#$%^^&*()_?]/,
      "Password must contain atleast one specail character"
    )
    .required("Password is required"),
});
