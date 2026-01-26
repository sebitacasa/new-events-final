import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// 1. IMPORTAR HOOK Y TRANS (Para interpolación avanzada si se necesita, aunque t() suele bastar)
import { useTranslation, Trans } from "react-i18next";

import CartItem from "./CartItem";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import Payment from "./Payment";
import styles from "./Cart.module.css";
import Carousely from "./Carousel";

export default function Cart() {
  // 2. INICIALIZAR HOOK
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const { items, cartTotal } = useCart();
  const [totalItems, setTotalItems] = useState(0);

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
                    {/* TÍTULO TRADUCIDO */}
                    <h2 className={styles.cartTitle}>{t('cart.title')}</h2>
                    
                    {/* SUBTÍTULO CON NÚMERO VARIABLE */}
                    <p className={styles.cartSubtitle}>
                        {/* Trans permite mezclar texto traducido con HTML (span).
                           Busca la clave "cart.subtitle" y reemplaza {{count}} por totalItems.
                        */}
                        <Trans i18nKey="cart.subtitle" count={totalItems}>
                            Tienes <span className="text-warning fw-bold">{{count: totalItems}}</span> eventos seleccionados
                        </Trans>
                    </p>
                </div>

                {/* --- TABLA DE PRODUCTOS --- */}
                <div className={styles.tableContainer}>
                  <Table borderless responsive="sm">
                    <thead>
                      <tr>
                        {/* ENCABEZADOS TRADUCIDOS */}
                        <th className={`${styles.tableHeader} ${styles.textLeft}`} style={{width: '50%'}}>
                            {t('cart.table.event')}
                        </th>
                        <th className={styles.tableHeader} style={{width: '20%'}}>
                            {t('cart.table.price')}
                        </th>
                        <th className={styles.tableHeader} style={{width: '20%'}}>
                            {t('cart.table.quantity')}
                        </th>
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
                                {/* TOTAL A PAGAR */}
                                <span className={styles.totalLabel}>{t('cart.totalPay')}</span>
                                <span className={styles.totalPrice}>${cartTotal}</span>
                                
                                <div className="mt-3 w-100 d-flex justify-content-end">
                                    {!isAuthenticated ? (
                                        <Button
                                            className={styles.btnLogin}
                                            onClick={() => loginWithPopup()}
                                        >
                                            {/* BOTÓN LOGIN */}
                                            {t('cart.loginToPay')}
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

          <div className="mt-5">
             <Carousely />
          </div>

        </Container>
      </div>

      <Footer />
    </div>
  );
}