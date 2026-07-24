import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/content/site";

/**
 * Everyone lands in a language. The root "/" negotiates via Accept-Language
 * and falls back to Portuguese, the language of the house and of almost
 * everyone buying a home in Lisbon. English exists for foreign buyers, who
 * are a real share of this market.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accept = req.headers.get("accept-language") ?? "";
  const wantsEnglish = /^en\b/i.test(accept.split(",")[0]?.trim() ?? "");
  const locale = wantsEnglish ? "en" : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|media|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
