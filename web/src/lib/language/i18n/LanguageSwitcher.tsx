"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, LocaleType } from "./types";
import { useClientLocale } from "./helpers/client";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = (props: {
  extraPath?: string;
  className?: string;
}) => {
  const locale = useClientLocale();
  const pathname = usePathname();

  function localeUrl(nextLocale: LocaleType) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && LOCALES.includes(segments[0] as LocaleType)) {
      segments.shift();
    }

    if (nextLocale !== DEFAULT_LOCALE) {
      segments.unshift(nextLocale);
    }

    return "/" + segments.join("/");
  }

  function handleChangeLocale(locale: LocaleType) {
    window.location.href = localeUrl(locale) + (props.extraPath ?? "");
  }

  return (
    <Button
      name="LanguageButton"
      aria-label="LanguageButton"
      size="icon"
      variant="outline"
      onClick={() => handleChangeLocale(locale === "tr" ? "en" : "tr")}
      className={`font-bold cursor-pointer ${props.className}`}
    >
      {locale.toUpperCase()}
    </Button>
  );
};
