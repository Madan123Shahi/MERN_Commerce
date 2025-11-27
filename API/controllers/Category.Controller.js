import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

/* --------------------- CREATE CATEGORY --------------------- */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Category name required" });

    const exists = await Category.findOne({ name });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });

    const category = await Category.create({ name });

    res.json(category); // frontend expects direct object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* --------------------- GET ALL CATEGORIES --------------------- */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* --------------------- GET SUBCATEGORIES OF A CATEGORY --------------------- */
export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subs = await Subcategory.find({ category: id }).sort({ name: 1 });

    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
