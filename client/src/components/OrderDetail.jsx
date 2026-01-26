import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import styles from "./OrderCard.module.css"; // Asegúrate de importar el CSS

export default function OrderCard({ email, externalId }) {
  // 🔥 FALTABA EL RETURN AQUÍ
  return (
    <Card className={styles.card}>
      
      {/* Cabecera de la tarjeta */}
      <Card.Header className={styles.header}>
        Detalle de Orden
      </Card.Header>

      <ListGroup variant="flush">
        
        {/* Email */}
        <ListGroup.Item className={styles.listItem}>
          <span className={styles.label}>Usuario / Email:</span>
          <span className={styles.value}>{email}</span>
        </ListGroup.Item>

        {/* ID de la Orden */}
        <ListGroup.Item className={styles.listItem}>
          <span className={styles.label}>ID de Transacción:</span>
          <span className={styles.value}>{externalId}</span>
        </ListGroup.Item>

      </ListGroup>
    </Card>
  );
}