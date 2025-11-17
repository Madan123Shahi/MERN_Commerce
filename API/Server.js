import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/upload.js";
import webhookRoutes from "./routes/webhook.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();
connectDB();

const app = express();

// For Stripe webhook, we need raw body for the webhook route only. We'll use express.json with verify.
import bodyParser from "body-parser";

app.use((req, res, next) => {
  // allow the webhook route to get raw body
  if (req.originalUrl === "/api/webhook") return next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

// Stripe webhook needs the raw body
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookRoutes
);

// Error handler (should be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
