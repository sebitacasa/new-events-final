import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/Loading";
import * as Action from "./redux/actions/actions";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("App crash caught:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: "#1a1a2e", color: "#f0ad4e", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: "40px" }}>
          <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: "#ccc", marginBottom: 24 }}>Please refresh the page or try again later.</p>
          <button onClick={() => window.location.href = "/"} style={{ background: "#f0ad4e", color: "#1a1a2e", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: "bold", cursor: "pointer", fontSize: 16 }}>Go to Home</button>
        </div>
      );
    }
    return this.props.children;
  }
}

import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "./components/CreateEvent";

import UserProfile from "./components/UserProfile";
import UserManagement from "./components/UserManagement";
import Detail from "./components/Detail";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";

import Cart from "./components/Cart";
import NavTop from "./components/NavBars/Nav";
import Pay from "./components/Payment";
import Carrito from "./components/Carrito";
import OrderDetail from "./components/OrderDetail";
import ModalForm, { ModalFormulario } from "./components/ModalForm";
import Reviews from "./components/Reviews";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeWrapper from "./components/StripeWrapper";

import PaymentForm from "./components/Payment";
import './i18n/i18n';

const stripePromise = loadStripe("pk_test_51RKdqp2fTJ6qDYdqcOOqhecPicoUO3MqH20KwTkQgMjMMNpF7oiFnLMQ6rM5FuOG9D5ZvWnCN6nBbevCuQpwTjJ100hXDFI0SZ");



function App() {
  const { isLoading, isAuthenticated, user: auth0User, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLoged);
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setUserReady(true);
      return;
    }

    if (auth0User) {
      dispatch(Action.getUserByExternalId(auth0User.sub))
        .then((data) => {
          if (data?.payload === null) {
            return dispatch(
              Action.createUser(
                {
                  name: auth0User.given_name,
                  lastName: auth0User.family_name,
                  email: auth0User.email,
                  picture: auth0User.picture,
                },
                getAccessTokenSilently
              )
            );
          }
        })
        .finally(() => setUserReady(true));
    }
  }, [isLoading, isAuthenticated, auth0User, dispatch, getAccessTokenSilently]);

  if (isLoading || !userReady) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
    <BrowserRouter >
    <Elements stripe={stripePromise}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/createEvent" element={<CreateEvent />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/userManagement"
          element={
            user?.roll === "Admin" ? (
              <UserManagement />
            ) : (
              <div>
                <h1>No tienes permisos para acceder a esta seccion</h1>
              </div>
            )
          }
        />
        <Route exact path="/:id" element={<Detail />} />
        <Route exact path="/payment" element={<PaymentForm />} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path="/orderDetail" element={<OrderDetail />} />

        <Route exact path="/reviews/:id" element={<ModalFormulario />} />

        <Route exact path="/contactUs" element={<ContactUs />} />
        <Route exact path="/aboutUs" element={<AboutUs />} />
        <Route exact path="/reviews" element={<Reviews />} />
      </Routes>
    </Elements>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
