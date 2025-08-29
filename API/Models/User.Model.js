import mongoose from "mongoose";
import { isEmail, isMobilePhone } from "validator";

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
        unique: true,
        sparse: true,
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
      mobile: {
        number: {
          type: Number,
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
      forgot_password_otp: {
        type: String,
        default: null,
      },
      forgot_password_expiry: {
        type: Date,
        default: "null",
      },
      status: {
        type: String,
        enum: ["pending", "active", "suspended", "deactivated"],
        default: "pending",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      // Before saving the form need a middleware to update
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    },
  },
  { timestamp: true }
);

userSchema.index({ "mobile.number": 1 }, { unique: true, sparse: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
