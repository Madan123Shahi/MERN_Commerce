import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);
router.get("/", protect, admin, userController.getUsers);
router.delete("/:id", protect, admin, userController.deleteUser);

export default router;
