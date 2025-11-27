import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },

    slug: { type: String, unique: true, lowercase: true, index: true },

    description: { type: String, required: true, trim: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    brand: { type: String, default: "Generic" },

    price: { type: Number, required: true },

    discountPrice: { type: Number, default: null },

    inStock: { type: Boolean, default: true },

    stockQuantity: { type: Number, required: true },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    variants: [
      {
        color: String,
        size: String,
        stock: Number,
      },
    ],

    tags: [String],

    rating: { type: Number, default: 0 },

    numReviews: { type: Number, default: 0 },

    reviews: [reviewSchema],

    metaTitle: String,
    metaDescription: String,

    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
