import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded shadow">
    <Link to={`/product/${product._id}`}>
      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        alt={product.name}
        className="h-48 w-full object-cover mb-2"
      />
      <h4 className="font-semibold">{product.name}</h4>
      <p className="text-gray-600">₹{product.price}</p>
    </Link>
  </div>
);

export default ProductCard;
