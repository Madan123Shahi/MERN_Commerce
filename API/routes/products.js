import express from "express";
const router = express.Router();

import * as productController from "../controllers/productController.js";
import { protect, admin } from "../middleware/auth.js";

router.post("/create", protect, admin, productController.createProduct);

export default router;
