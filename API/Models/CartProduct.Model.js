import { mongoose } from "mongoose";

const cartProductSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const cartProductModel = mongoose.model("CartProduct", cartProductSchema);
export default cartProductModel;
