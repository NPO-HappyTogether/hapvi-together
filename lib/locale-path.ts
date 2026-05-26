import type {Locale} from "@/lib/i18n";

export const LOCALE_SEGMENT = "(ko|en|es)" as const;
export const LOCALE_ROUTED_PAGES = ["eligibility", "resources", "privacy"] as const;
export type LocaleRoutedPage = (typeof LOCALE_ROUTED_PAGES)[number];

const localePageRe = new RegExp(`^/(${LOCALE_SEGMENT})/(${LOCALE_ROUTED_PAGES.join("|")})$`);

export function privacyPath(locale: Locale): string {
  return `/${locale}/privacy`;
}

export function localeRoutedPath(page: LocaleRoutedPage, locale: Locale): string {
  return `/${locale}/${page}`;
}

/** `/en/resources` + `es` → `/es/resources` */
export function switchLocalePath(pathname: string, next: Locale): string | null {
  const m = pathname.match(localePageRe);
  if (!m) return null;
  return `/${next}/${m[2] as LocaleRoutedPage}`;
}

export function pathnameLocale(pathname: string): Locale | null {
  const m = pathname.match(localePageRe);
  if (!m) return null;
  const raw = m[1];
  if (raw === "ko" || raw === "en" || raw === "es") return raw;
  return null;
}

export function isNavActive(pathname: string, navPath: "/services" | "/eligibility" | "/resources" | "/about" | "/contact", locale: Locale): boolean {
  if (navPath === "/eligibility") {
    return pathname === `/${locale}/eligibility` || pathname === "/eligibility";
  }
  if (navPath === "/resources") {
    return pathname === `/${locale}/resources` || pathname === "/resources";
  }
  return pathname === navPath;
}
