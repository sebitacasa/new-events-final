import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useCart } from "react-use-cart";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

export default function PaymentForm() {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const { items, cartTotal, emptyCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL

  // ⛔ No renderizar si Auth0 o Stripe no están listos
  if (isLoading || !isAuthenticated || !stripe || !elements) {
    return <p style={{ textAlign: "center" }}>{t('cart.payment.loading')}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const token = await getAccessTokenSilently();

      const res = await axios.post(
         `${API_URL}/events/create-payment-intent`,
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
        MySwal.fire(t('cart.payment.errorTitle'), result.error.message, "error");
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

        MySwal.fire(t('cart.payment.successTitle'), t('cart.payment.successBody'), "success");
        emptyCart();
      }
    } catch (err) {
      console.error("Payment error:", err);
      MySwal.fire(t('cart.payment.errorTitle'), t('cart.payment.genericError'), "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
  <CardElement
    options={{
      style: {
        base: {
          marginTop: "50px",
          fontSize: "16px",
          color: "#32325d",
          "::placeholder": {
            color: "#a0aec0",
          },
        },
        invalid: {
          color: "#e53e3e",
        },
      },
    }}
  />
  <button
    type="submit"
    disabled={!stripe || processing}
    style={{
      marginTop: "20px",
      backgroundColor: "#f0ad4e",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: processing ? "not-allowed" : "pointer",
      opacity: processing ? 0.7 : 1,
      width: "100%",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background 0.3s",
    }}
    onMouseOver={(e) => { if (!processing) e.target.style.backgroundColor = "#ec971f"; }}
    onMouseOut={(e) => { if (!processing) e.target.style.backgroundColor = "#f0ad4e"; }}
  >
    {processing ? t('cart.payment.processing') : t('cart.payment.payButton', { amount: cartTotal })}
  </button>
</form>

  );
}