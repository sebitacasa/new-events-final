import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  Title,
} from "./FooterStyles";
import ContactUsFinal from "../ContactUsFinal";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Title>UnderEventsApp</Title>
        <Row>
          <Column>
            <Heading>ACERCA DE NOSOTROS</Heading>
            <FooterLink href="/aboutUs">Nuestra Historia</FooterLink>
            <FooterLink href="/terms">Términos y Condiciones</FooterLink>
          </Column>

          <Column>
            <Heading>SERVICIOS</Heading>
            <FooterLink href="/cart">Venta de Tickets</FooterLink>
            <FooterLink href="/createEvent">Publicitar Artistas</FooterLink>
          </Column>

          <Column>
            <Heading>CONTÁCTENOS</Heading>
            <div style={{ color: "white" }}>
               {/* Asegúrate que ContactUsFinal no tenga márgenes raros */}
               <ContactUsFinal />
            </div>
          </Column>

          <Column>
            <Heading>REDES SOCIALES</Heading>
            <FooterLink href="https://facebook.com/" target="_blank">
              <i className="fab fa-facebook-f"></i> Facebook
            </FooterLink>
            <FooterLink href="https://instagram.com/" target="_blank">
              <i className="fab fa-instagram"></i> Instagram
            </FooterLink>
            <FooterLink href="https://twitter.com/" target="_blank">
              <i className="fab fa-twitter"></i> Twitter
            </FooterLink>
            <FooterLink href="https://youtube.com/" target="_blank">
              <i className="fab fa-youtube"></i> Youtube
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;