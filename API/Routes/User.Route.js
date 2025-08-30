import express from "express";
import { Registration, verifyOTP } from "../Controllers/User.Controller.js";
const router = express.Router();

router.post("/registration", Registration).post("/verify", verifyOTP);

export default router;
