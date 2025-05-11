import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

import history from "./utils/history";
import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "./components/Loading";

import CreateEvent from "./components/CreateEvent";

import UserProfile from "./components/UserProfile";
import UserManagement from "./components/UserManagement";
import Detail from "./components/Detail";

import NavTop from "./components/NavBars/Nav";
import Pay from "./components/Payment";
import Carrito from "./components/Carrito";
import OrderDetail from "./components/OrderDetail";
import ModalForm, { ModalFormulario } from "./components/ModalForm";


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/createEvent/" element={<CreateEvent />} />
        <Route exact path="/userManagement" element={<UserManagement />} />
        <Route exact path="/:id" element={<Detail />} />
        <Route exact path="/payment" element={<Pay />} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path="/orderDetail" element={<OrderDetail />} />
        <Route exact path="/reviews:id" element={<ModalFormulario/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
