import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/userValidations.js";

// Register user
router.post("/register", validate(registerSchema), authController.register);

// Login user
router.post("/login", validate(loginSchema), authController.login);

// Get logged-in user
router.get("/me", protect, authController.getMe);

// Refresh access token (rotate refresh token)
router.get("/refresh", authController.refreshToken);

// Logout (delete only this device's refresh token)
router.post("/logout", authController.logOut);

// Revoke all sessions (delete all refresh tokens)
router.post("/revoke-all", protect, authController.revokeAll);

export default router;
