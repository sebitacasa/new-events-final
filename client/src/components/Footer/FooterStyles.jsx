import styled from 'styled-components';

export const Box = styled.div`
  padding: 50px 20px;
  background: var(--bg-dark);
  border-top: var(--border-soft);
  width: 100%;
  margin-top: auto; /* Empuja el footer al fondo si hay poco contenido */
`;

export const Container = styled.div`
  max-width: 1200px; /* Ancho máximo para que no se estire infinito */
  margin: 0 auto; /* Centrado horizontal automático */
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const LogoIcon = styled.svg`
  color: var(--gold);
  filter: drop-shadow(0 0 8px rgba(240, 173, 78, 0.5));
  flex-shrink: 0;
`;

export const LogoName = styled.div`
  line-height: 1.1;
`;

export const LogoMain = styled.span`
  display: block;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.5px;

  .under  { color: #ffffff; }
  .events { color: var(--gold); }
`;

export const LogoSub = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 600;
  color: rgba(240, 173, 78, 0.5);
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
`;

export const Tagline = styled.p`
  color: rgba(255,255,255,0.35);
  font-size: 13px;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
  margin-top: 0;
`;

/* keep Title for backwards compat but hidden */
export const Title = styled.h1`
  display: none;
`;

export const Row = styled.div`
  display: grid;
  /* PC: 4 columnas iguales */
  grid-template-columns: repeat(4, 1fr); 
  grid-gap: 30px;

  /* Tablet: 2 columnas */
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Celular: 1 sola columna */
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    text-align: center; /* Texto centrado en móvil */
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left; /* Alineado a la izquierda en PC para orden */

  /* En celular, centramos todo */
  @media (max-width: 576px) {
    align-items: center; 
    text-align: center;
  }
`;

export const Heading = styled.p`
  font-size: 18px;
  color: var(--gold);
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid rgba(240, 173, 78, 0.25);
  padding-bottom: 10px;
`;

export const FooterLink = styled.a`
  color: #e0e0e0;
  margin-bottom: 12px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: var(--gold);
  }

  /* Iconos de redes sociales */
  i {
    margin-right: 10px;
  }
`;