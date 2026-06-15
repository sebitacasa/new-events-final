import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

// 1. Importar el Hook de traducción
import { useTranslation } from 'react-i18next';

import * as Action from "../redux/actions/actions";
import styles from "./CreateEvent.module.css";
import NavTop from "./NavBars/Nav";
import Footer from "./Footer/Footer";
import UploadImg from "./UploadImg/UploadImg";
import Loading from "./Loading";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Componente SearchField (sin cambios visuales grandes)
const SearchField = ({ setPos, handleChangePoint, setAddress }) => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: '...', 
    });
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (result) => {
      const { x, y, label } = result.location;
      const latlng = { lat: y, lng: x };
      setPos(latlng);
      handleChangePoint(latlng);
      setAddress(label);
    });
    return () => map.removeControl(searchControl);
  }, [map, setPos, handleChangePoint, setAddress]);
  return null;
};

export function CreateEvent() {
  // 2. Usar el hook
  const { t } = useTranslation();

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
      [event.target.name]: event.target.value, // Esto usa el "name" en inglés/español original
    });
  };

  const handleChangePoint = (pos) => {
    setEventData((prev) => ({
      ...prev,
      lat: pos.lat,
      long: pos.lng,
    }));
  };

  const setAddressFromMap = (addressText) => {
      setEventData((prev) => ({
          ...prev,
          address: addressText,
          place: addressText.split(',')[0]
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
            alert("Success!"); 
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
                
                {/* 3. TÍTULO TRADUCIDO */}
                <h2 className={styles.formTitle}>{t('createEvent.title')}</h2>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="title">
                            {/* LABEL TRADUCIDO */}
                            <Form.Label className={styles.label}>{t('createEvent.labels.name')}</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title" // 🔥 IMPORTANTE: Esto NO cambia, va a la DB
                                placeholder={t('createEvent.placeholders.name')}
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
                            <Form.Label className={styles.label}>{t('createEvent.labels.genre')}</Form.Label>
                            <Form.Select
                                required
                                name="genero" // 🔥 NO cambia
                                value={eventData.genero}
                                onChange={handleChange}
                                className={styles.inputDark}
                            >
                                <option value="">{t('createEvent.placeholders.selectGenre')}</option>
                                {genres?.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="stock">
                            <Form.Label className={styles.label}>{t('createEvent.labels.stock')}</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="stock" // 🔥 NO cambia
                                min="1"
                                value={eventData.stock}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label className={styles.label}>{t('createEvent.labels.description')}</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        name="description" // 🔥 NO cambia
                        value={eventData.description}
                        onChange={handleChange}
                        className={styles.inputDark}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="date">
                            <Form.Label className={styles.label}>{t('createEvent.labels.date')}</Form.Label>
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
                            <Form.Label className={styles.label}>{t('createEvent.labels.time')}</Form.Label>
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
                            <Form.Label className={styles.label}>{t('createEvent.labels.price')}</Form.Label>
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
                  
                  <Row className="mb-3">
                     <Col md={12}>
                        <Form.Group controlId="month">
                            <Form.Label className={styles.label}>{t('createEvent.labels.month')}</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder={t('createEvent.placeholders.month')}
                                name="month"
                                value={eventData.month}
                                onChange={handleChange}
                                className={styles.inputDark}
                            />
                        </Form.Group>
                     </Col>
                  </Row>

                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  <h4 className="text-white text-center mb-3">Ubicación / Location</h4>

                  <Row className="mb-3">
                     <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label className={styles.label}>{t('createEvent.labels.province')}</Form.Label>
                            <Form.Select
                                required
                                name="city" // 🔥 NO cambia (backend espera 'city' para provincia)
                                value={eventData.city}
                                onChange={handleChange}
                                className={styles.inputDark}
                            >
                                <option value="">{t('createEvent.placeholders.selectProvince')}</option>
                                {city?.map((c) => (<option key={c} value={c}>{c}</option>))}
                            </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group controlId="location">
                            <Form.Label className={styles.label}>{t('createEvent.labels.city')}</Form.Label>
                            <Form.Control required type="text" name="location" value={eventData.location} onChange={handleChange} className={styles.inputDark} />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="address">
                            <Form.Label className={styles.label}>{t('createEvent.labels.address')}</Form.Label>
                            <Form.Control 
                                required 
                                type="text" 
                                name="address" 
                                value={eventData.address} 
                                onChange={handleChange} 
                                className={styles.inputDark} 
                                placeholder={t('createEvent.placeholders.searchMap')}
                            />
                        </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-4">
                     <Form.Label className={styles.label}>{t('createEvent.labels.map')}</Form.Label>
                     <div className={styles.mapContainer}>
                        <MapContainer
                            style={{ height: "100%", width: "100%" }}
                            center={[-34.6037, -58.3816]} 
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <SearchField setPos={setPos} handleChangePoint={handleChangePoint} setAddress={setAddressFromMap}/>
                            <LocationMarker handleChange={handleChangePoint} setPos={setPos} position={pos}/>
                        </MapContainer>
                     </div>
                  </div>

                  <hr style={{borderColor: '#f0ad4e', margin: '30px 0'}} />
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.label}>{t('createEvent.labels.image')}</Form.Label>
                    <div className="d-flex flex-column align-items-center p-3" style={{border: '1px dashed #f0ad4e', borderRadius: '5px'}}>
                        <UploadImg setimgUp={setUrlImg} />
                        {urlImg && <img src={urlImg} alt="Preview" style={{maxWidth: '200px', marginTop: '15px'}} />}
                    </div>
                  </Form.Group>

                  <Button variant="warning" type="submit" className={styles.btnSubmit}>
                    {t('createEvent.buttons.submit')}
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
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

export default withAuthenticationRequired(CreateEvent, {
  onRedirecting: () => <Loading />,
});