import React from "react";
import {
  Card,
  Button,
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
        <div className={style.imgFade} />
        <span className={style.priceBadge}>
          {price ? `$${price}` : t('card.checkPrice')}
        </span>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontWeight: "bold", color: "#f0ad4e", textAlign: "center", marginBottom: "10px" }}>
            {title}
        </Card.Title>
        <div className="d-flex justify-content-between text-secondary" style={{ fontSize: "0.85rem" }}>
          <span>📅 {date}</span>
          <span>📍 {place}</span>
        </div>
      </Card.Body>

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