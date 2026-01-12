// frontend/src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import en from './en.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr }
};

// Get saved language or default to German
const savedLanguage = localStorage.getItem('language') || 'de';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    debug: false, // Set to true to see i18n logs
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    react: {
      useSuspense: false
    }
  })
  .then(() => {
    console.log('✅ i18n initialized with language:', i18n.language);
  })
  .catch((err) => {
    console.error('❌ i18n initialization error:', err);
  });

export default i18n;