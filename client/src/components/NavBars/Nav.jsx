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
  const { user, isAuthenticated, logout, loginWithPopup } = useAuth0();
  const userLoged = useSelector((state) => state.userLoged);


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
            <svg className={styles.logoIcon} viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"/>
            </svg>
            <div>
              <span className={styles.logoText}>
                <span className={styles.logoUnder}>Under</span>
                <span className={styles.logoEvents}>Events</span>
              </span>
              <span className={styles.logoApp}>App</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className={`me-auto d-flex align-items-center flex-grow-1 justify-content-center ${styles.filtersNav}`}>
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

              {/* Menú Opciones */}
              <NavDropdown
                title={<span style={{color:'#f0ad4e', fontWeight:'bold'}}>{t('nav.options')}</span>}
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={() => handleMenuClick("createEvent")}>
                    {t('createEvent.title')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("orderDetail")}>
                    {t('cart.summary')}
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Item className="d-flex align-items-center">
                <ShoppingCart />
              </Nav.Item>

              {/* --- 5. SWITCHER DE BANDERAS --- */}
              <Nav.Item className="d-flex align-items-center">
                <LanguageSwitcher />
              </Nav.Item>

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
                      src={userLoged?.picture || user?.picture}
                      alt="User"
                      width="100%"
                      height="100%"
                      style={{objectFit: 'cover', objectPosition: 'center'}}
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
                <button
                  className={styles.loginBtn}
                  onClick={() => loginWithPopup().catch((err) => console.error("Auth0 loginWithPopup error:", err))}
                >
                  <span className={styles.loginBtnText}>{t('nav.login')}</span>
                </button>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}