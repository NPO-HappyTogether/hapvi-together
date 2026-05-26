import {notFound} from "next/navigation";
import type {Locale} from "@/lib/i18n";
import {getMessages, isLocale} from "@/lib/i18n";
import {buildPageMetadata, privacyAlternates} from "@/lib/seo";
import {PrivacyRoute} from "./privacy-route";

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw).Privacy;
  return buildPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: `/${raw}/privacy`,
    locale: raw,
    alternates: privacyAlternates(raw),
  });
}

export default async function PrivacyPageByLocale({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) notFound();
  return <PrivacyRoute locale={raw} />;
}
