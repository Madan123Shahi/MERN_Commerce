import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "shopping-duniya",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1024, crop: "limit" }],
  },
});

const parser = multer({ storage });

// Upload endpoint for admin to add product images
router.post("/", protect, admin, parser.array("images", 5), (req, res) => {
  // multer-storage-cloudinary sets req.files with path info
  const uploaded = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  res.json({ uploaded });
});

export default router;
