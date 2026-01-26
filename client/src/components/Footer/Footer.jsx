import React from "react";
// 1. IMPORTAR HOOK
import { useTranslation } from "react-i18next";

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
  // 2. INICIALIZAR HOOK
  const { t } = useTranslation();

  return (
    <Box>
      <Container>
        <Title>UnderEventsApp</Title>
        <Row>
          <Column>
            {/* Traducción: ACERCA DE NOSOTROS */}
            <Heading>{t('footer.about')}</Heading>
            
            <FooterLink href="/aboutUs">
                {t('footer.history')}
            </FooterLink>
            
            <FooterLink href="/terms">
                {t('footer.terms')}
            </FooterLink>
          </Column>

          <Column>
            {/* Traducción: SERVICIOS */}
            <Heading>{t('footer.services')}</Heading>
            
            <FooterLink href="/cart">
                {t('footer.tickets')}
            </FooterLink>
            
            <FooterLink href="/createEvent">
                {t('footer.advertise')}
            </FooterLink>
          </Column>

          <Column>
            {/* Traducción: CONTÁCTENOS */}
            <Heading>{t('footer.contact')}</Heading>
            <div style={{ color: "white" }}>
               {/* NOTA: Si ContactUsFinal tiene texto adentro (ej: un botón "Enviar"), 
                  recuerda abrir ese archivo y traducirlo también.
               */}
               <ContactUsFinal />
            </div>
          </Column>

          <Column>
            {/* Traducción: REDES SOCIALES */}
            <Heading>{t('footer.socials')}</Heading>
            
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