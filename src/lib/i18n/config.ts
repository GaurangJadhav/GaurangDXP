export const locales = ["en", "hi", "mr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  mr: "🇮🇳",
};

// Map website locale to Contentstack locale code
export const contentstackLocaleMap: Record<Locale, string> = {
  en: "en-us",
  hi: "hi-in",
  mr: "mr-in",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

