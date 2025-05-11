import { React, useState, useEffect } from "react";
import { connect } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../redux/actions/actions";
import styles from "./CreateEvent.module.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Loading from "./Loading";


import L from "leaflet";
import {
  Button,
  FormControl,
  Col,
  ListGroupItem,
  Row,
  Container,
  Form,
  InputGroup,
  SplitButton,
  Dropdown,
} from "react-bootstrap";
import Footer from "./Footer/Footer";
import * as Action from "../redux/actions/actions";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import NavTop from "./NavBars/Nav";
import imagen from "../images/pexels-darya-sannikova-3824763.jpg";
import UploadImg from "./UploadImg/UploadImg";
export function CreateEvent() {
  const stateInitialForms = {
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
  };
  const navigate = useNavigate();
  const [pos, setPos] = useState(null);
  const { user, isLoading } = useAuth0();
  const [input, setInput] = useState(stateInitialForms);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const userLoged = useSelector((state) => state.userLoged);
  const genres = useSelector((state) => state.allGeneros);
  const city = useSelector((state) => state.allCities);
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

  // const leafletIcon = L.icon({
  //   iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  //   iconSize: [20, 30],
  // });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(createEvent({...eventData, imagen: urlImg}, userLoged.externalId)).then((res) => {
        navigate(`/${res.payload.newEvent.id}`);

      });
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
    console.log("data", eventData);
  };

  const handleChangePoint = (pos) => {
    setEventData({
      ...eventData,
      lat: pos.lat,
      long: pos.lng,
    });
    console.log("data", eventData);
  };

  const date = new Date();

  return (
    <div className={styles.container1}>
      <NavTop />
      <Container>
        <Row>
          <Col xs>
            <div className={styles.container1}>
              <div style={{ marginTop: "85px" }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <div>
                    <h5
                      style={{
                        color: " #f0ad4e ",
                        borderColor: "black",
                        marginLeft: "130px",
                      
                        
                      }}
                    >
                      INGRESA LOS DATOS DE TU EVENTO
                    </h5>
                  </div>

                  <Form.Group controlId="validationCustom01">
                    <Form.Label
                      style={{
                        color: " #f0ad4e ",
                        marginTop: "18px",
                      }}
                    >
                      Nombre del evento
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={eventData?.title}
                      onChange={handleChange}
                      style={{ background: " #f0ad4e ", borderColor: "black" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationCustom02">
                    <Form.Label
                      style={{
                        color: " #f0ad4e ",
                       
                        marginTop: "18px",
                      }}
                    >
                      Genero Musical
                    </Form.Label>
                    <Form.Select
                      style={{ background: " #f0ad4e ", borderColor: "black",
                      
                      
                      cursor: "pointer", }}
                      required
                      name="genero"
                      defaultValue={eventData?.genero}
                      onChange={handleChange}
                      
                    >
                      <option>Seleccion tu Genero</option>
                      {genres?.map((dl) => (
                        <option key={dl} value={dl}>{dl}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select genre.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationCustom03">
                    <Form.Label
                      style={{
                        color: " #f0ad4e ",
                        
                        marginTop: "18px",
                      }}
                    >
                      Escribe detalle del evento
                    </Form.Label>
                    <FormControl
                      as="textarea"
                      name="description"
                      type="text"
                      value={eventData?.description}
                      onChange={handleChange}
                      required
                      style={{
                        background: " #f0ad4e ",
                        borderColor: "black",
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid detail.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row style={{ alignItems: "center" }}>
                    <Form.Group controlId="validationCustom04">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                        
                          marginTop: "18px",
                        }}
                      >
                        Seleccione ubicacion del evento
                      </Form.Label>
                      <ListGroupItem
                        style={{
                          height: "380px",
                          width: "100%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginBottom: "20px",
                          borderColor: "black",
                          borderWidth: "4px",
                          background: " #f0ad4e ",
                        }}
                      >
                        <MapContainer
                          style={{ height: "100%", width: "100wh" }}
                          center={[-38.169114135560854, -65.75208708742923]}
                          zoom={5}
                          scrollWheelZoom={false}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <LocationMarker
                            handleChange={handleChangePoint}
                            setPos={setPos}
                          />
                        </MapContainer>
                      </ListGroupItem>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom01">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Latitude
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="lat"
                        required
                        value={pos?.lat}
                        placeholder="Latitude"
                        defaultValue={""}
                        onChangeCapture={handleChange}
                        disabled={true}
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Longitude
                      </Form.Label>
                      <Form.Control
                        name="long"
                        required
                        type="number"
                        placeholder="Longitude"
                        value={pos?.lng}
                        onChange={handleChange}
                        disabled={true}
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group controlId="validationCustom04">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Fecha de inicio de evento
                      </Form.Label>
                      <Form.Control
                        as={"input"}
                        name="date"
                        value={eventData?.date}
                        type="date"
                        min={`${date.getFullYear()}-${
                          date.getMonth() + 1 < 10 ? "0" : ""
                        }${date.getMonth() + 1}-${date.getDate()}`}
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group controlId="validationCustom05">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Fecha de inicio de evento
                      </Form.Label>
                      <Form.Control
                        name="time"
                        value={eventData?.time}
                        type="time"
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide time.
                      </Form.Control.Feedback>{" "}
                    </Form.Group>

                    <Form.Group controlId="validationCustom06">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                        
                          marginTop: "18px",
                        }}
                      >
                        Mes de Evento
                      </Form.Label>
                      <Form.Control
                        name="month"
                        value={eventData?.month}
                        type="text"
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select month.
                      </Form.Control.Feedback>{" "}
                    </Form.Group>
                  </Row>

                  <Form.Group controlId="validationCustom07">
                    <Form.Label
                      style={{
                        color: " #f0ad4e ",
                       
                        marginTop: "18px",
                      }}
                    >
                      Provincia
                    </Form.Label>

                    <Form.Select
                      name="city"
                      style={{  borderColor: "black",background: "#f0ad4e",
                     
                   
                      cursor: "pointer" }}
                        
                      
                      required
                      defaultValue={eventData?.city}
                      onChange={handleChange}
                    >
                      <option>Selecciona tu Provincia</option>
                      {city?.map((dl) => (
                        <option value={dl}>{dl}</option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      Please select state.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="validationCustom08">
                    <Form.Label
                      style={{
                        color: " #f0ad4e ",
                      
                        marginTop: "18px",
                      }}
                    >
                      Localidad
                    </Form.Label>
                    <Form.Control
                      name="location"
                      value={eventData?.location}
                      type="text"
                      onChange={handleChange}
                      required
                      style={{
                        background: " #f0ad4e ",
                        borderColor: "black",
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select city.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <>
                    <Form.Group controlId="validationCustom09">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                       
                          marginTop: "18px",
                        }}
                      >
                        Direccion
                      </Form.Label>
                      <Form.Control
                        name="address"
                        value={eventData?.address}
                        type="text"
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid direcction.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom10">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Lugar del evento
                      </Form.Label>
                      <Form.Control
                        name="place"
                        value={eventData?.place}
                        type="text"
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid place.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom11">

                  

                    </Form.Group>

                    <Form.Group controlId="validationCustom12">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Cost
                      </Form.Label>
                      <Form.Control
                        name="cost"
                        value={eventData?.cost}
                        type="number"
                        min="0"
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid cost.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom13">
                      <Form.Label
                        style={{
                          color: " #f0ad4e ",
                         
                          marginTop: "18px",
                        }}
                      >
                        Stock
                      </Form.Label>
                      <Form.Control
                        as={"input"}
                        name="stock"
                        min={0}
                        value={eventData?.stock}
                        type={"number"}
                        onChange={handleChange}
                        required
                        style={{
                          background: " #f0ad4e ",
                          borderColor: "black",
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid stock.
                      </Form.Control.Feedback>
                    </Form.Group>
                          <div style={{marginTop: "15px", fontWeight: "bold"}}>

                    < UploadImg  setimgUp={setUrlImg} />
                                  {urlImg && <img src= {urlImg} width="100" height="150" />}
                          </div>
                  </>

                  <div className="d-grid gap-2">
                    <Button
                      style={{ fontWeight: "bolder", marginTop: "25px" }}
                      variant="outline-warning"
                      size="lg"
                      type="submit"
                    >
                      Crea tu Evento
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs={{ order: 12 }}>
            <div className={styles.divImg}>
              <img
                className={styles.img}
                src={imagen}
                width="420px"
                height="auto"
                alt="imagen"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

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
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default withAuthenticationRequired(CreateEvent, {
  onRedirecting: () => <Loading />,
});