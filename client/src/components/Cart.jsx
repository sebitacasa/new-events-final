import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCart } from "react-use-cart";
import CartItem from "./CartItem";
import NavTop from "./NavBars/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import * as Action from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import  Carousely  from "./Carousel";
import Footer from "./Footer/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0);
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const { items, cartTotal } = useCart();

  useEffect(() => {
    setTotalItems(
      items.reduce(function (prev, next) {
        return prev + Number(next.quantity);
      }, 0)
    );
  }, [items]);

  return (
    <div
      className={styles.container}
      style={{
        width: "100%",
        height: "100%",
        backgroundAttachment: " fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        
      }}
    >
      <NavTop />
      <div className={styles.container}>
      <section class="pt-5 pb-5">
        <div 
          style={{
            background: "#f0ad4e",
            boxShadow: " 0 0 9px rgb(225, 174, 7), 0 0 12px rgb(119, 118, 119) "  
           
              
          }}
          class="container"
        >
          <div class="row w-100">
            <div class="col-lg-12 col-md-12 col-12">
              <h3 style={{fontWeight: "bolder"}} class="display-5 mb-2 text-center">Shopping Cart</h3>
              <p class="mb-5 text-center">
                <i class="text-danger font-weight-bold">{totalItems}</i> items
                in your cart
              </p>
              <table
                id="shoppingCart"
                class="table table-condensed table-responsive"
              >
                <thead>
                  <tr style={{ color: "black" }}>
                    <th style={{ width: "55%" }}>Product</th>
                    <th style={{ width: "18%" }}>Price</th>
                    <th style={{ width: "12%" }}>Quantity</th>
                    <th style={{ width: "5%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <CartItem />
                </tbody>
              </table>
              <div class="float-right text-right">
                <h4 style={{fontWeight: "bold"}}>Subtotal:</h4>
                <h1>${cartTotal}.00</h1>
              </div>
            </div>
          </div>
          <div class="row mt-4 d-flex align-items-center">
            <div
              style={{ display: totalItems === 0 ? "none" : "block" }}
              class="order-md-2 text-right"
            >
              {!isAuthenticated ? (
                <Button
                  variant="dark"
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "150px",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    loginWithPopup();
                  }}
                >
                  LogIn
                </Button>
              ) : (
                <Payment
                  orderData={{
                    email: user.email,
                    eventos: items.map((item) => {
                      return { id: item.id, cantidad: item.quantity };
                    }),
                    quantity: totalItems,
                    totalPrice: cartTotal,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      

      <div style={{marginTop: "150x"}}>
        <Carousely />
      </div>
      </div>

      <div style={{marginTop: "50px"}}><Footer/></div>
    </div>
  );
}
