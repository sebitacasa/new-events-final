import React from "react";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCart } from "react-use-cart"; // 1. Importamos el hook
import style from "./Card.module.css";
import image2 from "../images/imagen-set.jpg";

// 2. Agregamos 'price' (o cost) a las props recibidas
export default function Cardi({ id, title, imagen, date, place, price }) {
  
  const { addItem } = useCart(); // 3. Inicializamos el carrito

  // 4. Función para agregar al carrito (Copiada de Detail.js y adaptada)
  const handleAddToCart = () => {
    addItem(
      {
        id: id,
        name: title,
        // Asumimos que el precio viene como string con puntos ej: "1.000" igual que en Detail
        price: typeof price === 'string' ? Number(price.replace(".", "")) : Number(price), 
        image: imagen,
      },
      1
    );
    alert("¡Evento agregado al carrito!"); // Feedback visual simple
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
        {/* Opcional: Mostrar el precio en la tarjeta */}
        <ListGroupItem style={{ background: "#292b2c", color: "white", textAlign: "center" }}>
           Valor: ${price}
        </ListGroupItem>
      </ListGroup>

      {/* Contenedor de Botones */}
      <Card.Body className="p-0 d-flex flex-column"> 
        
        {/* Botón AGREGAR AL CARRITO */}
        <Button
          className={`${style.btn} ${style.btnCart}`} // Clase extra para estilo diferente
          variant="success" // Verde para comprar (o usa warning si prefieres)
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </Button>

        {/* Botón VER DETALLE */}
        <LinkContainer to={`/${id}`}>
          <Button
            className={style.btn}
            variant="outline-warning" // Outline para diferenciarlo del de comprar
          >
            Ver detalle
          </Button>
        </LinkContainer>

      </Card.Body>
    </Card>
  );
}