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
            <FooterLink href="/contactUs">
              {t('contact.title')}
            </FooterLink>
          </Column>

        </Row>
      </Container>
    </Box>
  );
};

export default Footer;