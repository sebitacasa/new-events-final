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

// 1. IMPORTAR HOOK
import { useTranslation } from "react-i18next";

export default function Cardi({ id, title, imagen, date, place, price }) {
  // 2. INICIALIZAR HOOK
  const { t } = useTranslation();
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: id,
        name: title,
        // Conversión de precio segura
        price: typeof price === 'string' ? Number(price.replace(".", "")) : Number(price), 
        image: imagen,
      },
      1
    );
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
        
        {/* Precio Traducido */}
        <ListGroupItem style={{ background: "#292b2c", color: "white", textAlign: "center", fontSize: "0.9rem" }}>
            {price ? `${t('card.pricePrefix')}: $${price}` : t('card.checkPrice')}
        </ListGroupItem>
      </ListGroup>

      <Card.Body className="p-0 d-flex flex-column"> 
        
        {/* Botón 1: AGREGAR AL CARRITO (Traducido) */}
        <Button
          className={`${style.btn} ${style.btnCart}`}
          variant="warning" 
          onClick={handleAddToCart}
        >
          {t('card.addToCart')}
        </Button>

        {/* Botón 2: VER DETALLE (Traducido) */}
        <LinkContainer to={`/${id}`}>
          <Button
            className={`${style.btn} ${style.btnDetail}`}
            variant="warning"
          >
            {t('card.viewDetail')}
          </Button>
        </LinkContainer>

      </Card.Body>
    </Card>
  );
}