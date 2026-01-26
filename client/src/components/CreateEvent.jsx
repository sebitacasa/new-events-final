import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import {
  Button,
  Col,
  Row,
  Container,
  Form,
} from "react-bootstrap";

import * as Action from "../redux/actions/actions";
import styles from "./CreateEvent.module.css";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import UploadImg from "./UploadImg/UploadImg";
import Loading from "./Loading";

// Iconos de Leaflet (para que no se rompan)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userLoged = useSelector((state) => state.userLoged);
  const genres = useSelector((state) => state.allGeneros);
  const city = useSelector((state) => state.allCities);

  const [pos, setPos] = useState(null);
  const [validated, setValidated] = useState(false);
  const [urlImg, setUrlImg] = useState("");

  const [eventData, setEventData] = useState({
    title: "",
    imagen: "",
    city: "",
    place: "",
    description: "",
    genero: "",
    date: "",
    time: "",
    stock: "",
    cost: "",
    month: "",
    address: "",
    location: "",
    lat: "",
    long: "",
    externalId: user.sub,
  });

  useEffect(() => {
    dispatch(Action.getAllGeneros());
    dispatch(Action.getAllCities());
  }, [dispatch]);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePoint = (pos) => {
    setEventData({
      ...eventData,
      lat: pos.lat,
      long: pos.lng,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === true) {
      dispatch(Action.createEvent({...eventData, imagen: urlImg}, userLoged.externalId))
      .then((res) => {
        if(res.payload && res.payload.newEvent) {
            alert("¡Evento creado con éxito!");
            navigate(`/${res.payload.newEvent.id}`);
        }
      });
    }
    setValidated(true);
  };

  // Fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.containerGeneral}>
      <NavTop />
      
      <div className={styles.contentWrapper}>
        <Container>
          <Row className="justify-content-center">
            {/* Usamos una columna centrada de ancho 8 (o 10 en pantallas med) */}
            <Col lg={8} md={10} xs={12}>
              <div className={styles.formCard}>
                
                <h2 className={styles.formTitle}>Crear Nuevo Evento</h2>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  {/* --- 1. INFORMACIÓN BÁSICA --- */}
                  <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="title">
                            <Form.Label className={styles.label}>Nombre del Evento</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title"
                                placeholder="Ej: Rock Fest 2024"
                                value={eventData.title}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="genero">
                            <Form.Label className={styles.label}>Género Musical</Form.Label>
                            <Form.Select
                                required
                                name="genero"
                                value={eventData.genero}
                                onChange={handleChange}
                                className={styles.inputDark}
                            >
                                <option value="">Selecciona un género</option>
                                {genres?.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="stock">
                            <Form.Label className={styles.label}>Capacidad (Stock)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="stock"
                                min="1"
                                value={eventData.stock}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label className={styles.label}>Descripción</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        className={styles.inputDark}
                    />
                  </Form.Group>

                  {/* --- 2. FECHAS Y COSTOS --- */}
                  <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="date">
                            <Form.Label className={styles.label}>Fecha</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="date"
                                min={today}
                                value={eventData.date}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                         <Form.Group controlId="time">
                            <Form.Label className={styles.label}>Hora</Form.Label>
                            <Form.Control
                                required
                                type="time"
                                name="time"
                                value={eventData.time}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="cost">
                            <Form.Label className={styles.label}>Precio ($)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="cost"
                                min="0"
                                value={eventData.cost}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                  </Row>
                  
                  {/* El mes se puede auto-calcular o pedir, lo dejo pedido como estaba */}
                  <Row className="mb-3">
                     <Col md={12}>
                        <Form.Group controlId="month">
                            <Form.Label className={styles.label}>Mes (Texto)</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ej: Enero"
                                name="month"
                                value={eventData.month}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                     </Col>
                  </Row>

                  {/* --- 3. UBICACIÓN --- */}
                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  <h4 className="text-white text-center mb-3">Ubicación</h4>

                  <Row className="mb-3">
                     <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label className={styles.label}>Provincia</Form.Label>
                            <Form.Select
                                required
                                name="city"
                                value={eventData.city}
                                onChange={handleChange}
                                className={styles.inputDark}
                            >
                                <option value="">Selecciona Provincia</option>
                                {city?.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group controlId="location">
                            <Form.Label className={styles.label}>Localidad / Ciudad</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="location"
                                value={eventData.location}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="place">
                            <Form.Label className={styles.label}>Nombre del Lugar (Venue)</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ej: Estadio Obras"
                                name="place"
                                value={eventData.place}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="address">
                            <Form.Label className={styles.label}>Dirección Exacta</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="address"
                                value={eventData.address}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  {/* --- 4. MAPA --- */}
                  <div className="mt-4">
                     <Form.Label className={styles.label}>Geolocalización (Opcional)</Form.Label>
                     <p className={styles.mapInstruction}>
                        * Haz click en el mapa para fijar la ubicación exacta del evento.
                     </p>
                     
                     <div className={styles.mapContainer}>
                        <MapContainer
                            style={{ height: "100%", width: "100%" }}
                            center={[-34.6037, -58.3816]} // Buenos Aires default
                            zoom={4}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker
                                handleChange={handleChangePoint}
                                setPos={setPos}
                            />
                        </MapContainer>
                     </div>

                     <Row className="mb-3">
                         <Col>
                            <Form.Control placeholder="Latitud" value={pos?.lat || ''} disabled className={styles.inputDark} />
                         </Col>
                         <Col>
                            <Form.Control placeholder="Longitud" value={pos?.lng || ''} disabled className={styles.inputDark} />
                         </Col>
                     </Row>
                  </div>

                  {/* --- 5. IMAGEN --- */}
                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.label}>Imagen del Evento</Form.Label>
                    <div className="d-flex flex-column align-items-center p-3" style={{border: '1px dashed #f0ad4e', borderRadius: '5px'}}>
                        <UploadImg setimgUp={setUrlImg} />
                        {urlImg && (
                            <img 
                                src={urlImg} 
                                alt="Preview" 
                                style={{maxWidth: '200px', marginTop: '15px', borderRadius: '5px', border: '2px solid white'}} 
                            />
                        )}
                    </div>
                  </Form.Group>

                  <Button
                    variant="warning"
                    type="submit"
                    className={styles.btnSubmit}
                  >
                    CREAR EVENTO
                  </Button>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

// Componente interno del marcador
function LocationMarker({ setPos, handleChange }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      handleChange(e.latlng);
      setPos(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker
      icon={L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })}
      position={position}
    >
      <Popup>Ubicación seleccionada</Popup>
    </Marker>
  );
}

export default withAuthenticationRequired(CreateEvent, {
  onRedirecting: () => <Loading />,
});