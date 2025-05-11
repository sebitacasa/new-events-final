import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer/Footer";
import "./Carrito.css";
import { getTickets } from "../redux/actions/actions";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CartitaDeCarrito from "./CartitaDeCarrito";
import SumaTotalTotal from "./SumaTotalTotal";

const MySwal = withReactContent(Swal);

function Carrito() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticketsDisponibles = useSelector((state) => state.tickets);

  const [render, setRender] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    dispatch(getTickets(id));
  }, [dispatch, id]);

  useEffect(() => {
    const variable = JSON.parse(localStorage.getItem("carrito")) || [];
    setRender(variable);
  }, []);

  const removeItemFromCart = (id) => {
    const temp = render.filter((item) => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(temp));
    setRender(temp);
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Pago exitoso",
      timer: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Pago fallido",
      timer: 4000,
    });
  };

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:3001/events/payment",
        method: "post",
        data: {
          amount: priceForStripe,
          token,
        },
      });

      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.error(error);
    }
  };

  // Calcular el precio total
  const priceForStripe = render.reduce((acc, item) => acc + item.cost * item.stock, 0) * 100;

  return (
    <Container className="div" fluid>
      <Row>
        <Col>
          <div className="container mt-2">
            <div className="row mt-3">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {render.map((i, index) => (
                    <CartitaDeCarrito
                      key={i.id}
                      numerito={index + 1}
                      titulo={i.title}
                      precio={i.cost}
                      stock={i.stock}
                      imagen={i.imagen}
                      id={i.id}
                      removeItemFromCart={() => removeItemFromCart(i.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row">
              <div className="col text-center">
                <h4>TOTAL: ${priceForStripe / 100}</h4>
                <StripeCheckout
                  stripeKey="pk_test_51KvehVGJ6earutDK1a1AVoXZQWqbwpdHDV7NBvEPnSP1w8IxXkDaVltQOMwsixWtUaYHgOJSCrzlarO3ghGsZfIs00cRkKkzoE"
                  label="Pagar ahora"
                  name="Compra en Under Event"
                  billingAddress
                  shippingAddress
                  amount={priceForStripe}
                  description={`Total a pagar: $${priceForStripe / 100}`}
                  token={payNow}
                />
              </div>
            </div>

            <SumaTotalTotal />
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Carrito;