import tr from "./messages/tr.json";
import en from "./messages/en.json";
export const MESSAGES_MAP = { tr, en } as const;

export const DEFAULT_LOCALE = "tr";
export const LOCALES = ["tr", "en"] as const;
export const LOCALE_PARAMS_LIST = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
).map((locale) => ({ locale }));

export type MessagesType = typeof tr;
export type LocaleType = (typeof LOCALES)[number];
export type LocaleParamsType<T = LocaleType> = { locale: T };
