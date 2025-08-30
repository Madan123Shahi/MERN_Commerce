import { sendOTP } from "../utils/OTP.js";
import User from "./../Models/User.Model.js";

export const Registration = async (req, res) => {
  try {
    let user;
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
        error: true,
        success: false,
      });
    }
    user = await User.findOne({ phone });
    if (user && user.isVerified) {
      return res.json({
        message: `User already exists with this ${phone} number and Verified`,
        error: true,
        success: false,
      });
    }
    // Create a temporary user with pending state
    user = new User({
      phone,
    });
    const OTP = await user.generateOTP("verification", 10);
    const otpSent = await sendOTP(phone, OTP);
    if (!otpSent) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Unable to send OTP",
      });
    }
    await user.save();
    res.status(201).json({
      success: true,
      message: "OTP sent successfully, please verify",
      phone,
    });
    // if (!otpSent) {
    //   return res
    //     .status(500)
    //     .json({ success: false, error: true, message: `Failed to send OTP` });
    // }
    // await verifyOTP(OTP, "verification");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  let user;
  const { phone, otp } = req.body;
  try {
    if (!phone || !otp) {
      res.json({
        success: false,
        error: true,
        message: "Phone, otp is reqiored",
      });
    }
    user = await User.findOne({ phone });
    if (!user) {
      res.status(404).json({
        success: false,
        error: true,
        message: `User not found, please register first`,
      });
    }
    const result = await user.verifyOTP(otp, "verification");
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: true, message: error.message || error });
  }
};
