import Product from "../models/Product.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      price,
      stockQuantity,
      brand,
      discountPrice,
      inStock,
      images,
      variants,
      tags,
      metaTitle,
      metaDescription,
      weight,
      dimensions,
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !price ||
      !stockQuantity
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, category, subCategory, price & stockQuantity are required",
      });
    }

    // 2️⃣ Auto-generate slug
    const slug = slugify(name, { lower: true });

    // 3️⃣ Prevent duplicate product names (optional but recommended)
    const existing = await Product.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    // 4️⃣ Create new product object
    const productData = {
      name,
      slug,
      description,
      category,
      subCategory,
      price,
      stockQuantity,
      brand: brand || "Generic",
      discountPrice: discountPrice || null,
      inStock: inStock !== undefined ? inStock : true,
      images: images || [],
      variants: variants || [],
      tags: tags || [],
      metaTitle: metaTitle || name,
      metaDescription: metaDescription || description.slice(0, 150),
      weight: weight || null,
      dimensions: dimensions || null,
      createdBy: req.user?._id, // from auth middleware
    };

    // 5️⃣ Save to DB
    const product = await Product.create(productData);

    // 6️⃣ Return response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    // 7️⃣ Handle Mongoose duplicate key error (slug or image id)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field detected",
        field: Object.keys(error.keyValue)[0],
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
