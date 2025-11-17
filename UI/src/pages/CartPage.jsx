import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/slices/cartSlice.js";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const total = cart.items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.items.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Shop now</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {cart.items.map((i) => (
              <div
                key={i.product}
                className="bg-white p-4 mb-2 flex items-center justify-between"
              >
                <div>
                  <h4>{i.name}</h4>
                  <p>Qty: {i.qty}</p>
                </div>
                <div>
                  <p>₹{i.price * i.qty}</p>
                  <button
                    onClick={() => dispatch(removeItem(i.product))}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4">
            <h3 className="font-bold">Order Summary</h3>
            <p className="mt-2">Total: ₹{total}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
