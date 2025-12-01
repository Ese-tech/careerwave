// frontend/src/constants/locales.ts
export const SUPPORTED_LOCALES = {
  DE: 'de',
  EN: 'en',
  ES: 'es',
  FR: 'fr'
} as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[keyof typeof SUPPORTED_LOCALES];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français'
};

export const LOCALE_FLAGS: Record<SupportedLocale, string> = {
  de: '🇩🇪',
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷'
};

export const DEFAULT_LOCALE: SupportedLocale = SUPPORTED_LOCALES.DE;

export const LOCALE_STORAGE_KEY = 'careerwave_locale';

export function isValidLocale(locale: string): locale is SupportedLocale {
  return Object.values(SUPPORTED_LOCALES).includes(locale as SupportedLocale);
}

export function getLocaleFromPath(path: string): SupportedLocale | null {
  const segments = path.split('/');
  const potentialLocale = segments[1];
  
  if (isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return null;
}

export function getStoredLocale(): SupportedLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isValidLocale(stored)) {
      return stored;
    }
  } catch {
    // localStorage might not be available
  }
  
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: SupportedLocale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // localStorage might not be available
  }
}

export function getBrowserLocale(): SupportedLocale {
  const browserLang = navigator.language?.split('-')[0];
  
  if (browserLang && isValidLocale(browserLang)) {
    return browserLang;
  }
  
  return DEFAULT_LOCALE;
}