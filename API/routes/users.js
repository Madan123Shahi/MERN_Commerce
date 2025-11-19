import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

// ---------------- Public (only used once) ----------------
router.post("/admin", userController.createAdmin);
// No protect here because you need to run this once from Postman

// ---------------- Protected User Routes ----------------
router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);

// ---------------- Admin Only Routes ----------------
router.get("/", protect, admin, userController.getUsers);
router.delete("/:id", protect, admin, userController.deleteUser);

export default router;
