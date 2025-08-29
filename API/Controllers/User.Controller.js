import User from "./../Models/User.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, password is required",
        error: true,
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "User already exists with this email",
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
