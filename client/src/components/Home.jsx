import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../redux/actions/actions";
import styles from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from "./Footer/Footer";
import Carousely from "./Carousel";
import Cardi from "./Cardi";
import { SpinnerCircularFixed } from "spinners-react";
import { Selector } from "./NavBars/Nav";
import NavTop from "./NavBars/Nav";
import CalendarioMejorado from "./CalendarioMejorado";
import img from "../images/pexels-darya-sannikova-3824763.jpg";
import imagen from "../images/pexels-wendy-wei-1918159.jpg";
import altaImage from "../images/3a0a91fa-5eee-4c96-bd33-78ad5ef6c1c4.jpg";

import {
  Container,
  Col,
  Row,
  ToastContainer,
  Toast,
  Alert,
  Card,
  ListGroupItem,
} from "react-bootstrap";

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventosDb || []);
  console.log(events);
  const [carga, setCarga] = useState(true);
  const { error } = useAuth0(); // Eliminé variables no usadas para limpiar warnings
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (events && events.length > 0) {
      console.log("✅ Eventos cargados:", events);
    } else {
      console.log("⚠️ No hay eventos o la lista está vacía.");
    }
  }, [events]);

  useEffect(() => {
    dispatch(Action.getAllEvent()).then(() => setCarga(false));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setShowToast(true);
    }
  }, [error]);

  if (carga) {
    return (
      <div className={styles.containerSpinner}>
        <div style={{ background: "#1C2833 ", width: "100%", height: "100vh" }}>
          <SpinnerCircularFixed
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerGeneral}>
      <ToastContainer className="p-3 py-5 mt-5" position={"bottom-end"}>
        <Toast
          bg={"danger"}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error?.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <NavTop />
      
      <div style={{ marginTop: "15px" }}>
        <Carousely />

        <Container fluid>
          <Row>
            <Col>
              <div className={styles.navegation}>
                <Selector />
              </div>
            </Col>
          </Row>
        </Container>

        {/* --- INICIO SECCIÓN PRINCIPAL (FONDO) --- */}
        <div className={styles.background}>
          <div className={styles.cardsContainer}>
            <div className={styles.Date}></div>

            <Container fluid>
              {/* Usamos Row para dividir la pantalla en dos columnas grandes */}
              <Row className="justify-content-center">
                
                {/* --- COLUMNA IZQUIERDA: CALENDARIO Y SIDE CARD --- */}
                {/* xs={12} ocupa todo en celular. lg={3} ocupa 25% en PC */}
                <Col xs={12} lg={3} className="d-flex flex-column align-items-center mb-4" style={{marginTop: "20px"}}>
                  
                  {/* Calendario */}
                  <div className={styles.calendarContainer}>
                    <CalendarioMejorado />
                  </div>

                  {/* Tarjeta Lateral Extra */}
                  <div className={styles.cardSecondContainer}>
                    <Card style={{ width: "100%", background: "#292b2c" }}>
                      <Card.Img variant="top" src={img} />
                      <Card.Body>
                        {/* Contenido vacio por ahora */}
                      </Card.Body>
                      <Card.Img src={imagen} />
                      <ListGroupItem style={{ background: "#292b2c", border: "none" }}>
                        <Card.Img src={altaImage} />
                      </ListGroupItem>
                    </Card>
                  </div>
                </Col>

                {/* --- COLUMNA DERECHA: LISTA DE EVENTOS --- */}
                {/* xs={12} ocupa todo en celular. lg={9} ocupa 75% en PC */}
                <Col xs={12} lg={9}>
                  <div className={styles.cards}>
                    {Array.isArray(events) && events.length ? (
                      events.map((e) => {
                        return (
                          <div key={e.id} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Cardi
                              title={e.title}
                              imagen={e.imagen}
                              date={e.date}
                              id={e.id}
                              eventType={e.eventType}
                              state={e.state}
                              place={e.place}
                              month={e.month}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <Alert
                        style={{
                          width: "100%",
                          maxWidth: "850px",
                          margin: "0 auto",
                          background: "#292b2c",
                          color: "#f0ad4e",
                          textAlign: "center"
                        }}
                        variant="light"
                      >
                        <Alert.Heading>
                          No hay eventos que coincidan con tu búsqueda
                        </Alert.Heading>
                        <hr />
                        <p className="mb-0">
                          Prueba cambiando los filtros o buscando en otra fecha.
                        </p>
                      </Alert>
                    )}
                  </div>
                </Col>

              </Row>
            </Container>
          </div>
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}