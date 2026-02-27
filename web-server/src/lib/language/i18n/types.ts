export const DEFAULT_LOCALE = "tr";
export const LOCALES = ["tr", "en"] as const;

export type LocaleType = (typeof LOCALES)[number];
