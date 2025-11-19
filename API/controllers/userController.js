import User from "../models/User.js";

// --------------------- Create Admin ---------------------
export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid admin secret key" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.json({ message: "Admin created successfully" });
  } catch (error) {
    next(error);
  }
};

// --------------------- Profile Routes ---------------------
export const getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- Admin Routes ---------------------
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }
    await user.remove();
    res.json({ message: "User removed" });
  } catch (error) {
    next(error);
  }
};
