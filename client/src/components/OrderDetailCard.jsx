import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllEvent } from "../redux/actions/actions";
import { Container, Row, Col, Table } from "react-bootstrap";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import styles from "./OrderDetail.module.css"; // Asegúrate de que el nombre coincida
import Carousely from "./Carousel";

export default function OrderDetail() {
  const dispatch = useDispatch();

  // 1. Traer datos con seguridad (Arrays vacíos si falla)
  const allOrders = useSelector((state) => state.allOrders?.orders || []);
  const allEvents = useSelector((state) => state.eventosBack || []);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllEvent());
  }, [dispatch]);

  // 2. Mapa de Eventos para búsqueda rápida (Optimización)
  const eventMap = new Map(allEvents.map((e) => [e.id, e]));

  // 3. Aplanar datos CORRECTAMENTE
  // Recorremos las órdenes primero para saber DE QUIÉN es el ticket
  const rows = allOrders.flatMap((order) => {
    const ownerId = order.userId || "Desc."; // Guardamos el dueño de esta orden
    
    // Si la orden no tiene tickets, devolvemos array vacío para que no rompa
    if (!order.Tickets || order.Tickets.length === 0) return [];

    return order.Tickets.map((ticket) => {
      const eventData = eventMap.get(ticket.EventId);
      return {
        ticketId: ticket.id,
        eventId: ticket.EventId,
        eventName: eventData?.title || "Evento no disponible",
        city: eventData?.city || "N/A",
        place: eventData?.place || "N/A",
        date: eventData?.date || "N/A",
        time: eventData?.time || "N/A",
        cost: eventData?.cost || 0,
        ownerId: ownerId, // Aquí asignamos el ID correcto a cada fila
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
              
              <div className={styles.orderCard}>
                <h2 className={styles.title}>Historial de Órdenes</h2>
                
                {/* Tabla Responsive */}
                <Table responsive hover className={styles.tableCustom}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID Ticket</th>
                      <th>Evento</th>
                      <th>Fecha / Hora</th>
                      <th>Lugar</th>
                      <th>Ciudad</th>
                      <th>Costo</th>
                      <th>ID Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={row.ticketId || index}>
                          <td>{index + 1}</td>
                          <td>
                            <span className="text-warning fw-bold">
                              {row.ticketId.toString().slice(0, 8)}...
                            </span>
                          </td>
                          <td className="fw-bold text-white">{row.eventName}</td>
                          <td>{row.date} <br/> <small>{row.time}</small></td>
                          <td>{row.place}</td>
                          <td>{row.city}</td>
                          <td className="text-warning fw-bold">${row.cost}</td>
                          <td>
                             <small className="text-muted">{row.ownerId}</small>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No se encontraron órdenes registradas.
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