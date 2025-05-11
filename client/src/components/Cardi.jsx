import React from "react";
import {
  Card,
  Button,
  CardGroup,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import style from "./Card.module.css";
import image2 from "../images/imagen-set.jpg"

//import { FaCalendar, FaSearchLocation, FaTicketAlt } from "react-icons/fa";

export default function Cardi({ id, title, imagen, description, date, place }) {
  
  return (
    <Container>
      <Row>
    
      <Card 
  bg="dark"
  text="white"
  style={{ width: '18rem', height: "auto" }}
  className={style.cards}
>
  <Card.Img
    style={{ height: "175px" }}
    variant="top"
    src={imagen}
    onError={(e) => { e.target.onerror = null; e.target.src = image2; }}
  />
  <Card.Body style={{ height: "auto" }}>
    <Card.Title style={{ fontWeight: "bold", color: "#f0ad4e" }}>{title}</Card.Title>
  </Card.Body>
  <ListGroup className="list-group-flush" style={{ background: "#1c2833" }}>
    <ListGroupItem style={{ background: "#292b2c", color: "#f0ad4e", fontWeight: "bold" }}>
      {date}
    </ListGroupItem>
    <ListGroupItem style={{ background: "#292b2c", color: "#f0ad4e", fontWeight: "bold" }}>
      {place}
    </ListGroupItem>
  </ListGroup>
  <LinkContainer to={`/${id}`}>
    <Button
      className={style.btn}
      style={{ width: "100%", marginTop: "10px" }}
      variant="warning"
    >
      Ver detalle del evento
    </Button>
  </LinkContainer>
</Card>
  

      </Row>
    </Container>
  );
}


     



// <Button
      //   className={style.btn}
      //   style={{ width: "800px", marginLeft: "20px" }}
      //   variant="warning"
      // >
      //   {/* <FaTicketAlt /> Ver detalle del evento */}
      // </Button>
