import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../models/RefreshToken.js";

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES_DAYS = 30;

// ─────────────────────────────────────────────
// TOKEN HELPERS
// ─────────────────────────────────────────────

const generateAccessToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });
};

const generateRefreshValue = () => crypto.randomBytes(64).toString("hex");

const hashValue = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// ─────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// LOGIN — SET COOKIES
// ─────────────────────────────────────────────

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshValue = generateRefreshValue();
    const hashed = hashValue(refreshValue);

    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );

    await RefreshToken.create({
      user: user._id,
      tokenHash: hashed,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      expiresAt,
    });

    // Access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Refresh token cookie
    res.cookie("refreshToken", refreshValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// REFRESH — ROTATE TOKENS
// ─────────────────────────────────────────────

export const refreshToken = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.refreshToken;
    if (!cookieToken) return res.status(401).json("No Refresh Token");

    const hashed = hashValue(cookieToken);

    const dbToken = await RefreshToken.findOne({ tokenHash: hashed }).populate(
      "user"
    );

    if (!dbToken || dbToken.revoked) {
      return res.status(401).json("Invalid Refresh Token");
    }

    if (dbToken.expiresAt < new Date()) {
      return res.status(401).json("Refresh Token Expired");
    }

    // ROTATION: delete old token
    await dbToken.deleteOne();

    const newValue = generateRefreshValue();
    const newHash = hashValue(newValue);

    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );

    await RefreshToken.create({
      user: dbToken.user._id,
      tokenHash: newHash,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      expiresAt,
    });

    // Set new refresh cookie
    res.cookie("refreshToken", newValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    // New access token
    const newAccessToken = generateAccessToken(dbToken.user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      _id: dbToken.user._id,
      name: dbToken.user.name,
      email: dbToken.user.email,
      role: dbToken.user.role,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// LOGOUT — DELETE REFRESH TOKEN
// ─────────────────────────────────────────────

export const logOut = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.refreshToken;
    if (cookieToken) {
      const hashToken = hashValue(cookieToken);
      await RefreshToken.findOneAndDelete({ tokenHash: hashToken });
    }

    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.clearCookie("accessToken", { path: "/" });

    res.json({ message: "Logged Out" });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// REVOKE ALL SESSIONS (all devices)
// ─────────────────────────────────────────────

export const revokeAll = async (req, res, next) => {
  try {
    const userID = req.user._id;

    await RefreshToken.deleteMany({ user: userID });

    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.clearCookie("accessToken", { path: "/" });

    res.json({ message: "All Sessions Revoked" });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// GET LOGGED-IN USER
// ─────────────────────────────────────────────

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    next(error);
  }
};
