import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userInfo);
  const [clientSecret, setClientSecret] = useState(null);

  const total = cart.items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleCreateOrder = async () => {
    if (!user) return alert("Please login");

    const orderItems = cart.items.map((i) => ({
      product: i.product,
      name: i.name,
      qty: i.qty,
      price: i.price,
    }));

    const { data } = await axios.post("/api/orders", {
      orderItems,
      shippingAddress: {},
      paymentMethod: "stripe",
    });
    setClientSecret(data.clientSecret);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Total: ₹{total}</p>
      {!clientSecret ? (
        <button
          onClick={handleCreateOrder}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay with Card
        </button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
