import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useCart } from "react-use-cart";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Image
} from "react-bootstrap";
import { FaCalendar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

import { getDetail, getTickets, addReviews } from "../redux/actions/actions.jsx";
import NavTop from "./NavBars/Nav.jsx";
import Footer from "./Footer/Footer.jsx";
import DetailCard from "./DetailReviewsCard.jsx";
import styles from "./Detail.module.css";
import image2 from "../images/imagen-set.jpg";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { addItem } = useCart();
  
  const detalles = useSelector((state) => state.detailEventos);

  // Estados locales
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({ name: "", description: "", rating: "" });

  // Handlers del Modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getDetail(id));
    dispatch(getTickets(id));
  }, [dispatch, id]);

  // Manejo del formulario de comentarios
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(detalles?.id) {
        dispatch(addReviews(input, detalles.id));
        alert("¡Comentario enviado!");
        setInput({ name: "", description: "", rating: "" });
        handleClose();
    }
  };

  // Renderizado condicional de carga
  if (!detalles) {
    return (
        <div className={styles.containerGeneral}>
             <NavTop />
             <div className="text-white text-center mt-5">Cargando evento...</div>
        </div>
    );
  }

  return (
    <div className={styles.containerGeneral}>
      <NavTop />
      
      <Container className={styles.contentWrapper}>
        <Row>
          
          {/* --- COLUMNA IZQUIERDA: IMAGEN E INFORMACIÓN --- */}
          <Col lg={7} md={12} className="mb-4">
            <div className={styles.glassCard}>
              
              {/* Imagen Principal */}
              <Image 
                src={detalles.imagen} 
                className={styles.eventImage} 
                alt={detalles.title}
                onError={(e) => { e.target.onerror = null; e.target.src = image2; }}
              />

              {/* Título y Descripción */}
              <h1 className={styles.title}>{detalles.title}</h1>
              <p className={styles.description}>{detalles.description}</p>

              <hr style={{borderColor: '#f0ad4e'}} />

              {/* Datos del Evento */}
              <div className={styles.infoItem}>
                <FaCalendar className={styles.infoIcon} /> 
                <span>
                    <strong>Fecha:</strong> {detalles.date}
                </span>
              </div>
              
              <div className={styles.infoItem}>
                <GoLocation className={styles.infoIcon} /> 
                <span>
                    <strong>Lugar:</strong> {detalles.place}
                </span>
              </div>

              <div className={styles.infoItem}>
                 <GoLocation className={styles.infoIcon} /> 
                 <span>
                    <strong>Dirección:</strong> {detalles.address || "Dirección no especificada"}
                 </span>
              </div>

            </div>
          </Col>

          {/* --- COLUMNA DERECHA: TICKETS, COMPRA Y REVIEWS --- */}
          <Col lg={5} md={12}>
            
            {/* Tarjeta de Compra */}
            <div className={styles.glassCard}>
                <h3 className="text-center text-white mb-3">Adquirir Tickets</h3>
                
                <div className={styles.ticketSummary}>
                    <div className="d-flex justify-content-between text-white">
                        <span>Precio por entrada:</span>
                        <span className="text-warning fw-bold">${detalles.cost}</span>
                    </div>
                    
                    <div className={styles.priceTag}>
                        ${detalles.cost}
                    </div>
                    
                    <div className={styles.stockTag}>
                        Disponibles: {detalles.stock}
                    </div>
                </div>

                <Button
                    variant="warning"
                    className={styles.btnAction}
                    onClick={() => {
                        addItem({
                            id: detalles.id,
                            name: detalles.title,
                            price: Number(detalles.cost.replace(".", "")),
                            image: detalles.imagen,
                        }, 1);
                        alert("¡Agregado al carrito!");
                    }}
                >
                    AGREGAR AL CARRITO
                </Button>
            </div>

            {/* Tarjeta de Comentarios */}
            <div className={styles.glassCard}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-white m-0">Comentarios</h4>
                    <Button 
                        variant="outline-warning" 
                        size="sm" 
                        onClick={handleShow}
                    >
                        Dejar Reseña
                    </Button>
                </div>

                <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {detalles.Reviews && detalles.Reviews.length > 0 ? (
                        detalles.Reviews.map((e, idx) => (
                            <div key={idx} className="mb-2">
                                <DetailCard
                                    name={e.name}
                                    description={e.description}
                                    rating={e.rating}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted text-center">Sé el primero en comentar.</p>
                    )}
                </div>
            </div>

          </Col>
        </Row>
      </Container>

      {/* --- MODAL PARA COMENTARIOS --- */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header style={{ background: "#f0ad4e", border: 'none' }} closeButton>
          <Modal.Title className="text-dark fw-bold">Tu Opinión Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#212529", color: 'white' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={input.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-grid">
                <Button variant="warning" type="submit" className="fw-bold">
                    ENVIAR COMENTARIO
                </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Detail;