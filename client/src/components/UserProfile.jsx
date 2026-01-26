import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Container,
  Row,
  Col,
  Form,
  Toast,
  Button,
  ToastContainer,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUserByExternalId } from "../redux/actions/actions";

import NavTop from "./NavBars/Nav";
import EventosCreadosPorElUsuario from "./EventosCreadosPorElUsuario";
import styles from "./UserProfile.module.css"; // Importamos los estilos nuevos
import Loading from "./Loading";

export function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userLoged = useSelector((state) => state.userLoged);
  
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      dispatch(updateUser(userData, user.sub));
      dispatch(getUserByExternalId(user.sub));
      setShowToast(true);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.containerGeneral}>
      
      {/* Toast de Notificación */}
      <ToastContainer className="p-3" position="top-end" style={{zIndex: 9999, marginTop: '80px'}}>
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Éxito</strong>
          </Toast.Header>
          <Toast.Body className="text-white">¡Perfil actualizado correctamente!</Toast.Body>
        </Toast>
      </ToastContainer>

      <NavTop />

      <div className={styles.contentWrapper}>
        <Container>
          
          {/* --- TARJETA DE PERFIL --- */}
          <div className={styles.profileCard}>
            <Row className="g-0"> {/* g-0 quita el espaciado entre columnas para que los bordes peguen */}
              
              {/* COLUMNA IZQUIERDA: FOTO */}
              <Col md={4} className={styles.leftColumn}>
                <img
                  src={userLoged?.picture}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <span className={styles.userName}>
                  {userLoged?.name} {userLoged?.lastName}
                </span>
                <span className={styles.userEmail}>
                  {userLoged?.email}
                </span>
              </Col>

              {/* COLUMNA DERECHA: FORMULARIO */}
              <Col md={8} className={styles.rightColumn}>
                <h4 className={styles.formTitle}>Editar Perfil</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label className={styles.label}>Nombre</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        defaultValue={userLoged?.name}
                        onChange={handleChange}
                        className={styles.inputDark}
                      />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label className={styles.label}>Apellido</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        defaultValue={userLoged?.lastName}
                        onChange={handleChange}
                        className={styles.inputDark}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label className={styles.label}>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        defaultValue={userLoged?.city}
                        onChange={handleChange}
                        className={styles.inputDark}
                      />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                      <Form.Label className={styles.label}>Provincia</Form.Label>
                      <Form.Control
                        type="text"
                        name="province"
                        placeholder="Provincia"
                        defaultValue={userLoged?.province}
                        onChange={handleChange}
                        className={styles.inputDark}
                      />
                    </Form.Group>
                  </Row>

                  <Button type="submit" className={styles.btnSave}>
                    Guardar Cambios
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>

          {/* --- SECCIÓN DE EVENTOS CREADOS --- */}
          {/* Aquí podrías agregar un título si el componente no lo tiene */}
        
        </Container>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => <Loading />,
});