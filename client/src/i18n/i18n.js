import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import de from './de.json';

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next)
  .init({
    resources: {
      en: en, // Usa el archivo importado arriba
      de: de
    },
    lng: "en", // Idioma por defecto (Inglés)
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;