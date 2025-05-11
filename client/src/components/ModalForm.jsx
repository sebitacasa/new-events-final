import { React, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./CreateEvent.module.css";
import Loading from "./Loading";
import {
    Nav,
    Navbar,
    NavDropdown,
    Container,
    Row,
    Col,
    Figure,
    Form,
    Placeholder,
    ListGroup,
    ListGroupItem,
    Card,
    Button,
    InputGroup,
    FormControl,
    
  } from "react-bootstrap";
import Footer from "./Footer/Footer";
import * as Action from "../redux/actions/actions";
import { ImLocation } from "react-icons/im";
import { FaCalendar, FaSearchLocation, FaTicketAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";


import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import NavTop from "./NavBars/Nav";

import img from "../images/1649175668524-null-cabecera_crowder.jpg"
import { useNavigate } from "react-router-dom";


export function ModalFormulario() {
  const stateInitialForms = {
    description: "",
    rating: "",
    email: "",

  };

  const { user, isLoading } = useAuth0();
  const [input, setInput] = useState(stateInitialForms);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const UseHistory = useNavigate()

  const detalles = useSelector((state) => state.detailEventos);
  console.log(detalles)
  // const tickets = useSelector((state) => state.tickets);

  console.log(detalles, "detalles"); // {data full} // necesito sacar id  de aca //

  const { id } = useParams();





  useEffect(() => {
    dispatch(Action.getDetail(id));
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    dispatch(Action.createEvent(input));
    alert("New event added successfully!");
    setInput({
      description: "",
      rating: "",
      email: ""
      
    });
   
    UseHistory('/')  
  };
  
  return (
    <div className={styles.container1}>
     
      <Container >
        <Row>
          <Col xs style={{marginRight: "85px"}}>
              
         
            <div className={styles.container1}>
                
              <div style={{ marginTop: "85px" }}>
              
                <Form style={{marginTop: "5%"}} validated={validated} onSubmit={handleSubmit}>
                  <div style={{marginLeft: "17%", marginBottom: "2%"}}>
                      
                    <h5>Dejanos tu Reviews acerca de este evento</h5>
                  </div>

                  <Form.Group controlId="validationCustom01">
                    <Form.Label>Puntuacion</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="rating"
                      value={input.rating}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>

                  <Form.Group controlId="validationCustom01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="mail"
                      name="email"
                      value={input.email}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>

                 

                 

                  <>
                    <Form.Group controlId="validationCustom03">
                      <Form.Label>Escribe detalle del evento</Form.Label>
                      <InputGroup>
                        <FormControl
                          as="textarea"
                          aria-label="With textarea"
                          name="description"
                          value={input.description}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ height: '150px' }}
                          
                        />
                      </InputGroup>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                   

                    <div>
                      <div className={styles.direcction}>
                       

                        <>
                          

                         
                        </>

                        <div className="d-grid gap-2">
                          <Button
                            style={{ fontWeight: "bolder", marginTop: "25px" }}
                            variant="warning"
                            size="lg"
                            type="submit"
                          >
                            Cargar Reseña
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                </Form>
              </div>
            </div>
          </Col>
          
        </Row>
      </Container>
      
    </div>
  );
}

export default withAuthenticationRequired(ModalFormulario, {
  onRedirecting: () => <Loading />,
});
