import React, { useState } from "react";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append("image", imageFile);
    // your backend upload route
    const res = await api.post("/uploads", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // expected response { url: 'https://...' } or similar
    return res.data.url || res.data.path || res.data.filePath || res.data;
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const imageUrl = await uploadImage();
      const payload = { ...form, price: Number(form.price), image: imageUrl };
      await api.post("/products", payload);
      navigate("/admin/products");
    } catch (err) {
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Create Product</h2>
      <form onSubmit={submit}>
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mt-3">
          <span className="text-sm">Description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mt-3">
          <span className="text-sm">Price</span>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mt-3">
          <span className="text-sm">Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-1 block"
          />
        </label>

        <button
          disabled={uploading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {uploading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
