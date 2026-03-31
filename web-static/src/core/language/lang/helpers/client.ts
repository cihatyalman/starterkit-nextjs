"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_LANG, LangType } from "../types";
import { checkLang, getLangUrl } from "./server";

/**
 * Server Component için global state kullanın.
 */
export function useClientLang() {
  const params = useSearchParams();
  const lang = params.get("lang") as LangType;

  if (checkLang(lang)) return lang;
  return DEFAULT_LANG;
}

export function useClientLangWithPath(path?: string) {
  const lang = useClientLang();
  return getLangUrl(lang, path);
}

export function useSystemLanguage() {
  const language = navigator.language.split("-")[0];

  if (checkLang(language)) return language as LangType;
  return DEFAULT_LANG;
}
