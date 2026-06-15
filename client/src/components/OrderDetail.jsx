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
  const allEvents = useSelector((state) => state.eventosBack || []);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllEvent());
  }, [dispatch]);

  const eventMap = new Map(allEvents.map((e) => [e.id, e]));

  const rows = allOrders.flatMap((order) => {
    if (!order.Tickets || order.Tickets.length === 0) return [];
    const ownerId = order.userId || "Sin usuario";

    return order.Tickets.map((ticket) => {
      const eventData = eventMap.get(ticket.EventId);
      return {
        uniqueKey: ticket.id,
        ticketId: ticket.id,
        eventName: eventData?.title || "Evento no encontrado",
        city: eventData?.city || "-",
        place: eventData?.place || "-",
        date: eventData?.date || "-",
        time: eventData?.time || "-",
        cost: eventData?.cost || 0,
        ownerId: ownerId,
      };
    });
  });

  return (
    <div className={styles.Container}>
      <NavTop />

      <div className={styles.contentWrapper}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <h2 className={styles.title}>Detalle de la Orden</h2>

              <div className={styles.yellowCard}>
                <Table responsive borderless className={styles.tableCustom}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID Ticket</th>
                      <th>Evento</th>
                      <th>Ciudad</th>
                      <th>Lugar</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Costo</th>
                      <th>ID Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={row.uniqueKey || index}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{row.ticketId.toString().slice(0, 8)}...</strong>
                          </td>
                          <td className={styles.eventName}>{row.eventName}</td>
                          <td>{row.city}</td>
                          <td>{row.place}</td>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td className={styles.cost}>${row.cost}</td>
                          <td className={styles.ownerId}>{row.ownerId.toString().slice(0, 8)}...</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
                          <h5>No hay órdenes registradas</h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              <div style={{ marginTop: "50px" }}>
                <Carousely />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
