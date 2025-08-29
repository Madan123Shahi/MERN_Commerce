import User from "./../Models/User.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Registration = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
        error: true,
        success: false,
      });
    }
    const user = await User.findOne({ phone });
    if (user) {
      return res.json({
        message: `User already exists with this ${phone} number `,
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
