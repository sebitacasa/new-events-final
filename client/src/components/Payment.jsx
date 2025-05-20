import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useCart } from "react-use-cart";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const { items, cartTotal, emptyCart } = useCart();
  const API_URL = import.meta.env.VITE_API_URL

  // ⛔ No renderizar si Auth0 o Stripe no están listos
  if (isLoading || !isAuthenticated || !stripe || !elements) {
    return <p style={{ textAlign: "center" }}>Cargando formulario de pago...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const res = await axios.post(
       `${API_URL}/events/create-payment-intent/`,
      { amount: cartTotal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.email,
        },
      },
      payment_method_options: {
        card: {
          setup_future_usage: 'off_session', // o quítalo si no lo usás
        },
      },
    });
    console.log("resultado de la compra", result)

    if (result.error) {
      MySwal.fire("Error", result.error.message, "error");
    } else if (result.paymentIntent.status === "succeeded") {
      await axios.post(
        `${API_URL}/events/payment`,
        {
          amount: cartTotal,
          clientSecret,
          orderData: {
            email: user.email,
            eventos: items.map((item) => ({
              id: item.id,
              cantidad: item.quantity,
            })),
            quantity: items.reduce((prev, next) => prev + Number(next.quantity), 0),
            totalPrice: cartTotal,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      MySwal.fire("Éxito", "Pago procesado correctamente", "success");
      emptyCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        style={{
          marginTop: "20px",
          background: "#f0ad4e",
          border: "none",
          padding: "10px 20px",
          fontWeight: "bold",
        }}
      >
        Pagar ${cartTotal}
      </button>
    </form>
  );
}