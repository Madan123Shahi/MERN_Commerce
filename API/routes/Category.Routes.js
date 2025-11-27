import express from "express";
import Router from "express";
const router = express.Router();

import * as categoryController from "../controllers/Category.Controller.js";
import { protect, admin } from "../middleware/auth.js";

router.post(
  "/createCategory",
  protect,
  admin,
  categoryController.createCategory
);
router.get(
  "/getAllCategories",
  protect,
  admin,
  categoryController.getAllCategories
);
router.get(
  "/:id/subcategories",
  protect,
  admin,
  categoryController.getSubcategoriesByCategory
);

export default router;
