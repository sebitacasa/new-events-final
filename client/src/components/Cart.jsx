import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import Payment from "./Payment";
import styles from "./Cart.module.css";
import Carousely from "./Carousel";

export default function Cart() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const { items, cartTotal } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  // Calcular total de items cada vez que cambia el carrito
  useEffect(() => {
    const count = items.reduce((prev, next) => prev + Number(next.quantity), 0);
    setTotalItems(count);
  }, [items]);

  return (
    <div className={styles.containerGeneral}>
      <NavTop />

      <div className={styles.contentWrapper}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={12}>
              
              {/* --- TARJETA PRINCIPAL --- */}
              <div className={styles.cartCard}>
                <div className="text-center">
                    <h2 className={styles.cartTitle}>Tu Carrito</h2>
                    <p className={styles.cartSubtitle}>
                        Tienes <span className="text-warning fw-bold">{totalItems}</span> eventos seleccionados
                    </p>
                </div>

                {/* --- TABLA DE PRODUCTOS --- */}
                <div className={styles.tableContainer}>
                  <Table borderless responsive="sm">
                    <thead>
                      <tr>
                        <th className={`${styles.tableHeader} ${styles.textLeft}`} style={{width: '50%'}}>Evento</th>
                        <th className={styles.tableHeader} style={{width: '20%'}}>Precio</th>
                        <th className={styles.tableHeader} style={{width: '20%'}}>Cantidad</th>
                        <th className={styles.tableHeader} style={{width: '10%'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      <CartItem />
                    </tbody>
                  </Table>
                </div>

                {/* --- RESUMEN Y PAGO --- */}
                {items.length > 0 && (
                    <Row className="mt-4">
                        <Col md={{ span: 6, offset: 6 }}>
                            <div className={styles.summaryContainer}>
                                <span className={styles.totalLabel}>Total a Pagar:</span>
                                <span className={styles.totalPrice}>${cartTotal}</span>
                                
                                <div className="mt-3 w-100 d-flex justify-content-end">
                                    {!isAuthenticated ? (
                                        <Button
                                            className={styles.btnLogin}
                                            onClick={() => loginWithPopup()}
                                        >
                                            Inicia Sesión para Pagar
                                        </Button>
                                    ) : (
                                        <div style={{width: '100%'}}>
                                            <Payment
                                                orderData={{
                                                    email: user.email,
                                                    eventos: items.map((item) => ({ 
                                                        id: item.id, 
                                                        cantidad: item.quantity 
                                                    })),
                                                    quantity: totalItems,
                                                    totalPrice: cartTotal,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}

              </div>
            </Col>
          </Row>

          {/* Carrusel opcional abajo */}
          <div className="mt-5">
             <Carousely />
          </div>

        </Container>
      </div>

      <Footer />
    </div>
  );
}