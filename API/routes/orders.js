import express from "express";
const router = express.Router();

import * as orderController from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

router.post("/", protect, orderController.createOrder);
router.get("/myorders", protect, orderController.getMyOrders);
router.get("/:id", protect, orderController.getOrderById);
router.put("/:id/pay", protect, orderController.payOrder);
router.put("/:id/deliver", protect, admin, orderController.deliverOrder);
router.get("/", protect, admin, orderController.getOrders);

export default router;
