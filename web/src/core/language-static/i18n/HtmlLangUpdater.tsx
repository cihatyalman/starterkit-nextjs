"use client";

import { useEffect } from "react";
import { useClientLocale } from "./helpers/client";

export default function HtmlLangUpdater() {
  const locale = useClientLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
