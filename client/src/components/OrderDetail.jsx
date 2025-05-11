import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllEvent } from "../redux/actions/actions";
import { Container, Row, Col, Table } from "react-bootstrap";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import styles from "./OrderDetail.module.css";
import Carousely from "./Carousel";

export default function OrderDetail() {
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.allOrders?.orders || []);
  const userIds = allOrders.map(order => order.userId);
  console.log("userID", userIds);
  const allEvents = useSelector((state) => state.eventosBack || []);
  

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllEvent());
  }, [dispatch]);

  // Filtrar datos útiles
  const tickets = allOrders.flatMap((order) => order.Tickets || []);
  const users = allOrders.map((order) => order[0]).filter(Boolean);


  const uniqueUser = userIds.length ? users[0] : null;
  const eventMap = new Map(allEvents.map((e) => [e.id, e]));

  return (
    <div className={styles.Container}>
      <NavTop />
      <Container>
        <Row>
          <Col className={styles.container}>
            <h3 style={{ margin: "20px 0" }}>Detalle de la Orden</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID Ticket</th>
                  <th>ID Evento</th>
                  <th>Nombre Evento</th>
                  <th>Ciudad</th>
                  <th>Lugar</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Costo</th>
                  <th>ID Usuario</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => {
                  const event = eventMap.get(ticket.EventId);
                  return (
                    <tr key={ticket.id || index}>
                      <td>{index + 1}</td>
                      <td>{ticket.id}</td>
                      <td>{ticket.EventId}</td>
                      <td>{event?.title || "Evento no encontrado"}</td>
                      <td>{event?.city || "N/A"}</td>
                      <td>{event?.place || "N/A"}</td>
                      <td>{event?.date || "N/A"}</td>
                      <td>{event?.time || "N/A"}</td>
                      <td>${event?.cost || 0}</td>
                      <td>{userIds  || "Sin datos"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <div style={{ marginTop: "100px" }}>
              <Carousely />
            </div>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "25px" }}>
        <Footer />
      </div>
    </div>
  );
}
