import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: elements.getElement(CardElement) },
      }
    );

    if (error) {
      console.error(error);
      alert(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // call backend to mark order paid
      await axios.put(`/api/orders/${paymentIntent.metadata.orderId}/pay`, {
        id: paymentIntent.id,
        status: paymentIntent.status,
      });
      alert("Payment successful");
      window.location = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <CardElement />
      <button
        disabled={!stripe}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
