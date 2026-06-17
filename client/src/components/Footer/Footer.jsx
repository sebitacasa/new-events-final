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
  LogoWrapper,
  LogoIcon,
  LogoName,
  LogoMain,
  LogoSub,
  Tagline,
} from "./FooterStyles";
import ContactUsFinal from "../ContactUsFinal";

const Footer = () => {
  // 2. INICIALIZAR HOOK
  const { t } = useTranslation();

  return (
    <Box>
      <Container>
        <LogoWrapper>
          <LogoIcon viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"/>
          </LogoIcon>
          <LogoName>
            <LogoMain>
              <span className="under">Under</span>
              <span className="events">Events</span>
            </LogoMain>
            <LogoSub>App</LogoSub>
          </LogoName>
        </LogoWrapper>
        <Tagline>Discover underground events near you</Tagline>
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