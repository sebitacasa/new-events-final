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

  // --- ESTILOS EN LÍNEA (INLINE STYLES) ---
  const containerStyle = {
    backgroundColor: "#f0ad4e", // Fondo Amarillo
    borderRadius: "10px",
    padding: "20px",
    border: "3px solid #d8a602", // Borde un poco más oscuro
    boxShadow: "0 0 15px rgba(0,0,0,0.5)"
  };

  const headerStyle = {
    backgroundColor: "black",
    color: "#f0ad4e", // Letra Amarilla
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    border: "none"
  };

  const cellStyle = {
    backgroundColor: "#f0ad4e", // Fondo Amarillo
    color: "black",             // Letra Negra
    fontWeight: "600",
    textAlign: "center",
    borderBottom: "1px solid rgba(0,0,0,0.2)", // Línea separadora sutil
    verticalAlign: "middle"
  };

  return (
    <div className={styles.Container}>
      <NavTop />
      
      <div className={styles.contentWrapper}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              
              <h2 className={styles.title}>Detalle de la Orden</h2>

              {/* CONTENEDOR AMARILLO (Inline Style) */}
              <div style={containerStyle}>
                
                {/* Tabla sin clases de Bootstrap que molesten */}
                <Table responsive borderless>
                  <thead>
                    <tr>
                      <th style={headerStyle}>#</th>
                      <th style={headerStyle}>ID Ticket</th>
                      <th style={headerStyle}>Evento</th>
                      <th style={headerStyle}>Ciudad</th>
                      <th style={headerStyle}>Lugar</th>
                      <th style={headerStyle}>Fecha</th>
                      <th style={headerStyle}>Hora</th>
                      <th style={headerStyle}>Costo</th>
                      <th style={headerStyle}>ID Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={row.uniqueKey || index}>
                          <td style={cellStyle}>{index + 1}</td>
                          <td style={cellStyle}>
                            <strong>{row.ticketId.toString().slice(0, 8)}...</strong>
                          </td>
                          <td style={{...cellStyle, textTransform: 'uppercase', fontWeight:'800'}}>
                            {row.eventName}
                          </td>
                          <td style={cellStyle}>{row.city}</td>
                          <td style={cellStyle}>{row.place}</td>
                          <td style={cellStyle}>{row.date}</td>
                          <td style={cellStyle}>{row.time}</td>
                          <td style={{...cellStyle, fontSize:'1.1rem', fontWeight:'bold'}}>
                            ${row.cost}
                          </td>
                          <td style={{...cellStyle, fontSize:'0.85rem', wordBreak: 'break-all'}}>
                            {row.ownerId}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" style={{...cellStyle, padding: '30px'}}>
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