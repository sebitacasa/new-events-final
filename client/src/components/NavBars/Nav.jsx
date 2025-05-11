import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LinkContainer } from "react-router-bootstrap";
import * as Action from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  Button,
  Dropdown,
  Image,
  DropdownButton,
  NavDropdown,
  FormControl
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

  const { user, isAuthenticated, loginWithRedirect, logout, loginWithPopup, getAccessTokenSilently } =
    useAuth0();

  const userLoged = useSelector((state) => state.userLoged);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("🔍 Auth0 User:", user);
      dispatch(Action.getUserByExternalId(user.sub)).then((data) => {
        console.log("🧠 Respuesta getUserByExternalId:", data);
        if (data.payload === null) {
          console.log("🚀 Ejecutando createUser");
          dispatch(
            Action.createUser({
              
              name: user.given_name,
              lastName: user.family_name,
              email: user.email,
              picture: user.picture,
            }, 
            getAccessTokenSilently)
          );
        }
      });
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    loginWithRedirect({
      appState: {
        targetUrl: window.location.pathname,
      },
    });
  };

  const handleMenu = (e) => {
    e.preventDefault();
    navigate(`/${e.target.name}`);
  };

  return (
    <header className={styles.nav}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link
              name=""
              style={{ color: "#f0ad4e", fontSize: "22px", fontWeight: "bold" }}
              bg="warning"
              onClick={handleMenu}
            >
              UnderEventsApp
            </Nav.Link>
            <Nav
              style={{ background: "#f0ad4e", color: "black" }}
              className="me-auto"
            >
              <NavDropdown
                variant="warning"
                bg="waring"
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#f0ad4e",
                }}
                title="Menu"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  
                  name={"createEvent"}
                  onClick={handleMenu}
                >
                  Crea tu Evento
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                 
                  name={"orderDetail"}
                  onClick={handleMenu}
                >
                  Ordenes
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <ShoppingCart />
            </Nav>
            <Nav>
              <Nav.Link style={{ color: "#f0ad4e" }} eventKey={2}>
               
              {isAuthenticated && (
  <Dropdown align="end" className="m-1">
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
      }}
    >
      {userLoged?.picture ? (
        <Image
          roundedCircle
          src={userLoged.picture}
          width="60px"
          alt="User"
        />
      ) : (
        <span style={{ fontSize: "14px" }}>User</span>
      )}
    </Dropdown.Toggle>

    <Dropdown.Menu
      style={{
        background: "#f0ad4e",
        color: "black",
        fontWeight: "bold",
      }}
    >
      {/* <Dropdown.Item enable>{userLoged?.name || "Usuario"}</Dropdown.Item> */}
      {/* <Dropdown.Divider /> */}
      <LinkContainer to="/profile">
        <Dropdown.Item enable>{userLoged?.name || "Usuario"}</Dropdown.Item>
      </LinkContainer>
      {userLoged?.roll === "Admin" && (
        <LinkContainer to="/userManagement">
          <Dropdown.Item>User Management</Dropdown.Item>
        </LinkContainer>
      )}
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)}

                {/* {isAuthenticated && (
                  <Dropdown align="end" className="m-1">
                    <Dropdown.Toggle
                      as={Image}
                      roundedCircle={true}
                      src={userLoged?.picture}
                      width="45px"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{
                        background: "#f0ad4e",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      <Dropdown.Item show={false}>
                        {userLoged?.name}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <LinkContainer to="/profile">
                        <Dropdown.Item>Profile</Dropdown.Item>
                      </LinkContainer>
                      {userLoged?.roll === "Admin" && (
                        <LinkContainer to="/userManagement">
                          <Dropdown.Item>User Management</Dropdown.Item>
                        </LinkContainer>
                      )}

                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                      >
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )} */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export function Selector() {
  const eventosBack = useSelector((state) => state.eventosBack);
  const filterDate = useSelector((state) => state.filterDate);
  const cities = useSelector((state) => state.allCities);
  const generos = useSelector((state) => state.allGeneros);

  const [filterCity, setFilterCity] = useState("");
  const [filterGenero, setFilterGenero] = useState("");
  const [filtroMes, setFilterMes] = useState("");
  const [filterActivo, setFilterActivo] = useState("sin filtro");

  useEffect(() => {
    dispatch(byFilterDate());
    dispatch(getAllCities());
    dispatch(getAllGeneros());

    if (
      localStorage.getItem("filtro") === "sin filtro" ||
      localStorage.getItem("filtro") === null
    ) {
      dispatch(getAllEvent());
    } else if (localStorage.getItem("filtro") === "ciudad") {
      dispatch(Action.getState(localStorage.getItem("nombre")));
    } else if (localStorage.getItem("filtro") === "genero") {
      dispatch(Action.byEventType(localStorage.getItem("genero")));
    } else if (localStorage.getItem("filtro") === "searchbar") {
      dispatch(Action.getByTitle(localStorage.getItem("searchbar")));
    } else if (localStorage.getItem("filtro") === "mes") {
      dispatch(Action.byFilterDate(localStorage.getItem("mes")));
    }
  }, []);

  const dispatch = useDispatch();

  function handleDate(e) {
    e.preventDefault();
    const mes = e.target.value;
    setFilterMes(mes);
    window.localStorage.setItem("mes", mes);
    dispatch(
      Action.byFilterDate(/* localStorage.getItem("mes") */ e.target.value)
    );
    window.localStorage.setItem("filtro", "mes");
  }

  const getMes = () => {
    return localStorage.getItem("mes");
  };

  //--------------------------------------------------------------------

  function handleEventType(e) {
    e.preventDefault();
    const genero = e.target.value;
    setFilterGenero(genero);
    window.localStorage.setItem("genero", genero);
    dispatch(Action.byEventType(localStorage.getItem("genero")));
    window.localStorage.setItem("filtro", "genero");
  }

  const saveGenero = () => {
    localStorage.setItem("genero", filterGenero);
  };

  const getGenero = () => {
    return localStorage.getItem("genero");
  };

  useEffect(() => {
    setFilterCity(getGenero());
  }, []);
  // -----------------------------------------
  function handleStates(e) {
    e.preventDefault();
    const city = e.target.value;
    setFilterCity(city);
    window.localStorage.setItem("nombre", city);
    dispatch(Action.getState(localStorage.getItem("nombre")));
    window.localStorage.setItem("filtro", "ciudad");
  }

  const saveData = () => {
    localStorage.setItem("nombre", filterCity);
  };

  const getData = () => {
    return localStorage.getItem("nombre");
  };

  useEffect(() => {
    setFilterCity(getData());
     dispatch(getAllEvent());
  }, []);
  //----------------------------------------------------

  /* function handleDate(e) {
      e.preventDefault();
      dispatch(Action.byFilterDate(e.target.value));
  
      
    } */
 function handleClick(e) {
   e.preventDefault();
   dispatch(getAllEvent());
 }

  return (
    <Container >
  <Row>
    <Col> <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand
          bg="warning"
          variant="warning"
          style={{ color: " #f0ad4e", fontWeight: "bold", width: "auto" }}
          
        >
          {" "}

          
          <Nav.Link   style={{ color: " #f0ad4e", fontWeight: "bold", width: "auto" }} onClick={(e) => { handleClick(e) }} >UnderEventsApp</Nav.Link>
        </Navbar.Brand >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form.Select
                    variant="warning"
                    bg="warning"
                    style={{
                      width: "150px",
                      height: "37px",
                      background: "#f0ad4e",
                      borderColor: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    size="sm"
                    onChange={handleStates}
                  >
                    <option
                      style={{ fontWeight: "bolder", fontSize: "14px" }}
                      value="All"
                      key="All"
                    >
                      Ciudades
                    </option>
                    {cities?.map((item) => (
                      <option
                        style={{ fontWeight: "bolder", fontSize: "12px" }}
                        onClick={saveData()}
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    style={{
                      width: "150px",
                      height: "37px",
                      background: "#f0ad4e",
                      borderColor: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    size="sm"
                    onChange={handleEventType}
                  >
                    <option
                      style={{ fontWeight: "bolder", fontSize: "14px" }}
                      value="All"
                      key="All"
                    >
                      Generos
                    </option>
                    {generos?.map((item) => (
                      <option
                        style={{ fontWeight: "bolder", fontSize: "12px" }}
                        onClick={getGenero()}
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                     <Form.Select
                    style={{
                      width: "150px",
                      height: "37px",
                      background: "#f0ad4e",
                      borderColor: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    size="sm"
                    onChange={handleDate}
                  >
                    <option
                      style={{ fontWeight: "bolder", fontSize: "14px" }}
                      onClick={() => getMes()}
                      value="All"
                      key="All"
                    >
                      Por mes
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Enero"
                    >
                      Enero de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Febrero"
                    >
                      Febrero de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Marzo"
                    >
                      Marzo de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Abril"
                    >
                      Abril de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Mayo"
                    >
                      Mayo de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Junio"
                    >
                      Junio de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Julio"
                    >
                      Julio de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Agosto"
                    >
                      Agosto de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Septiembre"
                    >
                      Septiembre de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Octubre"
                    >
                      Octubre de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Noviembre"
                    >
                      Noviembre de 2022
                    </option>
                    <option
                      style={{ fontWeight: "bolder", fontSize: "12px" }}
                      onClick={() => getMes()}
                      value="Diciembre"
                    >
                      Diciembre de 2022
                    </option>
                  </Form.Select>
         
          </Nav>
         <Searchbar/>
        </Navbar.Collapse>
      </Container>
    </Navbar></Col>
  </Row>
</Container>
   
  );
}

