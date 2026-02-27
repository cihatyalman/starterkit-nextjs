"use client";

import { usePathname, useRouter } from "next/navigation";
import { CButton } from "@/components/custom/CButton";
import { DEFAULT_LOCALE, LOCALES, LocaleType } from "./types";
import { useClientLocale } from "./helpers/client";

export const LanguageSwitcher = (props: { extraPath?: string }) => {
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

    return "/" + segments.join("/");
  }

  function handleChangeLocale(locale: LocaleType) {
    router.replace(localeUrl(locale) + (props.extraPath ?? ""));
  }

  return (
    <CButton
      variant="outline"
      className="w-9"
      onClick={() => handleChangeLocale(locale === "tr" ? "en" : "tr")}
    >
      {locale.toUpperCase()}
    </CButton>
  );
};
