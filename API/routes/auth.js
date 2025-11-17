import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

router.post("/register", authController.registerUser);
router.post("/login", authController.authUser);
router.get("/me", protect, authController.getMe);

export default router;
