import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaTicketAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useCart } from "react-use-cart";

export default function ShoppingCart() {
  const [totalItems, setTotalItems] = useState(0);
  const { items } = useCart();

  useEffect(() => {
    setTotalItems(
      items.reduce(function (prev, next) {
        return prev + Number(next.quantity);
      }, 0)
    );
  }, [items]);

  return (
    <div
      style={{
        display: "flex",
        color: "#ffc107",
        marginRight: "10px",
        cursor: "pointer",
      }}
    >
      <h5>{totalItems > 0 ? totalItems : ""}</h5>
      <Link
        style={{
          color: "#ffc107",
          textDecoration: "none",
        }}
        to="/cart"
      >
        <FaTicketAlt size={35} />
      </Link>
    </div>
  );
}
