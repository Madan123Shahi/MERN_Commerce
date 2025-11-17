import express from "express";
// import Stripe from "stripe";

const router = express.Router();

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook placeholder (Stripe removed)
router.post("/", (req, res) => {
  // Stripe webhook disabled
  return res.json({ message: "Stripe webhook is disabled in development." });
});

export default router;
