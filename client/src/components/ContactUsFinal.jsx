import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { Button, Modal, Form, Row } from "react-bootstrap";

export default function ContactUsFinal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    function sendEmail(e){      
        const form = e.target;
        
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        emailjs.sendForm('service_ofwvliw', 'template_m60ighf', e.target, '4BHkR2Tf-F7GH6JZS').then(res=>{
            console.log(res);
        })
        alert("Email sended")
        handleClose() 
      }

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    // const handleSubmit = (e) => {
    //     if (e.target.checkValidity() === false) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }  
        
    //     setValidated(true);
    // };
    
    // function sendEmail(e){
    //     emailjs.sendForm('service_ofwvliw', 'template_m60ighf', e.target, '4BHkR2Tf-F7GH6JZS').then(res=>{
    //         console.log(res);
    //     })
    // }
    // ------------------------------
    // function handleOnClick(e){
    //     if(validated){
    //         alert("Email sended")
    //     } else{
    //         alert("Faltan datos")
    //     }
    //     handleClose()
    // }

    return (
      <>
        <p style={{cursor: "pointer"}} onClick={handleShow}>
          Contactenos
        </p>
   
        <Modal show={show} fullscreen={fullscreen} onHide={handleClose} style={{background: "#292b2c"}}>
          <Modal.Header closeButton style={{background: "#f0ad4e"}} >
            <Modal.Title>Contactenos</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{background: "#292b2c"}}>
          <Form validated={validated} onSubmit={(e) => sendEmail(e)}>
            <Row className="mb-3">
                <Form.Group md="4" controlId="validationCustom01">
                <Form.Label style={{color: "white"}}>Nombre</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Nombre"
                    name="to_name"
                />
                <Form.Control.Feedback>Dato correcto</Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                <Form.Label style={{color: "white", marginTop: "15px"}}>Correo electrónico</Form.Label>
                <Form.Control
                    required
                    type="mail"
                    placeholder="Correo"
                    name="email"
                />
                <Form.Control.Feedback>Dato correcto</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group md="6" controlId="validationCustom03">
                <Form.Label style={{color: "white"}}>Mensaje</Form.Label>
                <Form.Control as="textarea" type="text" placeholder="Mensaje" name="message" required />
                <Form.Control.Feedback type="invalid">
                    Escriba un mensaje porfavor.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button variant="warning" type="submit" style={{marginLeft: "45%"}} >
              Enviar
            </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  