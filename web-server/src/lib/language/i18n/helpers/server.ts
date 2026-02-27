import { DEFAULT_LOCALE, LOCALES, LocaleType } from "../types";

export function checkLocale(locale: LocaleType) {
  return LOCALES.includes(locale as LocaleType);
}

export function normalizeLocale(locale?: LocaleType) {
  locale ??= DEFAULT_LOCALE;
  if (locale === DEFAULT_LOCALE) return "";
  return locale as string;
}

export function getLocaleUrl(locale?: LocaleType, path?: string) {
  return normalizeLocale(locale) + path;
}
