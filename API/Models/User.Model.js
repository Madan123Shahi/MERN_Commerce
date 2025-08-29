import mongoose from "mongoose";
import { isEmail, isMobilePhone } from "validator";
import { bcrypt } from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      index: true, // improves read and query performance
      validate: {
        validator: function (v) {
          const nameExp = /^[a-zA-z\s-']+$/;
          return nameExp.test(v);
        },
        message: (props) =>
          `${props.v} is not a valid name.Only letters, spaces, hyphens and apostrophe are valid`,
      },
      set: function (value) {
        if (!value) return value; // to check if name is null undefined or empty string
        return value
          .toLowerCase()
          .split(/(\s|-|')/) // To keep spaces, hyphens and apostrophe
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
      },
      email: {
        type: String,
        // unique: true,
        // sparse: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        validate: {
          validator: isEmail,
          message: "Invalid Email Address",
        },
      },
    },
    password: {
      type: String,
      minlength: [8, "Password must be 8 character long"],
      required: [true, "Password is required"],
      validate: {
        validator: function (password) {
          if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one upper case letter";
          }
          if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lower case letter";
          }
          if (!/[\d]/.test(password)) {
            return "Password must contain at least one digit";
          }
          if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return "Password must contain at least one specail character";
          }
        },
      },
      avatar: {
        type: String,
        default: "",
      },
      phone: {
        type: String, // String is used instead of number to handle country codes
        // unique: true,
        // sparse: true, // it is required if unique true but field is optional
        validate: {
          validator: function (v) {
            if (!v) return true; // b'cause mobile is optional
            return isMobilePhone(v, "any", { strictMode: true });
          },
          message: "Please Provide a valid phone number",
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
            default: Date.now(),
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
            enum: ["mobile", "tablet", "desktop", "laptop"],
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
        verifcation: {
          code: {
            type: String,
            default: null,
          },
          expiresAt: {
            type: Date,
            default: null,
          },
          attempts: {
            type: Number,
            default: 0,
          },
          lastSentAt: {
            type: Date,
            default: null,
          },
        },
        passwordReset: {
          code: {
            type: String,
            default: null,
          },
          expiresAt: {
            type: Date,
            default: null,
          },
          attempts: {
            type: Number,
            default: 0,
          },
          lastSentAt: {
            type: Date,
            default: null,
          },
        },
        login: {
          code: {
            type: String,
            default: null,
          },
          expiresAt: {
            type: Date,
            default: null,
          },
          attempts: {
            type: Number,
            default: 0,
          },
          lastSentAt: {
            type: Date,
            default: null,
          },
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
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
        push: {
          type: Boolean,
          default: false,
        },
        language: {
          type: String,
          default: "en",
        },
        timezone: {
          type: String,
          default: "UTC",
        },
      },
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

userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ accountStatus: 1 });
// This will automatically deletes expired OTP
userSchema.index(
  { "otp.verification.expiresAt": 1 },
  { expireAfterSeconds: 0 }
);
userSchema.index(
  { "otp.passwordReset.expiresAt": 1 },
  { expireAfterSeconds: 0 }
);
userSchema.index({ "otp.login.expiresAt": 1 }, { expireAfterSeconds: 0 });

// Middleware to hash password before saving
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

//Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
