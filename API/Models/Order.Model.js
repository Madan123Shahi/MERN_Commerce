import { mongoose } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "OrderID is required"],
      unique: true,
    },
    productID: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    product_details: {
      type: String,
      image: Array,
    },
    paymentID: {
      type: String,
      default: null,
    },
    payment_status: {
      type: String,
      default: null,
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
    subTotalAmt: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
