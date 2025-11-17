import express from "express";
const router = express.Router();

import * as cartController from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

router.get("/", protect, cartController.getCart);
router.post("/add", protect, cartController.addToCart);
router.put("/update", protect, cartController.updateItem);
router.delete("/remove/:productId", protect, cartController.removeItem);
router.delete("/clear", protect, cartController.clearCart);

export default router;
