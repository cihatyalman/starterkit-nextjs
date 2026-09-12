import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { DEFAULT_LOCALE, LOCALES } from "./types";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined;

  try {
    const paramValue = await requestLocale;
    if (paramValue && hasLocale(LOCALES, paramValue)) {
      locale = paramValue;
    } else {
      locale = DEFAULT_LOCALE;
    }
  } catch {
    locale = DEFAULT_LOCALE;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
