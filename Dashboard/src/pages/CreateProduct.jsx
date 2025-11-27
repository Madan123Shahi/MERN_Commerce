import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";

import CustomDropdown from "../components/CustomDropdown";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "Generic",
    price: "",
    discountPrice: "",
    stockQuantity: "",
    tags: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    { color: "", size: "", stock: "" },
  ]);
  const [uploading, setUploading] = useState(false);

  // Add Category
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [hideCategoryAddButton, setHideCategoryAddButton] = useState(false);

  // Add Subcategory
  const [showAddSubcategory, setShowAddSubcategory] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [hideSubcategoryAddButton, setHideSubcategoryAddButton] =
    useState(false);

  // Load Categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await api.get("/category/getAllCategories");
    setCategories(res.data);
  };

  // Load subcategories when category changes
  useEffect(() => {
    if (!form.category) return;
    loadSubcategories(form.category);

    setHideCategoryAddButton(false);
    setHideSubcategoryAddButton(false);
  }, [form.category]);

  const loadSubcategories = async (catId) => {
    const res = await api.get(`/category/${catId}/subcategories`);
    setSubcategories(res.data);
  };

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const res = await api.post("/category/createcategory", {
      name: newCategory,
    });
    const newId = res.data._id;

    setNewCategory("");
    setShowAddCategory(false);

    setForm((prev) => ({
      ...prev,
      category: newId,
      subcategory: "",
    }));

    await loadCategories();

    setHideCategoryAddButton(true);
  };

  // Add Subcategory
  const handleAddSubcategory = async () => {
    if (!newSubcategory.trim()) return;

    const res = await api.post("/subcategory/createsubcategory", {
      name: newSubcategory,
      category: form.category,
    });

    const newId = res.data._id;

    setNewSubcategory("");
    setShowAddSubcategory(false);

    setForm((prev) => ({
      ...prev,
      subcategory: newId,
    }));

    await loadSubcategories(form.category);

    setHideSubcategoryAddButton(true);
  };

  // Image Upload
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

  const updateVariant = (i, key, value) => {
    const copy = [...variants];
    copy[i][key] = value;
    setVariants(copy);
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", size: "", stock: "" }]);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const uploadedImages = await uploadImages();

      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        stockQuantity: Number(form.stockQuantity),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        variants: variants.map((v) => ({
          color: v.color,
          size: v.size,
          stock: Number(v.stock),
        })),
        images: uploadedImages,
      };

      await api.post("products/createProduct", payload);
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
        {/* NAME */}
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="input_base"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="input_base"
        />

        {/* CATEGORY */}
        <div>
          <label className="font-medium text-green-700">Category *</label>

          <div className="flex gap-2 mt-1">
            <CustomDropdown
              label="Select Category"
              value={form.category}
              options={categories.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              onChange={(val) => {
                setForm({ ...form, category: val, subCategory: "" });

                // ⭐ Hide category input if user selects from dropdown
                if (val) {
                  setShowAddCategory(false);
                  setHideCategoryAddButton(false);
                }
              }}
            />

            {!hideCategoryAddButton && (
              <button
                type="button"
                onClick={() => {
                  setForm({ ...form, category: "", subCategory: "" });
                  setShowAddCategory(!showAddCategory);
                  setHideCategoryAddButton(false); // show button again
                }}
                className="px-3 py-1 bg-green-600 text-white rounded shadow"
              >
                + Add
              </button>
            )}
          </div>

          {showAddCategory && (
            <div className="flex gap-2 mt-2">
              <input
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="input_base"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 bg-green-600 text-white rounded"
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
            <CustomDropdown
              label="Select Subcategory"
              value={form.subCategory}
              options={subcategories.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              disabled={!form.category}
              onChange={(val) => {
                setForm({ ...form, subCategory: val });

                // ⭐ Hide subcategory input if user selects from dropdown
                if (val) {
                  setShowAddSubcategory(false);
                  setHideSubcategoryAddButton(false);
                }
              }}
            />

            {!hideSubcategoryAddButton && (
              <button
                type="button"
                onClick={() => {
                  if (!form.category) return alert("Select category first");

                  setForm({ ...form, subCategory: "" });
                  setShowAddSubcategory(!showAddSubcategory);
                  setHideSubcategoryAddButton(false);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded shadow"
              >
                + Add
              </button>
            )}
          </div>

          {showAddSubcategory && (
            <div className="flex gap-2 mt-2">
              <input
                placeholder="New Subcategory"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                className="input_base"
              />
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="px-4 bg-green-600 text-white rounded"
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
          className="input_base"
        />

        {/* DISCOUNT PRICE */}
        <input
          type="number"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
          className="input_base"
        />

        {/* STOCK */}
        <input
          type="number"
          placeholder="Stock Quantity *"
          value={form.stockQuantity}
          onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          required
          className="input_base"
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
                className="input_base"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                className="input_base"
              />
              <input
                placeholder="Stock"
                type="number"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
                className="input_base"
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
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow"
        >
          {uploading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
