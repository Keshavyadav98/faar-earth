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

export const SUPPORTED_LANGUAGES = ['en', 'de', 'nl', 'fr', 'es', 'it'];

const LANGUAGE_COOKIE = 'language';
const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

// Persist the chosen language to both a cookie (sent to the server, survives
// longer / independent of localStorage) and localStorage (existing fallback).
export function persistPreferredLanguage(lang: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000`;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // ignore (e.g. private browsing)
  }
}

// Detect user's preferred language — only called after mount (client-side),
// never during init, so the server and the first client render always match ('en').
export const getPreferredLanguage = () => {
  if (typeof window === 'undefined') return 'en';

  const cookieLanguage = getCookie(LANGUAGE_COOKIE);
  if (cookieLanguage && SUPPORTED_LANGUAGES.includes(cookieLanguage)) return cookieLanguage;

  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) return storedLanguage;

  const browserLanguage = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.includes(browserLanguage)) return browserLanguage;

  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
