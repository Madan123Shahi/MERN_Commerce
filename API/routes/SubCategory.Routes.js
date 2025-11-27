import express from "express";
import { createSubcategory } from "../controllers/SubCategory.Controller.js";
const router = express.Router();

router.post("/createsubcategory", createSubcategory);

export default router;
