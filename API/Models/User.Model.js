import mongoose from "mongoose";
import { isEmail } from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
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
      trim: true,
      lowercase: true,
      index: true,
      validate: {
        validator: isEmail,
        message: "Invalid Email Address",
      },
    },
  },
});
