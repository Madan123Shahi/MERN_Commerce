import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const query = {};
    if (req.query.keyword) {
      query.name = { $regex: req.query.keyword, $options: "i" };
    }
    if (req.query.category) query.category = req.query.category;
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
      res.status(404);
      next(new Error("Product not found"));
    }
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({ ...req.body });
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }

    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error("Product not found"));
    }
    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};
