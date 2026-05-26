import type {Metadata} from "next";
import type {Locale} from "@/lib/i18n";
import {OG_LOCALE} from "@/lib/i18n";
import {SITE_IMAGES} from "@/lib/site-images";

export const SITE_ORIGIN = "https://hapvi.org";

export const SITE_DESCRIPTION =
  "LA 한인 가정을 위한 주거 연결, 정부 혜택 신청 지원. 무료 서비스. HapVi Together는 미국 국세법 Section 501(c)(3) 비영리 단체입니다.";

export const SITE_KEYWORDS = [
  "LA 한인 주거 지원",
  "미국 한인 복지",
  "섹션8 신청",
  "CalFresh 한국어",
  "한인 비영리단체",
  "HapVi Together",
];

export const ROOT_TITLE = "HapVi Together | LA 한인 주거 지원 비영리 단체";

/** 소셜 미리보기 — metadataBase 기준 상대 경로 */
export const SITE_OG_IMAGE = SITE_IMAGES.stock.hero;

export function pageUrl(path: string): string {
  if (path === "/" || path === "") return SITE_ORIGIN;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

export function eligibilityAlternates(locale: Locale): Metadata["alternates"] {
  const canonical = pageUrl(`/${locale}/eligibility`);
  return {
    canonical,
    languages: {
      ko: pageUrl("/ko/eligibility"),
      en: pageUrl("/en/eligibility"),
      es: pageUrl("/es/eligibility"),
      "x-default": pageUrl("/ko/eligibility"),
    },
  };
}

export function resourcesAlternates(locale: Locale): Metadata["alternates"] {
  const canonical = pageUrl(`/${locale}/resources`);
  return {
    canonical,
    languages: {
      ko: pageUrl("/ko/resources"),
      en: pageUrl("/en/resources"),
      es: pageUrl("/es/resources"),
      "x-default": pageUrl("/ko/resources"),
    },
  };
}

export function privacyAlternates(locale: Locale): Metadata["alternates"] {
  const canonical = pageUrl(`/${locale}/privacy`);
  return {
    canonical,
    languages: {
      ko: pageUrl("/ko/privacy"),
      en: pageUrl("/en/privacy"),
      es: pageUrl("/es/privacy"),
      "x-default": pageUrl("/ko/privacy"),
    },
  };
}

export function buildPageMetadata(opts: {
  title: string;
  path: string;
  description?: string;
  locale?: Locale;
  alternates?: Metadata["alternates"];
}): Metadata {
  const description = opts.description ?? SITE_DESCRIPTION;
  const url = pageUrl(opts.path);
  const ogLocale = opts.locale ? OG_LOCALE[opts.locale] : "ko_KR";

  return {
    title: {absolute: opts.title},
    description,
    alternates: opts.alternates ?? {canonical: url},
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      title: opts.title,
      description,
      siteName: "HapVi Together",
      images: [{url: SITE_OG_IMAGE, alt: "HapVi Together"}],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "HapVi Together",
  alternateName: "Happy Village Together",
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/images/hapvi-logo.png`,
  description: SITE_DESCRIPTION,
  email: "info@hapvi.org",
  areaServed: {
    "@type": "City",
    name: "Los Angeles",
    containedInPlace: {"@type": "State", name: "California"},
  },
  knowsAbout: [
    "Section 8 housing vouchers",
    "CalFresh",
    "Medi-Cal",
    "LIHEAP",
    "Emergency rental assistance",
    "Korean-American community services",
  ],
  nonprofitStatus: "Nonprofit501c3",
  taxID: "33-3980325",
} as const;
