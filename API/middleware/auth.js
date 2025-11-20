// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       res.status(401);
//       return next(new Error("Not authorized, token failed"));
//     }
//   }

//   if (!token) {
//     res.status(401);
//     return next(new Error("Not authorized, no token"));
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  res.status(403);
  return next(new Error("Not authorized as admin"));
};

export const protect = async (req, res, next) => {
  try {
    // Read access token from httpOnly cookie
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Not authorized (no token)" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user without password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
