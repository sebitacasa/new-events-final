import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  Title, // Agregamos el nuevo componente Title
} from "./FooterStyles";
import ContactUsFinal from "../ContactUsFinal";

const Footer = () => {
  return (
    <div>
      <Box>
        <Title>UnderEventsApp</Title>
        <Container>
          <Row>
            <Column>
              <Heading>Acerca de nosotros</Heading>
              <FooterLink href="/aboutUs">Nuestra Historia</FooterLink>
              <FooterLink href="/terms">Términos y Condiciones</FooterLink>
            </Column>
            
            <Column>
              <Heading>Servicios</Heading>
              {/* IMPORTANTE: Usar rutas relativas, NO localhost */}
              <FooterLink href="/cart">Venta de Tickets</FooterLink>
              <FooterLink href="/createEvent">Publicitar Artistas</FooterLink>
            </Column>
            
            <Column>
              <Heading>Contáctenos</Heading>
              {/* Quitamos el <p> extra que no es necesario */}
              <div style={{ color: "white" }}>
                <ContactUsFinal />
              </div>
            </Column>
            
            <Column>
              <Heading>Redes Sociales</Heading>
              <FooterLink href="https://facebook.com/" target="_blank">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </FooterLink>
              
              <FooterLink href="https://instagram.com/" target="_blank">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </FooterLink>
              
              <FooterLink href="https://twitter.com/" target="_blank">
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </FooterLink>
              
              <FooterLink href="https://youtube.com/" target="_blank">
                <i className="fab fa-youtube"></i>
                <span>Youtube</span>
              </FooterLink>
            </Column>
          </Row>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;