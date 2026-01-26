import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Icono de la bandera actual
  const currentFlag = i18n.language === 'de' ? '🇩🇪' : '🇬🇧';

  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle 
        variant="outline-warning" 
        id="dropdown-flags" 
        size="sm"
        style={{border: 'none', fontSize: '1.2rem', padding: '0 5px'}}
      >
        {currentFlag}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{minWidth: 'auto', background: '#212529', border: '1px solid #f0ad4e'}}>
        <Dropdown.Item 
          onClick={() => changeLanguage('en')} 
          style={{color: '#f0ad4e'}}
          className="d-flex align-items-center gap-2"
        >
          <span>🇬🇧</span> English
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={() => changeLanguage('de')} 
          style={{color: '#f0ad4e'}}
          className="d-flex align-items-center gap-2"
        >
          <span>🇩🇪</span> Deutsch
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}