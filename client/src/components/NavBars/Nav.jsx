import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LinkContainer } from "react-router-bootstrap";
import * as Action from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Dropdown,
  Image,
  NavDropdown,
} from "react-bootstrap";

import {
  getAllEvent,
  byFilterDate,
  getAllCities,
  getAllGeneros,
} from "../../redux/actions/actions";
import Searchbar from "../Searchbar";
import styles from "./Nav.module.css";
import ShoppingCart from "../shopCart";

export default function NavTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- 1. Lógica de Auth0 y Usuario ---
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const userLoged = useSelector((state) => state.userLoged);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(Action.getUserByExternalId(user.sub)).then((data) => {
        if (data.payload === null) {
          dispatch(
            Action.createUser(
              {
                name: user.given_name,
                lastName: user.family_name,
                email: user.email,
                picture: user.picture,
              },
              getAccessTokenSilently
            )
          );
        }
      });
    }
  }, [isAuthenticated, dispatch, user, getAccessTokenSilently]);

  // --- 2. Lógica de Filtros ---
  const cities = useSelector((state) => state.allCities);
  const generos = useSelector((state) => state.allGeneros);

  const [filterCity, setFilterCity] = useState("");
  const [filterGenero, setFilterGenero] = useState("");

  // ESTE ES EL EFECTO QUE LIMPIA LA CACHÉ DEL CALENDARIO VIEJO
  useEffect(() => {
    // 1. Cargar las listas necesarias del backend
    dispatch(byFilterDate());
    dispatch(getAllCities());
    dispatch(getAllGeneros());
    
    // 2. Recuperar qué filtro estaba usando el usuario en su última visita
    const filtroGuardado = localStorage.getItem("filtro");
    const nombre = localStorage.getItem("nombre");
    const genero = localStorage.getItem("genero");
    const mes = localStorage.getItem("mes");
    
    // 3. Lógica de "Limpieza de Fantasmas"
    // Si el filtro guardado NO es uno de los válidos actuales (ciudad, genero, mes),
    // asumimos que es basura del calendario viejo y reseteamos todo.
    if (filtroGuardado !== "ciudad" && filtroGuardado !== "genero" && filtroGuardado !== "mes") {
        console.log("🧹 Limpiando filtros viejos/inválidos...");
        localStorage.setItem("filtro", "sin filtro");
        dispatch(getAllEvent()); // Trae todos los eventos por defecto
    } 
    // 4. Si es un filtro válido, lo aplicamos
    else if (filtroGuardado === "ciudad" && nombre) {
        setFilterCity(nombre);
        dispatch(Action.getState(nombre));
    } else if (filtroGuardado === "genero" && genero) {
        setFilterGenero(genero);
        dispatch(Action.byEventType(genero));
    } else if (filtroGuardado === "mes" && mes) {
        dispatch(Action.byFilterDate(mes));
    }

  }, [dispatch]);

  // --- Handlers de Filtros ---
  const handleReset = () => {
    dispatch(getAllEvent());
    localStorage.setItem("filtro", "sin filtro");
    setFilterCity("");
    setFilterGenero("");
    navigate("/");
  };

  const handleStates = (e) => {
    const city = e.target.value;
    setFilterCity(city);
    localStorage.setItem("nombre", city);
    localStorage.setItem("filtro", "ciudad");
    dispatch(Action.getState(city));
    navigate("/");
  };

  const handleEventType = (e) => {
    const genero = e.target.value;
    setFilterGenero(genero);
    localStorage.setItem("genero", genero);
    localStorage.setItem("filtro", "genero");
    dispatch(Action.byEventType(genero));
    navigate("/");
  };

  const handleDate = (e) => {
    const mes = e.target.value;
    localStorage.setItem("mes", mes);
    localStorage.setItem("filtro", "mes");
    dispatch(Action.byFilterDate(mes));
    navigate("/");
  };

  const handleMenuClick = (target) => {
    if (target) navigate(`/${target}`);
  };

  return (
    <header className={styles.nav}>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
        <Container fluid>
          
          {/* LOGO */}
          <Navbar.Brand onClick={handleReset} className={styles.brand}>
            UnderEventsApp
          </Navbar.Brand>

          {/* TOGGLER (Hamburguesa para Móvil) */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* CONTENIDO COLAPSIBLE */}
          <Navbar.Collapse id="responsive-navbar-nav">
            
            {/* GRUPO 1: FILTROS (Al medio en PC, Apilados en Móvil) */}
            <Nav className="me-auto d-flex align-items-center w-100 justify-content-center">
              <div className={styles.filtersContainer}>
                
                {/* Botón Reset */}
                <Nav.Link onClick={handleReset} className="text-warning fw-bold">
                  Ver Todo
                </Nav.Link>

                {/* Select Ciudad */}
                <Form.Select className={styles.navSelect} value={filterCity} onChange={handleStates}>
                  <option value="All">Ciudades</option>
                  {cities?.map((c) => <option key={c} value={c}>{c}</option>)}
                </Form.Select>

                {/* Select Genero */}
                <Form.Select className={styles.navSelect} value={filterGenero} onChange={handleEventType}>
                  <option value="All">Géneros</option>
                  {generos?.map((g) => <option key={g} value={g}>{g}</option>)}
                </Form.Select>

                {/* Select Mes */}
                <Form.Select className={styles.navSelect} onChange={handleDate}>
                  <option value="All">Meses</option>
                  {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map(m => (
                      <option key={m} value={m}>{m} 2022</option>
                  ))}
                </Form.Select>

                {/* Searchbar */}
                <div style={{minWidth: '200px'}}>
                   <Searchbar />
                </div>
              </div>
            </Nav>

            {/* GRUPO 2: USUARIO Y CARRITO (A la derecha) */}
            <Nav className={`d-flex align-items-center ${styles.userSection}`}>
              
              {/* Menú Opciones */}
              <NavDropdown 
                title={<span style={{color:'#f0ad4e', fontWeight:'bold'}}>Opciones</span>} 
                id="basic-nav-dropdown" 
                menuVariant="dark"
                className="me-3"
              >
                <NavDropdown.Item onClick={() => handleMenuClick("createEvent")}>Crear Evento</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("orderDetail")}>Mis Órdenes</NavDropdown.Item>
              </NavDropdown>

              {/* Carrito */}
              <div className="me-3">
                <ShoppingCart />
              </div>

              {/* Avatar Usuario */}
              {isAuthenticated && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="div"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      cursor: "pointer",
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid #f0ad4e",
                    }}
                  >
                    <Image
                      src={userLoged?.picture}
                      alt="User"
                      width="100%"
                      height="100%"
                      style={{objectFit: 'cover'}}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end" style={{background: '#f0ad4e'}}>
                    <LinkContainer to="/profile"><Dropdown.Item>Perfil</Dropdown.Item></LinkContainer>
                    {userLoged?.roll === "Admin" && (
                        <LinkContainer to="/userManagement"><Dropdown.Item>Admin Usuarios</Dropdown.Item></LinkContainer>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}