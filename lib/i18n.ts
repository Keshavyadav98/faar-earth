import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import de from '../public/locales/de/common.json';
import nl from '../public/locales/nl/common.json';
import fr from '../public/locales/fr/common.json';
import es from '../public/locales/es/common.json';
import it from '../public/locales/it/common.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  nl: { translation: nl },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
};

// Detect user's language preference
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) return storedLanguage;
    
    // Browser language detection
    const browserLanguage = navigator.language.split('-')[0];
    if (['en', 'de', 'nl', 'fr', 'es', 'it'].includes(browserLanguage)) {
      return browserLanguage;
    }
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? getInitialLanguage() : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
