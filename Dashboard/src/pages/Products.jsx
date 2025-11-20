import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products"); // expecting GET /api/products
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-medium mb-4">Products</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="py-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-2">{p.name}</td>
                <td className="py-2">₹{p.price}</td>
                <td className="py-2">
                  <button className="mr-2 px-2 py-1 border rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => remove(p._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
