import {
  LocaleType,
  LOCALES,
  MessagesType,
  DEFAULT_LOCALE,
  MESSAGES_MAP,
} from "../types";

export function checkLocale(locale: string) {
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

export async function getMessagesAsync(locale?: LocaleType) {
  const messages = (
    await import(`../messages/${locale ?? DEFAULT_LOCALE}.json`)
  ).default;
  return messages as MessagesType;
}

export function getMessages(locale?: LocaleType) {
  return MESSAGES_MAP[locale ?? DEFAULT_LOCALE];
}

export function getMessagesPath(locale?: LocaleType, path?: string) {
  const messages = MESSAGES_MAP[locale ?? DEFAULT_LOCALE];
  const messagesJSON = JSON.parse(JSON.stringify(messages));
  if (path) {
    return path.split(".").reduce((acc, key) => acc?.[key], messagesJSON);
  }
  return messagesJSON;
}
