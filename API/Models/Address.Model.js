import { mongoose } from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    mobile: {
      type: Number,
      default: null,
    },
    status: {
      type: Boolean,
      default: true, // used for soft deletes
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("Address", addressSchema);
export default addressModel;
