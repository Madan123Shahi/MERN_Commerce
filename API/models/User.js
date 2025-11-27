import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postalCode: { type: String, trim: true },
  country: { type: String, trim: true },
  landmark: { type: String, trim: true },
  addressType: {
    type: String,
    enum: ["Home", "Work"],
    default: "Home",
  },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false, // Prevents password from being returned in api responses
    },
    phone: {
      type: String,
      required: function () {
        return this.role !== "admin"; // required only for normal users
      },
    },
    address: [addressSchema],
    avatar: {
      url: String,
      public_id: String,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: { role: "user", phone: { $ne: null } },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
  // no need to await inside return b'cause bcrypt.compare already returns a promise
};

const User = mongoose.model("User", userSchema);
export default User;
