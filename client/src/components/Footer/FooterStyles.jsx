import styled from 'styled-components';

export const Box = styled.div`
  padding: 50px 20px;
  background: #1C2833; /* Fondo oscuro */
  width: 100%;
  margin-top: auto; /* Empuja el footer al fondo si hay poco contenido */
`;

export const Container = styled.div`
  max-width: 1200px; /* Ancho máximo para que no se estire infinito */
  margin: 0 auto; /* Centrado horizontal automático */
`;

export const Title = styled.h1`
  color: #f0ad4e;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 40px;
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
  color: #f0ad4e; /* Dorado */
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterLink = styled.a`
  color: #e0e0e0;
  margin-bottom: 12px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f0ad4e; /* Brillo dorado al pasar el mouse */
  }
  
  /* Iconos de redes sociales */
  i {
    margin-right: 10px;
  }
`;