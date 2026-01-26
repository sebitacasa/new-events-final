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
              
              {/* --- TÍTULO --- */}
              <h2 
                style={{
                  color: "#f0ad4e",
                  textTransform: "uppercase",
                  fontWeight: "800",
                  textAlign: "center",
                  marginBottom: "30px",
                  letterSpacing: "1px",
                  textShadow: "3px 3px 0px black",
                  fontSize: "2.5rem"
                }}
              >
                Detalle de la Orden
              </h2>

              {/* --- CONTENEDOR DE LA TARJETA (AMARILLO) --- */}
              <div 
                style={{
                  backgroundColor: "#f0ad4e",      // Fondo Amarillo
                  borderRadius: "15px",            // Bordes Redondeados
                  padding: "25px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  border: "2px solid #d8a602",
                  overflow: "hidden"
                }}
              >
                
                {/* Tabla sin bordes de Bootstrap */}
                <Table responsive borderless>
                  <thead>
                    <tr>
                      {/* Encabezados Negros con letra Dorada */}
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px", borderTopLeftRadius: "10px"}}>#</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>ID Ticket</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Evento</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Ciudad</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Lugar</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Fecha</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Hora</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px"}}>Costo</th>
                      <th style={{backgroundColor: "black", color: "#f0ad4e", textAlign: "center", padding: "15px", borderTopRightRadius: "10px"}}>ID Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={row.uniqueKey || index}>
                          
                          {/* Celdas Amarillas con letra Negra */}
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)", fontWeight: "600"}}>
                            {index + 1}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                            <strong>{row.ticketId.toString().slice(0, 8)}...</strong>
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)", textTransform: "uppercase", fontWeight: "800"}}>
                            {row.eventName}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                            {row.city}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                            {row.place}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                            {row.date}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                            {row.time}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)", fontSize: "1.2rem", fontWeight: "bold"}}>
                            ${row.cost}
                          </td>
                          
                          <td style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid rgba(0,0,0,0.1)", fontSize: "0.8rem", wordBreak: "break-all"}}>
                            {row.ownerId}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" style={{backgroundColor: "#f0ad4e", color: "black", textAlign: "center", padding: "40px"}}>
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