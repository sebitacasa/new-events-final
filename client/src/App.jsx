import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

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

const stripePromise = loadStripe("pk_test_51RKdqp2fTJ6qDYdqcOOqhecPicoUO3MqH20KwTkQgMjMMNpF7oiFnLMQ6rM5FuOG9D5ZvWnCN6nBbevCuQpwTjJ100hXDFI0SZ");



function App() {
  const user = useSelector((state) => state.userLoged)



  return (
    
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
  );
}

export default App;
