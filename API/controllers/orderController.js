import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
// -------------------------------
// STRIPE REMOVED
// import Stripe from "stripe";
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// -------------------------------

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      return next(new Error("No order items"));
    }

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const taxPrice = 0;
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
    });

    const created = await order.save();

    // -------------------------------------------------------
    // STRIPE REMOVED
    // let clientSecret = null;
    // if (paymentMethod === "stripe") {
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: Math.round(created.totalPrice * 100),
    //     currency: "inr",
    //     metadata: { orderId: created._id.toString() },
    //   });
    //   clientSecret = paymentIntent.client_secret;
    // }
    // -------------------------------------------------------

    // clear cart after order created
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      res.status(404);
      return next(new Error("Order not found"));
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const payOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      return next(new Error("Order not found"));
    }

    // No Stripe → Fake payment success
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: "test_payment_id",
      status: "paid",
      update_time: Date.now(),
      email_address: req.user.email,
    };

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deliverOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      return next(new Error("Order not found"));
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "id name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};
