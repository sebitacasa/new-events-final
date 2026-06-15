import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../redux/actions/actions";
import styles from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinnerCircularFixed } from "spinners-react";
import {
  Container,
  Col,
  Row,
  ToastContainer,
  Toast,
  Alert,
  Card,
} from "react-bootstrap";

// 1. IMPORTAR EL HOOK DE TRADUCCIÓN
import { useTranslation } from "react-i18next";

import Footer from "./Footer/Footer";
import Carousely from "./Carousel";
import Cardi from "./Cardi";
import NavTop from "./NavBars/Nav";

// Imágenes
import img from "../images/pexels-darya-sannikova-3824763.jpg";
import imagen from "../images/pexels-wendy-wei-1918159.jpg";
import altaImage from "../images/3a0a91fa-5eee-4c96-bd33-78ad5ef6c1c4.jpg";

export default function Home() {
  // 2. INICIALIZAR EL HOOK
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventosDb || []);
  const [carga, setCarga] = useState(true);
  const { error } = useAuth0();
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
            {/* 3. TRADUCIR EL TÍTULO DEL ERROR */}
            <strong className="me-auto">{t('common.error')}</strong>
          </Toast.Header>
          <Toast.Body>{error?.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <NavTop />
      
      <div style={{ marginTop: "15px" }}>
        <Carousely />

        {/* --- INICIO SECCIÓN PRINCIPAL (FONDO) --- */}
        <div className={styles.background}>
          <div className={styles.cardsContainer}>
            <div className={styles.Date}></div>

            <Container fluid>
              <Row className="justify-content-center">
                
                {/* --- COLUMNA IZQUIERDA --- */}
                <Col xs={12} lg={3} className="d-flex flex-column align-items-center mb-4" style={{marginTop: "20px"}}>
                  <div className={styles.cardSecondContainer}>
                    <Card style={{ width: "100%", background: "var(--card-dark)", border: "none" }}>
                      <Card.Img variant="top" src={img} />
                      <Card.Img src={imagen} />
                      <Card.Img src={altaImage} />
                    </Card>
                  </div>
                </Col>

                {/* --- COLUMNA DERECHA: LISTA DE EVENTOS --- */}
                <Col xs={12} lg={9}>
                  <h2 className={styles.sectionTitle}>{t('home.upcomingEvents', 'Próximos eventos')}</h2>
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
                              price={e.cost}
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
                          {/* 4. TRADUCIR TÍTULO DE NO EVENTOS */}
                          {t('home.noEventsTitle')}
                        </Alert.Heading>
                        <hr />
                        <p className="mb-0">
                          {/* 5. TRADUCIR CUERPO DE NO EVENTOS */}
                          {t('home.noEventsBody')}
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