import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const btnStyle = {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '5px 10px',
    border: '1px solid #f0ad4e',
    margin: '0 5px'
  };

  // Estilo activo (relleno) vs inactivo (transparente)
  const activeStyle = { ...btnStyle, background: '#f0ad4e', color: 'black' };
  const inactiveStyle = { ...btnStyle, background: 'transparent', color: '#f0ad4e' };

  return (
    <div className="d-flex align-items-center">
      <Button 
        size="sm" 
        style={i18n.language === 'en' ? activeStyle : inactiveStyle}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
      <Button 
        size="sm" 
        style={i18n.language === 'de' ? activeStyle : inactiveStyle}
        onClick={() => changeLanguage('de')}
      >
        DE
      </Button>
    </div>
  );
}