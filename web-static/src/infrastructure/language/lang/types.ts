import tr from "./messages/tr.json";
import en from "./messages/en.json";
export const MESSAGES_MAP = { tr, en } as const;

export const DEFAULT_LANG = "tr";
export const LANGS = ["tr", "en"] as const;

export type MessagesType = typeof tr;
export type LangType = (typeof LANGS)[number];
