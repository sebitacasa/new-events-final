import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment";

const stripePromise = loadStripe("pk_test_51RKdqp2fTJ6qDYdqcOOqhecPicoUO3MqH20KwTkQgMjMMNpF7oiFnLMQ6rM5FuOG9D5ZvWnCN6nBbevCuQpwTjJ100hXDFI0SZ");

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}