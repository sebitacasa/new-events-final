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
              <Row>
                <Col>
                  {["Dark "].map((variant) => (
                    <Card
                      bg={variant.toLowerCase()}
                      key={variant}
                      text={
                        variant.toLowerCase() === "light" ? "dark" : "white"
                      }
                      style={{
                        width: "auto",
                        height: "auto",
                        marginTop: "25px",
                      }}
                      className="mb-2"
                      border="warning"
                    >
                      <Card.Body bg="waring" variant="warning">
                        <Card.Title bg="waring" variant="warning">
                          <Container>
                            <Row>
                              <Col xs>
                                <h5
                                  style={{
                                    maringTop: "25px",
                                
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Tickets
                                </h5>
                              </Col>
                              <Col xs={{ order: 12 }}>
                                <h5
                                  style={{
                                    maringTop: "25px",
                                    
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Valor
                                </h5>
                              </Col>
                              <Col>
                                <h5
                                  style={{
                                    maringTop: "25px",
                                    
                                    fontSize: "22px",
                                    
                                  }}
                                >
                                  Cantidad
                                </h5>
                              </Col>
                              <hr />
                            </Row>
                          </Container>
                          <br />{" "}
                        </Card.Title>
                        <Card.Text>
                          <Container>
                            <Row>
                              <Col xs>
                                <h5
                                  style={{
                                    maringTop: "25px",
                                 
                                  }}
                                >
                                  {detalles.title}
                                </h5>
                              </Col>
                              <Col xs={{ order: 12 }}>
                                <h5 >
                                  {" "}
                                  $ {detalles.cost}.00
                                </h5>
                              </Col>
                              <Col>
                                <h5 >
                                  {detalles.stock}
                                </h5>
                              </Col>
                              <hr />
                            </Row>
                          </Container>
                        </Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem
                          style={{ height: "380px", marginBottom: "20px" }}
                        >
                          <MapContainer
                            style={{ height: "100%", width: "100wh" }}
                            center={[detalles.lat, detalles.long]}
                            zoom={10}
                            scrollWheelZoom={false}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                              icon={leafletIcon}
                              position={[detalles.lat, detalles.long]}
                            ></Marker>
                          </MapContainer>
                        </ListGroupItem>
                        <ListGroupItem
                          style={{
                            color: "black",
                            fontSize: "18px",
                            fontWeight: "bolder",
                            background: "#292b2c",
                            
                          }}
                        >
                          {detalles.description}
                        </ListGroupItem>

                        <ListGroupItem
                          style={{
                            color: "black",
                            fontSize: "18px",
                          
                            background: "#292b2c",
                           
                          }}
                        >
                         Comentarios:
                        </ListGroupItem>

                        <ListGroupItem
                          bg="waring"
                          variant="warning"
                          style={{
                            marginTop: "15px",
                           
                            background: "#292b2c",
                            height: "auto",
                            gap: "10px"
                          }}
                        >
                          {detalles.Reviews.length > 0 ? (
                            detalles.Reviews.map((e) => {
                              return (
                                <div style={{height: "auto", gap: "10px"}}>
                                <DetailCard
                                  name={e.name}
                                  description={e.description}
                                  rating={e.rating}
                                  
                                />
                                </div>
                              );
                            })
                          ) : (
                            
                            <h5>No hay comentarios aun. Deja el tuyo!!</h5>
                          )}
                        </ListGroupItem>
                      </ListGroup>
                     
                    </Card>
                  ))}

                  <Button
                    style={{
                      width: "520px",
                      marginTop: "20px",
                      marginLeft: "2%",
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

                <Col xs={{ order: 5 }}>
                  {" "}
                  <div className={styles.firstContainer}>
                    {["Dark"].map((variant) => (
                      <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={
                          variant.toLowerCase() === "light" ? "dark" : "white"
                        }
                        className="mb-2"
                        style={{ width: "auto", marginTop: "15px" }}
                        border="warning"
                      >
                        <Card.Img variant="top"  src={detalles.imagen}
                            onError={(e) => { e.target.onerror = null; e.target.src = image2; }} />
                        <Card.Body>
                          <Card.Title
                            style={{
                              fontSize: "22px",
                              fontWeight: "Bolder",
                          
                            }}
                          >
                            {detalles.title}
                          </Card.Title>
                          <hr />
                          <Card.Text
                            style={{
                              fontSize: "17px",
                              fontWeight: "Bolder",
                              
                            }}
                          >
                            {detalles.description}
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem
                            bg="dark"
                            variant="warning"
                            style={{ fontSize: "18px", fontWeight: "Bold", background: "#292b2c", color:"#f0ad4e" }}
                          >
                            {" "}
                            <FaCalendar /> {detalles.date}
                          </ListGroupItem>
                          <ListGroupItem
                            bg="dark"
                            variant="warning"
                            style={{ fontSize: "16px", fontWeight: "Bold", background: "#292b2c", color:"#f0ad4e" }}
                          >
                            <GoLocation /> {detalles.place}
                          </ListGroupItem>
                          <ListGroupItem
                            bg="dark"
                            variant="warning"
                            style={{ fontSize: "16px", fontWeight: "Bold", background: "#292b2c", color:"#f0ad4e"}}
                          >
                            <GoLocation /> {detalles.address}
                          </ListGroupItem>
                        </ListGroup>
                        <Card.Img src={detalles.imagen} />
                        <ListGroupItem
                          bg="dark"
                          variant="warning"
                          style={{ fontSize: "16px", fontWeight: "Bold", background: "#292b2c", color:"#f0ad4e"}}
                        ></ListGroupItem>

                        <Button style={{fontWeight: "bold"}} variant="outline-warning" onClick={handleShow}>
                          Deja tu Comentario!!
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header
                            style={{ background: "#f0ad4e" }}
                            closeButton
                          >
                            <Modal.Title>Deja tu Comentario</Modal.Title>
                          </Modal.Header>
                          <Modal.Body
                            style={{ background: "#1C2833 " }}
                          >
                            <Form variant="warning" onSubmit={handleSubmit}>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label style={{color: "#f0ad4e"}}>Nombre </Form.Label>
                                <Form.Control
                                  type="text"
                                  autoFocus
                                  name="name"
                                  value={input.name}
                                  onChange={handleInputChange}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label style={{color: "#f0ad4e"}} >Descripcion del evento</Form.Label>
                                <Form.Control
                                  name="description"
                                  value={input.description}
                                  as="textarea"
                                  rows={3}
                                  onChange={handleInputChange}
                                />
                              </Form.Group>

                               {/* <Form.Select
                                name="rating"
                                value={input.rating}
                                onChange={handleSelect}
                                aria-label="Default select example"
                              >
                                <option>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </Form.Select>  */}
                              <Button
                                style={{width: "350px", marginLeft: "12%"}}
                                type="submit"
                                variant="outline-warning"
                                onClick={handleClose}
                                
                                
                              >
                                Enviar
                              </Button>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer style={{ background: "#f0ad4e" }}>
                            <Button style={{color: "#f0ad4e"}} variant="dark" onClick={handleClose}>
                              Cerrar
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Card>
                    ))}
                  </div>
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
