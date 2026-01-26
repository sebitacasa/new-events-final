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
  useMap // Importamos useMap para acceder a la instancia del mapa
} from "react-leaflet";
import L from "leaflet";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

// --- IMPORTACIONES PARA EL BUSCADOR ---
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css'; // Estilos del buscador
import "leaflet/dist/leaflet.css"; // <--- ESTA LÍNEA ES OBLIGATORIA
// -------------------------------------

import * as Action from "../redux/actions/actions";
import styles from "./CreateEvent.module.css";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import UploadImg from "./UploadImg/UploadImg";
import Loading from "./Loading";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// --- COMPONENTE BUSCADOR ---
const SearchField = ({ setPos, handleChangePoint, setAddress }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar', // 'bar' o 'button'
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'Ingresa una dirección...',
    });

    map.addControl(searchControl);

    // Escuchar cuando el usuario selecciona un resultado
    map.on('geosearch/showlocation', (result) => {
      const { x, y, label } = result.location; // x = lng, y = lat
      const latlng = { lat: y, lng: x };
      
      // Actualizamos todo el estado
      setPos(latlng); 
      handleChangePoint(latlng);
      
      // Intentamos limpiar la dirección para que no sea tan larga (opcional)
      setAddress(label); 
    });

    return () => map.removeControl(searchControl);
  }, [map, setPos, handleChangePoint, setAddress]);

  return null;
};

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
    setEventData((prev) => ({
      ...prev,
      lat: pos.lat,
      long: pos.lng,
    }));
  };

  // Función para actualizar la dirección desde el mapa
  const setAddressFromMap = (addressText) => {
      setEventData((prev) => ({
          ...prev,
          address: addressText, // Rellena el campo de dirección automáticamente
          place: addressText.split(',')[0] // Opcional: Intenta adivinar el nombre del lugar
      }));
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.containerGeneral}>
      <NavTop />
      
      <div className={styles.contentWrapper}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10} xs={12}>
              <div className={styles.formCard}>
                
                <h2 className={styles.formTitle}>Crear Nuevo Evento</h2>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  {/* ... (Campos de Título, Género, Stock, Descripción, Fecha, Hora, Precio, Mes IGUALES QUE ANTES) ... */}
                  {/* Voy directo a la parte de ubicación que cambió */}
                  
                  <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="title">
                            <Form.Label className={styles.label}>Nombre del Evento</Form.Label>
                            <Form.Control required type="text" name="title" value={eventData.title} onChange={handleChange} className={styles.inputDark} />
                        </Form.Group>
                    </Col>
                  </Row>
                  {/* ... Resto de inputs básicos aquí ... */}
                  
                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  <h4 className="text-white text-center mb-3">Ubicación</h4>

                  <Row className="mb-3">
                     <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label className={styles.label}>Provincia</Form.Label>
                            <Form.Select required name="city" value={eventData.city} onChange={handleChange} className={styles.inputDark}>
                                <option value="">Selecciona Provincia</option>
                                {city?.map((c) => (<option key={c} value={c}>{c}</option>))}
                            </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group controlId="location">
                            <Form.Label className={styles.label}>Localidad / Ciudad</Form.Label>
                            <Form.Control required type="text" name="location" value={eventData.location} onChange={handleChange} className={styles.inputDark} />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="address">
                            <Form.Label className={styles.label}>Dirección Exacta</Form.Label>
                            {/* Este input se llenará solo al buscar en el mapa, pero el usuario puede editarlo */}
                            <Form.Control 
                                required 
                                type="text" 
                                name="address" 
                                value={eventData.address} 
                                onChange={handleChange} 
                                className={styles.inputDark} 
                                placeholder="Busca en el mapa o escribe aquí..."
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  {/* --- MAPA CON BUSCADOR --- */}
                  <div className="mt-4">
                     <Form.Label className={styles.label}>Buscar ubicación en el mapa</Form.Label>
                     <p className={styles.mapInstruction}>
                        * Usa la lupa en el mapa para buscar la dirección. Se guardarán las coordenadas automáticamente.
                     </p>
                     
                     <div className={styles.mapContainer}>
                        <MapContainer
                            style={{ height: "100%", width: "100%" }}
                            center={[-34.6037, -58.3816]} 
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            {/* COMPONENTE BUSCADOR */}
                            <SearchField 
                                setPos={setPos} 
                                handleChangePoint={handleChangePoint} 
                                setAddress={setAddressFromMap}
                            />

                            <LocationMarker
                                handleChange={handleChangePoint}
                                setPos={setPos}
                                position={pos}
                            />
                        </MapContainer>
                     </div>
                     
                     {/* Latitud y Longitud ahora están ocultos o solo informativos si quieres */}
                     {pos && (
                         <div className="text-center text-muted mt-2" style={{fontSize: '0.8rem'}}>
                             Coordenadas guardadas: {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
                         </div>
                     )}
                  </div>

                  {/* ... (Imagen y Botón Submit IGUALES QUE ANTES) ... */}
                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.label}>Imagen del Evento</Form.Label>
                    <div className="d-flex flex-column align-items-center p-3" style={{border: '1px dashed #f0ad4e', borderRadius: '5px'}}>
                        <UploadImg setimgUp={setUrlImg} />
                        {urlImg && <img src={urlImg} alt="Preview" style={{maxWidth: '200px', marginTop: '15px'}} />}
                    </div>
                  </Form.Group>

                  <Button variant="warning" type="submit" className={styles.btnSubmit}>CREAR EVENTO</Button>

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

// Marcador que también permite hacer click manual
function LocationMarker({ setPos, handleChange, position }) {
  const map = useMapEvents({
    click(e) {
      setPos(e.latlng);
      handleChange(e.latlng);
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
      <Popup>¡Aquí será el evento!</Popup>
    </Marker>
  );
}

export default withAuthenticationRequired(CreateEvent, {
  onRedirecting: () => <Loading />,
});