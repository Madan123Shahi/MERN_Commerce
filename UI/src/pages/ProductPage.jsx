import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice.js";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    load();
  }, [id]);

  const handleAdd = () => {
    dispatch(
      addItem({
        product: product._id,
        name: product.name,
        price: product.price,
        qty,
      })
    );
    navigate("/cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/600"}
        alt={product.name}
        className="w-full h-96 object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2">{product.description}</p>
        <p className="text-xl mt-4">₹{product.price}</p>
        <div className="mt-4">
          <label>Qty:</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border p-1 ml-2 w-20"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
