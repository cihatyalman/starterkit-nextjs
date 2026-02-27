import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "./lib/language/i18n/types";

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export default function proxy(req: NextRequest) {
  const _localeCheck = localeCheck(req);
  if (_localeCheck !== null) return _localeCheck;

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

/* #region Functions */
function localeCheck(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const locale = req.cookies.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;
  if (locale !== DEFAULT_LOCALE && pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, origin));
  }
  return null;
}
/* #endregion */
