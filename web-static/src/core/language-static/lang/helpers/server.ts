import {
  MessagesType,
  MESSAGES_MAP,
  LANGS,
  DEFAULT_LANG,
  LangType,
} from "../types";

export function checkLang(lang: string) {
  return LANGS.includes(lang as LangType);
}

export function normalizeLang(lang?: LangType) {
  lang ??= DEFAULT_LANG;
  if (lang === DEFAULT_LANG) return "";
  return lang as string;
}

export function getLangUrl(lang?: LangType, path?: string) {
  const currentLocale = normalizeLang(lang);
  let params = "";
  if (currentLocale !== "") params = "?lang=" + currentLocale;
  return path + params;
}

export async function getMessagesAsync(lang?: LangType) {
  const messages = (await import(`../messages/${lang ?? DEFAULT_LANG}.json`))
    .default;
  return messages as MessagesType;
}

export function getMessages(lang?: LangType) {
  return MESSAGES_MAP[lang ?? DEFAULT_LANG];
}
