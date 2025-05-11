import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../redux/actions/actions";
import styles from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import Footer from "./Footer/Footer";
import Carousely from "./Carousel";
import Cardi from "./Cardi";
//import Buttom from "./Button/ScrollButton"
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
  Button,
} from "react-bootstrap";

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventosDb || []);
  console.log(events)
  const [carga, setCarga] = useState(true);
  const { isLoading, error, user, isAuthenticated } = useAuth0();
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
        <div style={{ background: "#1C2833 ", width: "2000px", height: "100vh" }}>
          <SpinnerCircularFixed
            style={{
              marginLeft: "940px",
              fontWeight: "bold",
              marginTop: "250px",
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
        <Carousely  />

        <Container fluid>
          <Row>
            <Col>
              {" "}
              <div className={styles.navegation}>
                <Selector />
              </div>
            </Col>
          </Row>
        </Container>

        <div className={styles.background}>
          <div className={styles.infoContainer}></div>
          <div className={styles.cardsContainer}>
            <div className={styles.Date}></div>

            <Container fluid style={{ width: "100wh" }}>
              <Row>
              <Col style={{ marginTop: "120px", float: "rigth" , width: "auto" }} md="auto">
                  <div
                    className={styles.calendarContainer}
                    style={{ marginLeft: "6%" }}
                  >
                    <CalendarioMejorado />
                  </div>
                  <div
                    style={{ marginTop: "120px" }}
                    className={styles.cardSecondContainer}
                  >
                    <Card style={{ width: "17rem", background: "#292b2c " }}>
                      <Card.Img variant="top" src={img} />
                      <Card.Body>
                        {/* <Card.Title
                          style={{ fontSize: "19px", fontWeight: "Bolder" }}
                        ></Card.Title>

                        <Card.Text
                          style={{ fontSize: "17px", fontWeight: "Bolder" }}
                        ></Card.Text> */}
                      </Card.Body>

                      <Card.Img src={imagen} />
                      <ListGroupItem
                        style={{
                          fontSize: "19px",
                          fontWeight: "Bolder",
                          background: "#292b2c ",
                        }}
                      >
                        <Card.Title
                          style={{
                            fontSize: "19px",
                            fontWeight: "Bolder",
                            background: "#292b2c ",
                          }}
                        ></Card.Title>
                        <hr />
                        <Card.Text
                          style={{
                            fontSize: "17px",
                            fontWeight: "Bolder",
                            background: "#292b2c ",
                          }}
                        >
                          <Card.Img src={altaImage} />
                        </Card.Text>
                      </ListGroupItem>
                    </Card>
                  </div>
                </Col>
                <Col style={{ width: "100wh", marginLeft: "60px" }}>
{" "}
<div className={styles.cards}>
  {Array.isArray(events) && events.length ? (
    events.map((e) => {
      return (
        <div key={e.id}>
          <Cardi
            title={e.title}
            imagen={e.imagen}
            date={e.date}
            id={e.id}
            eventType={e.eventType}
            state={e.state}
            place={e.place}
            key={e.id}
            month={e.month}
          />
        </div>
      );
    })
  ) : (
    <Alert
      style={{
        width: "850px",
        height: "350px",
        marginLeft: "75%",
        background: "#292b2c",
        color: '#f0ad4e'
      }}
      variant="light"
    >
      <Alert.Heading>
        No eventos que coincidan con tu busqueda
      </Alert.Heading>
    
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities
        to keep things nice and tidy.
      </p>
    </Alert>
  )}
</div>
</Col>
               
              </Row>
            </Container>

            {/* <div className={styles.contactUS}>
            <ContactUs />
          </div> */}
          </div>

          {/* <Buttom /> */}
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
