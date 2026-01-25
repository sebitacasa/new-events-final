import React from "react";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCart } from "react-use-cart"; 
import style from "./Card.module.css";
import image2 from "../images/imagen-set.jpg";

export default function Cardi({ id, title, imagen, date, place, price }) {
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: id,
        name: title,
        price: typeof price === 'string' ? Number(price.replace(".", "")) : Number(price), 
        image: imagen,
      },
      1
    );
    // Un pequeño alert o console.log opcional
    // alert("¡Evento agregado al carrito!"); 
  };

  return (
    <Card 
      bg="dark"
      text="white"
      style={{ width: '100%', height: "100%" }} 
      className={style.cards}
    >
      <div className={style.imgContainer}>
        <Card.Img
          variant="top"
          src={imagen}
          className={style.cardImage}
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
        {/* Mostramos el precio si existe */}
        <ListGroupItem style={{ background: "#292b2c", color: "white", textAlign: "center", fontSize: "0.9rem" }}>
           {price ? `Valor: $${price}` : "Consultar precio"}
        </ListGroupItem>
      </ListGroup>

      <Card.Body className="p-0 d-flex flex-column"> 
        
        {/* Botón 1: AGREGAR AL CARRITO (Amarillo) */}
        <Button
          className={`${style.btn} ${style.btnCart}`}
          variant="warning" 
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </Button>

        {/* Botón 2: VER DETALLE (Amarillo) */}
        <LinkContainer to={`/${id}`}>
          <Button
            className={`${style.btn} ${style.btnDetail}`}
            variant="warning"
          >
            Ver detalle
          </Button>
        </LinkContainer>

      </Card.Body>
    </Card>
  );
}