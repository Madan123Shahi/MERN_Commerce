import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
export const addToCart = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const found = cart.items.find((i) => i.product.toString() === productId);
    if (found) found.qty = Math.min(product.stock, found.qty + (qty || 1));
    else cart.items.push({ product: productId, qty: qty || 1 });

    await cart.save();
    const populated = await cart.populate("items.product");
    res.json(populated);
  } catch (error) {
    next(error);
  }
};
export const updateItem = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      return next(new Error("Cart not found"));
    }
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      res.status(404);
      return next(new Error("Item not found"));
    }
    item.qty = qty;
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
export const removeItem = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      return next(new Error("Cart not found"));
    }
    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
