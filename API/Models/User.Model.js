import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const { isEmail, isMobilePhone } = validator;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: [true, "Name is required"],
      // index: true, // improves read and query performance
      validate: {
        validator: function (v) {
          const nameExp = /^[a-zA-z\s-']+$/;
          return nameExp.test(v);
        },
        message: (props) =>
          `${props.v} is not a valid name. Only letters, spaces, hyphens and apostrophe are valid`,
      },
      set: function (value) {
        if (!value) return value; // if null/undefined/empty
        return value
          .toLowerCase()
          .split(/(\s|-|')/) // Keep spaces, hyphens and apostrophes
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
      },
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: "Invalid Email Address",
      },
    },

    password: {
      type: String,
      minlength: [8, "Password must be 8 character long"],
      // required: [true, "Password is required"],
      validate: {
        validator: function (password) {
          if (!/[A-Z]/.test(password)) {
            return false;
          }
          if (!/[a-z]/.test(password)) {
            return false;
          }
          if (!/[\d]/.test(password)) {
            return false;
          }
          if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
          }
          return true;
        },
        message:
          "Password must contain at least one uppercase, one lowercase, one digit and one special character",
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String, // store with country codes
      required: [true, "Phone is required"],
      validate: {
        validator: function (v) {
          if (!v) return true; // optional
          return isMobilePhone(v, "any", { strictMode: true });
        },
        message: "Please provide a valid phone number",
      },
      set: function (value) {
        if (!value) return value;
        return value.replace(/[^\d]+/g, "").replace(/^(\d+)/, "+$1");
      },
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        ipAddress: {
          type: String,
          trim: true,
        },
        userAgent: {
          type: String,
          trim: true,
        },
        location: {
          type: String,
          trim: true,
        },
        deviceType: {
          type: String,
          enum: ["mobile", "tablet", "desktop", "laptop", "unknown"],
          default: "unknown",
        },
      },
    ],

    address_details: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },

    shopping_cart: {
      type: mongoose.Schema.ObjectId,
      ref: "cartProduct",
    },

    orderHistory: {
      type: mongoose.Schema.ObjectId,
      ref: "order",
    },

    otp: {
      verification: {
        code: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
        lastSentAt: { type: Date, default: null },
      },
      passwordReset: {
        code: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
        lastSentAt: { type: Date, default: null },
      },
      login: {
        code: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
        lastSentAt: { type: Date, default: null },
      },
    },

    accountStatus: {
      type: String,
      enum: ["pending", "active", "suspended", "deactivated"],
      default: "pending",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // Security fields
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLockedUntil: {
      type: Date,
      default: null,
    },

    // Preferences
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
      language: { type: String, default: "en" },
      timezone: { type: String, default: "UTC" },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.otp;
        delete ret.failedLoginAttempts;
        delete ret.accountLockedUntil;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.otp;
        delete ret.failedLoginAttempts;
        delete ret.accountLockedUntil;
        return ret;
      },
    },
  }
);

// ---------- Indexes ----------
userSchema.index({ phone: 1 }, { unique: true }, { sparse: true });
userSchema.index({ email: 1 }, { unique: true }, { sparse: true });
userSchema.index({ accountStatus: 1 });
// Auto delete expired OTPs
userSchema.index(
  { "otp.verification.expiresAt": 1 },
  { expireAfterSeconds: 0 }
);
userSchema.index(
  { "otp.passwordReset.expiresAt": 1 },
  { expireAfterSeconds: 0 }
);
userSchema.index({ "otp.login.expiresAt": 1 }, { expireAfterSeconds: 0 });

// ---------- Middleware ----------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.lastPasswordChange = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// ---------- Methods ----------
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateOTP = async function (
  purpose = "verification",
  expiresInMinutes = 10
) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  this.otp[purpose] = {
    code: otp,
    expiresAt,
    attempts: 0,
    lastSentAt: Date.now(),
  };
  return otp;
};

userSchema.methods.verifyOTP = async function (otp, purpose = "verification") {
  const otpData = this.otp[purpose];
  if (!otpData || !otpData.code || otpData.expiresAt < new Date()) {
    return { success: false, message: "OTP expired or not generated" };
  }
  if (otpData.attempts >= 5) {
    return {
      success: false,
      message: "Too many attempts, please request a new OTP",
    };
  }

  this.otp[purpose].attempts += 1;

  if (otpData.code !== otp) {
    await this.save();
    return {
      success: false,
      message: "Invalid OTP",
      attemptsLeft: 5 - this.otp[purpose].attempts,
    };
  }

  // OTP verified
  this.otp[purpose] = {
    code: null,
    expiresAt: null,
    attempts: 0,
    lastSentAt: null,
  };

  if (purpose === "verification") {
    this.isVerified = true;
    this.accountStatus = "active";
  } else if (purpose === "login") {
    this.lastLogin = new Date();
  }

  await this.save();
  return { success: true, message: "OTP verified successfully" };
};

userSchema.methods.isOTPValid = function (purpose = "verification") {
  const otpData = this.otp[purpose];
  return otpData && otpData.code && otpData.expiresAt > new Date();
};

userSchema.methods.clearOTP = function (purpose = "verification") {
  this.otp[purpose] = {
    code: null,
    expiresAt: null,
    attempts: 0,
    lastSentAt: null,
  };
};

userSchema.methods.addLoginHistory = function (
  ipAddress,
  userAgent,
  location = "",
  deviceType = "unknown"
) {
  this.loginHistory.unshift({
    timestamp: new Date(),
    ipAddress,
    userAgent,
    location,
    deviceType,
  });

  if (this.loginHistory.length > 10) {
    this.loginHistory = this.loginHistory.slice(0, 10);
  }
  this.lastLogin = new Date();
};

// ---------- Static ----------
userSchema.statics.findByEmailOrPhone = function (identifier) {
  const query = isEmail(identifier)
    ? { email: identifier.toLowerCase() }
    : { phone: identifier.replace(/[^\d]+/g, "").replace(/^(\d+)/, "+$1") };
  return this.findOne(query);
};

const User = mongoose.model("User", userSchema);
export default User;
