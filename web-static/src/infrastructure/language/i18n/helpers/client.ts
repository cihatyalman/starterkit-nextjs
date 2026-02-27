"use client";

import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, LocaleType } from "../types";
import { checkLocale, getLocaleUrl } from "./server";

/**
 * Server Component için global state kullanın.
 */
export function useClientLocale() {
  const params = useParams();
  const locale = params.locale as LocaleType;

  if (checkLocale(locale)) return locale;
  return DEFAULT_LOCALE;
}

export function useClientLocaleWithPath(path?: string) {
  const locale = useClientLocale();
  return getLocaleUrl(locale, path);
}

export function useSystemLanguage() {
  const language = navigator.language.split("-")[0];

  if (checkLocale(language)) return language as LocaleType;
  return DEFAULT_LOCALE;
}
