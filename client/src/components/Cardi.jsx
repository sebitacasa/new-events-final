import React from "react";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import style from "./Card.module.css";
import image2 from "../images/imagen-set.jpg";

export default function Cardi({ id, title, imagen, date, place }) {
  return (
    <Card 
      bg="dark"
      text="white"
      // CAMBIO CLAVE: width 100% para llenar la columna de la grilla
      style={{ width: '100%', height: "100%" }} 
      className={style.cards}
    >
      <div className={style.imgContainer}>
        <Card.Img
          variant="top"
          src={imagen}
          className={style.cardImage} // Usamos clase CSS en lugar de inline styles
          onError={(e) => { e.target.onerror = null; e.target.src = image2; }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontWeight: "bold", color: "#f0ad4e", textAlign: "center" }}>
            {title}
        </Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem style={{ background: "#292b2c", color: "#f0ad4e", fontWeight: "bold", textAlign: "center" }}>
          {date}
        </ListGroupItem>
        <ListGroupItem style={{ background: "#292b2c", color: "#f0ad4e", fontWeight: "bold", textAlign: "center" }}>
          {place}
        </ListGroupItem>
      </ListGroup>

      <Card.Body className="p-0"> {/* Padding 0 para que el botón pegue abajo */}
        <LinkContainer to={`/${id}`}>
          <Button
            className={style.btn}
            variant="warning"
          >
            Ver detalle del evento
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}