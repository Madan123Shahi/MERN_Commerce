import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

/* --------------------- CREATE SUBCATEGORY --------------------- */
export const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category)
      return res.status(400).json({ message: "Name and category ID required" });

    const exists = await Subcategory.findOne({ name, category });
    if (exists)
      return res.status(400).json({
        message: "Subcategory already exists under this category",
      });

    const sub = await Subcategory.create({ name, category });

    res.json(sub); // frontend expects direct object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
