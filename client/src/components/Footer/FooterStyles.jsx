import styled from 'styled-components';

export const Box = styled.div`
  padding: 50px 20px; /* Reduje el padding lateral para móviles */
  background: #1C2833;
  position: relative;
  bottom: 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px; /* Un poco más ancho para pantallas grandes */
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #f0ad4e;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 26px; /* Letra un poco más chica en celular */
  }
`;

export const Row = styled.div`
  display: grid;
  /* Escritorio: 4 columnas iguales */
  grid-template-columns: repeat(4, 1fr); 
  grid-gap: 30px;

  /* Tablet: 2 columnas (2 arriba, 2 abajo) */
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Celular: 1 sola columna (todo apilado) */
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  /* IMPORTANTE: Eliminé el margin-left: 60px que rompía el responsive */
  
  /* Centrar el contenido en celular para que se vea más ordenado */
  @media (max-width: 500px) {
    align-items: center;
    text-align: center;
  }
`;

export const Heading = styled.p`
  font-size: 20px; /* Un poco más sutil */
  color: #f0ad4e;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase; /* Queda más elegante en footers */
`;

export const FooterLink = styled.a`
  color: #fff; /* Blanco por defecto es más legible, hover en dorado */
  margin-bottom: 12px;
  font-size: 16px;
  text-decoration: none;
  font-family: 'Arial', sans-serif; /* Corregido typo 'font family' */
  cursor: pointer;

  &:hover {
    color: #f0ad4e;
    transition: 0.3s ease-out;
  }

  i {
    margin-right: 10px;
  }
`;