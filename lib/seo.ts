import type {Metadata} from "next";
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

export function buildPageMetadata(opts: {title: string; path: string; description?: string}): Metadata {
  const description = opts.description ?? SITE_DESCRIPTION;
  const url = pageUrl(opts.path);

  return {
    title: {absolute: opts.title},
    description,
    alternates: {canonical: url},
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      title: opts.title,
      description,
      siteName: "HapVi Together",
      images: [{url: SITE_OG_IMAGE}],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}
