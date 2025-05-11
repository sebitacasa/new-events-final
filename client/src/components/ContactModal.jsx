import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { Button, Modal, Form } from "react-bootstrap";
import styles from "./ContactUs.module.css"

export default function ContactUsII() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);

    // const handleSubmit = (event) => {
      
    //   setValidated(true);
    // };
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

    // function handleOnClick(e){
    // }

    return (
      <div>
        <p className={styles.title} onClick={handleShow}>
            Contactenos
        </p>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title >Contactenos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         <Form noValidate validated={validated} onSubmit={sendEmail}>
         <div className="mb-3">
             <label class="form-label">Name</label>
             <input type="text" class="form-control" placeholder="Nombre" name="to_name" id="nombre" />
         </div> 
        
         <div className="mb-3" >
             <label class="form-label" >Correo electrónico</label>
             <input type="email" class="form-control" placeholder="Email" name="email" />
         </div>
        
         <div className="mb-3" >
             <label class="form-label" >Mensaje</label>
             <textarea type="text" class="form-control" placeholder="Mensaje" name="message" />
         </div>
         <Button variant="warning" type="submit">
              Enviar comentario
            </Button>
            <Button variant="danger" onClick={handleClose}>
           Cerrar
         </Button>
         </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
        //   <Form noValidate validated={validated} onSubmit={handleSubmit}>
        //     <Row className="mb-3">
        //         <Form.Group as={Col} md="4" controlId="validationCustom01">
        //         <Form.Label>First name</Form.Label>
        //         <Form.Control
        //             required
        //             type="text"
        //             placeholder="First name"
        //             defaultValue="Mark"
        //         />
        //         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        //         </Form.Group>
        //         <Form.Group as={Col} md="4" controlId="validationCustom02">
        //         <Form.Label>Last name</Form.Label>
        //         <Form.Control
        //             required
        //             type="text"
        //             placeholder="Last name"
        //             defaultValue="Otto"
        //         />
        //         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        //         </Form.Group>
        //     <Button variant="warning" type="submit" onClick={handleOnClick} >
        //       Enviar comentario
        //     </Button>
        //     <Button variant="danger" onClick={handleClose}>
        //       Cerrar
        //     </Button>
        //   </Row>
        //   </Form>