"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, LOCALES, LocaleType } from "./types";
import { useClientLocale } from "./helpers/client";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = (props: {
  extraPath?: string;
  className?: string;
}) => {
  const locale = useClientLocale();
  const pathname = usePathname();
  const router = useRouter();

  function localeUrl(nextLocale: LocaleType) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && LOCALES.includes(segments[0] as LocaleType)) {
      segments.shift();
    }

    if (nextLocale !== DEFAULT_LOCALE) {
      segments.unshift(nextLocale);
    }
    // segments.unshift(nextLocale);

    return "/" + segments.join("/");
  }

  function handleChangeLocale(locale: LocaleType) {
    router.replace(localeUrl(locale) + (props.extraPath ?? ""));
  }

  return (
    <Button
      onClick={() => handleChangeLocale(locale === "tr" ? "en" : "tr")}
      name="LanguageButton"
      aria-label="LanguageButton"
      size="icon"
      className={cn(
        "cursor-pointer border",
        "bg-background hover:bg-accent text-foreground",
        props.className,
      )}
    >
      {locale.toUpperCase()}
    </Button>
  );
};
