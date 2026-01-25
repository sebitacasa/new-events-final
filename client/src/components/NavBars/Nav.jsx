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

// ==========================================
// COMPONENTE 1: NAVTOP (Barra negra superior)
// ==========================================
export default function NavTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleMenu = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("name");
    if (target) navigate(`/${target}`);
    else navigate("/");
  };

  return (
    <header className={styles.nav}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{
              color: "#f0ad4e",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            UnderEventsApp
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto align-items-center">
              {/* Menú Dropdown Amarillo */}
              <NavDropdown
                title={<span style={{ color: "black", fontWeight: "bold" }}>Menú</span>}
                id="collasible-nav-dropdown"
                style={{
                  backgroundColor: "#f0ad4e",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                <NavDropdown.Item name="createEvent" onClick={handleMenu}>
                  Crea tu Evento
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item name="orderDetail" onClick={handleMenu}>
                  Ordenes
                </NavDropdown.Item>
              </NavDropdown>

              {/* Carrito de Compras */}
              <div className="mt-2 mt-lg-0">
                <ShoppingCart />
              </div>
            </Nav>

            <Nav>
              {/* Dropdown de Usuario */}
              {isAuthenticated && (
                <Dropdown align="end" className="mt-3 mt-lg-0">
                  <Dropdown.Toggle
                    as="div"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      cursor: "pointer",
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "#f0ad4e",
                      color: "black",
                      fontWeight: "bold",
                      border: "2px solid #f0ad4e",
                    }}
                  >
                    {userLoged?.picture ? (
                      <Image
                        roundedCircle
                        src={userLoged.picture}
                        width="100%"
                        height="100%"
                        alt="User"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ fontSize: "14px" }}>User</span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ background: "#f0ad4e" }}>
                    <LinkContainer to="/profile">
                      <Dropdown.Item>
                        <b>{userLoged?.name || "Usuario"}</b> (Perfil)
                      </Dropdown.Item>
                    </LinkContainer>
                    
                    {userLoged?.roll === "Admin" && (
                      <LinkContainer to="/userManagement">
                        <Dropdown.Item>Gestión de Usuarios</Dropdown.Item>
                      </LinkContainer>
                    )}
                    
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => logout({ returnTo: window.location.origin })}
                    >
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

// ==========================================
// COMPONENTE 2: SELECTOR (Barra de Filtros)
// ==========================================
export function Selector() {
  const dispatch = useDispatch();
  
  // Selectors
  const cities = useSelector((state) => state.allCities);
  const generos = useSelector((state) => state.allGeneros);

  // Local State
  const [filterCity, setFilterCity] = useState("");
  const [filterGenero, setFilterGenero] = useState("");
  const [setFilterMes] = useState("");

  // Carga inicial
  useEffect(() => {
    dispatch(byFilterDate());
    dispatch(getAllCities());
    dispatch(getAllGeneros());

    const filtroGuardado = localStorage.getItem("filtro");
    const nombre = localStorage.getItem("nombre");
    const genero = localStorage.getItem("genero");
    const mes = localStorage.getItem("mes");
    const search = localStorage.getItem("searchbar");

    if (!filtroGuardado || filtroGuardado === "sin filtro") {
      dispatch(getAllEvent());
    } else if (filtroGuardado === "ciudad" && nombre) {
      setFilterCity(nombre);
      dispatch(Action.getState(nombre));
    } else if (filtroGuardado === "genero" && genero) {
      setFilterGenero(genero);
      dispatch(Action.byEventType(genero));
    } else if (filtroGuardado === "mes" && mes) {
      dispatch(Action.byFilterDate(mes));
    } else if (filtroGuardado === "searchbar" && search) {
      dispatch(Action.getByTitle(search));
    }
  }, [dispatch]);

  // Handlers
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllEvent());
    localStorage.setItem("filtro", "sin filtro");
  };

  const handleStates = (e) => {
    const city = e.target.value;
    setFilterCity(city);
    localStorage.setItem("nombre", city);
    localStorage.setItem("filtro", "ciudad");
    dispatch(Action.getState(city));
  };

  const handleEventType = (e) => {
    const genero = e.target.value;
    setFilterGenero(genero);
    localStorage.setItem("genero", genero);
    localStorage.setItem("filtro", "genero");
    dispatch(Action.byEventType(genero));
  };

  const handleDate = (e) => {
    const mes = e.target.value;
    setFilterMes(mes); // Nota: filterMes no se usaba en el render, solo set
    localStorage.setItem("mes", mes);
    localStorage.setItem("filtro", "mes");
    dispatch(Action.byFilterDate(mes));
  };

  return (
    <div className={styles.selectorContainer}>
      <Container>
        <Navbar expand="lg" variant="dark" className={styles.selectorNavbar}>
          <Container fluid className="p-0">
            
            <Navbar.Toggle aria-controls="filter-navbar-scroll" className="mb-2" />
            
            <Navbar.Collapse id="filter-navbar-scroll">
             {/* Este es el Nav de la derecha con el usuario */}
            <Nav className="d-flex align-items-center ms-lg-3">
              {isAuthenticated && (
                <Dropdown align="end" className="mt-3 mt-lg-0">
                  <Dropdown.Toggle
                    as="div"
                    className="d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                      cursor: "pointer",
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "#f0ad4e",
                      color: "black",
                      fontWeight: "bold",
                      border: "2px solid #f0ad4e",
                      transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                  >
                    {userLoged?.picture ? (
                      <Image
                        roundedCircle
                        src={userLoged.picture}
                        width="100%"
                        height="100%"
                        alt="User"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ fontSize: "14px" }}>User</span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ background: "#f0ad4e", border: "1px solid black" }}>
                    <LinkContainer to="/profile">
                      <Dropdown.Item className="text-dark">
                        <b>{userLoged?.name || "Usuario"}</b> (Perfil)
                      </Dropdown.Item>
                    </LinkContainer>
                    
                    {userLoged?.roll === "Admin" && (
                      <LinkContainer to="/userManagement">
                        <Dropdown.Item className="text-dark">Gestión de Usuarios</Dropdown.Item>
                      </LinkContainer>
                    )}
                    
                    <Dropdown.Divider style={{ borderColor: "black" }} />
                    <Dropdown.Item
                      className="text-dark"
                      onClick={() => logout({ returnTo: window.location.origin })}
                    >
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}