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

// --- 1. IMPORTAR TRADUCCIÓN Y EL SWITCHER DE BANDERAS ---
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

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
  // --- 2. INICIALIZAR EL HOOK DE TRADUCCIÓN ---
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- 3. Auth0 (Agregué loginWithPopup para el botón de Login) ---
  const { user, isAuthenticated, logout, getAccessTokenSilently, loginWithPopup } = useAuth0();
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

  // --- 4. Filtros ---
  const cities = useSelector((state) => state.allCities);
  const generos = useSelector((state) => state.allGeneros);

  const [filterCity, setFilterCity] = useState("");
  const [filterGenero, setFilterGenero] = useState("");

  // Array de meses original (lo que espera el Backend)
  const mesesOriginales = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  useEffect(() => {
    dispatch(byFilterDate());
    dispatch(getAllCities());
    dispatch(getAllGeneros());
    
    const filtroGuardado = localStorage.getItem("filtro");
    const nombre = localStorage.getItem("nombre");
    const genero = localStorage.getItem("genero");
    const mes = localStorage.getItem("mes");
    
    // Limpieza de filtros viejos
    if (filtroGuardado !== "ciudad" && filtroGuardado !== "genero" && filtroGuardado !== "mes") {
        localStorage.setItem("filtro", "sin filtro");
        dispatch(getAllEvent());
    } 
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
          
          <Navbar.Brand onClick={handleReset} className={styles.brand}>
            UnderEventsApp
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="me-auto d-flex align-items-center w-100 justify-content-center">
              <div className={styles.filtersContainer}>
                
                {/* Botón Ver Todo / Home */}
                <Nav.Link onClick={handleReset} className="text-warning fw-bold">
                  {t('nav.home')} 
                </Nav.Link>

                {/* Filtro Ciudades */}
                <Form.Select className={styles.navSelect} value={filterCity} onChange={handleStates}>
                  <option value="All">{t('nav.cities')}</option>
                  {cities?.map((c) => <option key={c} value={c}>{c}</option>)}
                </Form.Select>

                {/* Filtro Géneros */}
                <Form.Select className={styles.navSelect} value={filterGenero} onChange={handleEventType}>
                  <option value="All">{t('nav.genres')}</option>
                  {generos?.map((g) => <option key={g} value={g}>{g}</option>)}
                </Form.Select>

                {/* Filtro Meses (TRADUCIDO PERO FUNCIONAL) */}
                <Form.Select className={styles.navSelect} onChange={handleDate}>
                  <option value="All">{t('nav.months')}</option>
                  {mesesOriginales.map(m => (
                      <option key={m} value={m}>
                        {/* Muestra la traducción basada en la clave monthsList.enero, etc. */}
                        {t(`monthsList.${m.toLowerCase()}`)} 2022
                      </option>
                  ))}
                </Form.Select>

                <div style={{minWidth: '200px'}}>
                    <Searchbar />
                </div>
              </div>
            </Nav>

            <Nav className={`d-flex align-items-center ${styles.userSection}`}>
              
              {/* --- 5. SWITCHER DE BANDERAS --- */}
              <LanguageSwitcher />

              {/* Menú Opciones */}
              <NavDropdown 
                title={<span style={{color:'#f0ad4e', fontWeight:'bold'}}>{t('nav.options')}</span>} 
                id="basic-nav-dropdown" 
                menuVariant="dark"
                className="me-3"
              >
                <NavDropdown.Item onClick={() => handleMenuClick("createEvent")}>
                    {t('createEvent.title')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("orderDetail")}>
                    {t('cart.summary')}
                </NavDropdown.Item>
              </NavDropdown>

              <div className="me-3">
                <ShoppingCart />
              </div>

              {/* Avatar de Usuario o Login */}
              {isAuthenticated ? (
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
                    <LinkContainer to="/profile">
                        <Dropdown.Item>{t('nav.profile')}</Dropdown.Item>
                    </LinkContainer>
                    
                    {userLoged?.roll === "Admin" && (
                        <LinkContainer to="/userManagement">
                            <Dropdown.Item>Admin</Dropdown.Item>
                        </LinkContainer>
                    )}
                    
                    <Dropdown.Divider />
                    
                    <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                      {t('nav.logout')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                  // Botón Login corregido
                  <Nav.Link 
                    className="fw-bold text-white" 
                    onClick={() => loginWithPopup()} // Usamos loginWithPopup en lugar de logout
                  >
                     {t('nav.login')}
                  </Nav.Link>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}