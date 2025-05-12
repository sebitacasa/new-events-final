import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDetail,
  getTickets,
  addReviews,
  getReviews,
} from "../redux/actions/actions.jsx";
import { useParams } from "react-router";
import styles from "./Detail.module.css";

import { Card, Button } from "react-bootstrap";
import { useCart } from "react-use-cart";

import Footer from "./Footer/Footer.jsx";

import { FaCalendar, FaSearchLocation, FaTicketAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { render } from "react-dom";

import NavTop from "./NavBars/Nav.jsx";
import imagen from "../images/concert2.jpg";
import ModalForm from "./ModalForm.jsx";
import { Link } from "react-router-dom";
import L from "leaflet";
import { RiStarSFill } from "react-icons/ri";
import DetailCard from "./DetailReviewsCard.jsx";
import leafletIcon from "./icon.jsx"
import image2 from "../images/imagen-set.jpg"

// [lat, long] = detalles{lat, long}

const Detail = () => {
  const dispatch = useDispatch();
  const detalles = useSelector((state) => state.detailEventos);
  console.log(detalles, "detalles");

  const initialState = {
    name: "",
    description: "",
    rating: "",
  };

  const [carga, setCarga] = useState(true);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(initialState);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const tickets = useSelector((state) => state.tickets);

  const { addItem } = useCart();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getDetail(id));

    dispatch(getTickets(id)).then((tickets) => {
      console.log(tickets);
    });
  }, []);

  const handleDirectToHomeFromDetail = () => {
    window.location.href = "/";
  };

  const RatingChanged = (newRating) => {
    console.log(newRating);
  };

  // const leafletIcon = L.icon({
  //   iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  //   iconSize: [20, 30],
  // });

  const handleInputChange = (e) => {
    setInput({
      ...input,

      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      rating: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addReviews(input, detalles.id));
    alert("comentario enviado");
    setInput({
      name: "",
      description: "",
      // rating: "",
    });
  }

  function handleOnClick(e) {
    const result = e.target.value;
    JSON.parse(localStorage.getItem("id"));
    localStorage.setItem("id", JSON.stringify(result));
  }

  // ------------------------------------------------------------------------------------//

  return (
    <div>
      <div className={styles.containerGral}>
        {detalles ? (
          <div className={styles.container}>
            <div>
              <NavTop />
            </div>

           <Container>
  <Row className="justify-content-center">
    {/* Card con imagen, lugar, dirección, fecha y formulario de comentarios */}
    <Col md={6} xs={12}>
      <div className={styles.firstContainer}>
        {["Dark"].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            key={variant}
            text={variant.toLowerCase() === "light" ? "dark" : "white"}
            className="mb-2"
            style={{ width: "auto", marginTop: "15px"}}
            border="warning"
          >
            <Card.Img
              variant="top"
              src={detalles.imagen}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = image2;
              }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "22px", fontWeight: "bolder" }}>
                {detalles.title}
              </Card.Title>
              <hr />
              <Card.Text style={{ fontSize: "17px", fontWeight: "bolder" }}>
                {detalles.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  background: "#292b2c",
                  color: "#f0ad4e",
                }}
              >
                <FaCalendar /> {detalles.date}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#292b2c",
                  color: "#f0ad4e",
                }}
              >
                <GoLocation /> {detalles.place}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#292b2c",
                  color: "#f0ad4e",
                }}
              >
                <GoLocation /> {detalles.address}
              </ListGroupItem>
            </ListGroup>

            <Button
              style={{ fontWeight: "bold" }}
              variant="outline-warning"
              onClick={handleShow}
            >
              Deja tu Comentario!!
            </Button>

            {/* Modal para comentarios */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header style={{ background: "#f0ad4e" }} closeButton>
                <Modal.Title>Deja tu Comentario</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: "#1C2833" }}>
                <Form variant="warning" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#f0ad4e" }}>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#f0ad4e" }}>
                      Descripcion del evento
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      rows={3}
                      value={input.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    style={{ width: "350px", marginLeft: "12%" }}
                    type="submit"
                    variant="outline-warning"
                    onClick={handleClose}
                  >
                    Enviar
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ background: "#f0ad4e" }}>
                <Button variant="dark" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        ))}
      </div>
    </Col>

    {/* Card de Tickets + botón Comprar */}
    <Col md={6} xs={12}>
      <Card
        bg="dark"
        text="white"
        style={{ width: "auto", marginTop: "25px" }}
        className="mb-2"
        border="warning"
      >
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col>
                  <h5 style={{ fontSize: "22px", fontWeight: "bold" }}>
                    Tickets
                  </h5>
                </Col>
                <Col>
                  <h5 style={{ fontSize: "22px", fontWeight: "bold" }}>
                    Valor
                  </h5>
                </Col>
                <Col>
                  <h5 style={{ fontSize: "22px" }}>Cantidad</h5>
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <h5>{detalles.title}</h5>
                </Col>
                <Col>
                  <h5>${detalles.cost}.00</h5>
                </Col>
                <Col>
                  <h5>{detalles.stock}</h5>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem
            style={{
              background: "#292b2c",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            {detalles.description}
          </ListGroupItem>

          <ListGroupItem
            style={{ background: "#292b2c", color: "white" }}
          >
            Comentarios:
          </ListGroupItem>

          <ListGroupItem
            style={{
              background: "#292b2c",
              height: "auto",
              gap: "10px",
            }}
          >
            {detalles.Reviews.length > 0 ? (
              detalles.Reviews.map((e, idx) => (
                <DetailCard
                  key={idx}
                  name={e.name}
                  description={e.description}
                  rating={e.rating}
                />
              ))
            ) : (
              <h5>No hay comentarios aun. Deja el tuyo!!</h5>
            )}
          </ListGroupItem>
        </ListGroup>
      </Card>

      <Button
        style={{
          width: "100%",
          marginTop: "20px",
          fontWeight: "bold",
        }}
        className={styles.btn}
        variant="warning"
        size="lg"
        value={detalles}
        onClick={() => {
          addItem(
            {
              id: detalles.id,
              name: detalles.title,
              price: Number(detalles.cost.replace(".", "")),
              image: detalles.imagen,
            },
            1
          );
        }}
      >
        Comprar
      </Button>
    </Col>
  </Row>
</Container>

            <div className={styles.footer}>
              <Footer />
            </div>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};

export default Detail;
