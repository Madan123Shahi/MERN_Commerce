import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    brand: "Generic",
    price: "",
    discountPrice: "",
    stockQuantity: "",
    tags: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([{ color: "", size: "", stock: "" }]);

  const [uploading, setUploading] = useState(false);

  // --- Add Category / Subcategory Popup
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [showAddSubcategory, setShowAddSubcategory] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("");

  // -------------------------------------- Load Categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await api.get("/category/getAllCategories");
    setCategories(res.data);
  };

  // -------------------------------------- Load Subcategories
  useEffect(() => {
    if (!form.category) return;
    loadSubcategories(form.category);
  }, [form.category]);

  const loadSubcategories = async (catId) => {
    const res = await api.get(`/category/${catId}/subcategories`);
    setSubcategories(res.data);
  };

  // -------------------------------------- Add Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const res = await api.post("/category/createcategory", { name: newCategory });

    setNewCategory("");
    setShowAddCategory(false);
    loadCategories();
    setForm({ ...form, category: res.data._id });
  };

  // -------------------------------------- Add Subcategory
  const handleAddSubcategory = async () => {
    if (!newSubcategory.trim()) return;

    const res = await api.post("/subcategory/createsubcategory", {
      name: newSubcategory,
      category: form.category,
    });

    setNewSubcategory("");
    setShowAddSubcategory(false);
    loadSubcategories(form.category);
    setForm({ ...form, subcategory: res.data._id });
  };

  // -------------------------------------- Upload Images
  const uploadImages = async () => {
    const uploaded = [];

    for (let file of images) {
      const fd = new FormData();
      fd.append("images", file);

      const res = await api.post("/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      uploaded.push({ url: res.data.url, public_id: res.data.public_id });
    }
    return uploaded;
  };

  // -------------------------------------- Variant Handlers
  const updateVariant = (i, key, value) => {
    const copy = [...variants];
    copy[i][key] = value;
    setVariants(copy);
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", size: "", stock: "" }]);
  };

  // -------------------------------------- Submit Product
  const submit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const uploadedImages = await uploadImages();

      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice
          ? Number(form.discountPrice)
          : null,
        stockQuantity: Number(form.stockQuantity),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        variants: variants.map((v) => ({
          color: v.color,
          size: v.size,
          stock: Number(v.stock),
        })),
        images: uploadedImages,
      };

      await api.post("/products", payload);
      navigate("/admin/products");
    } catch (err) {
      alert(err?.response?.data?.message || "Product creation failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Add New Product
      </h2>

      <form onSubmit={submit} className="space-y-5">

        {/* PRODUCT NAME */}
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border border-green-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
          className="border border-green-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500"
        />

        {/* CATEGORY */}
        <div>
          <label className="font-medium text-green-700">Category *</label>

          <div className="flex gap-2 mt-1">
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                  subcategory: "",
                })
              }
              className="border border-green-300 p-2 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              + Add
            </button>
          </div>

          {/* Inline Add Category */}
          {showAddCategory && (
            <div className="flex gap-2 mt-2">
              <input
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="border border-green-300 p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* SUBCATEGORY */}
        <div>
          <label className="font-medium text-green-700">Subcategory *</label>

          <div className="flex gap-2 mt-1">
            <select
              value={form.subcategory}
              onChange={(e) =>
                setForm({ ...form, subcategory: e.target.value })
              }
              className="border border-green-300 p-2 rounded w-full"
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sc) => (
                <option key={sc._id} value={sc._id}>
                  {sc.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                form.category
                  ? setShowAddSubcategory(!showAddSubcategory)
                  : alert("Select category first")
              }
              className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              + Add
            </button>
          </div>

          {showAddSubcategory && (
            <div className="flex gap-2 mt-2">
              <input
                placeholder="New Subcategory"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                className="border border-green-300 p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price *"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="border border-green-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500"
        />

        {/* DISCOUNT PRICE */}
        <input
          type="number"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={(e) =>
            setForm({ ...form, discountPrice: e.target.value })
          }
          className="border border-green-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500"
        />

        {/* STOCK */}
        <input
          type="number"
          placeholder="Stock Quantity *"
          value={form.stockQuantity}
          onChange={(e) =>
            setForm({ ...form, stockQuantity: e.target.value })
          }
          required
          className="border border-green-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500"
        />

        {/* VARIANTS */}
        <div>
          <p className="font-medium text-green-700">Variants</p>

          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mt-2">
              <input
                placeholder="Color"
                value={v.color}
                onChange={(e) => updateVariant(i, "color", e.target.value)}
                className="border border-green-300 p-2 rounded"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                className="border border-green-300 p-2 rounded"
              />
              <input
                placeholder="Stock"
                type="number"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
                className="border border-green-300 p-2 rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="mt-2 text-green-700 font-semibold"
          >
            + Add Variant
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="mt-1"
        />

        {/* SUBMIT */}
        <button
          disabled={uploading}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          {uploading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
