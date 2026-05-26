import type {Locale} from "@/lib/i18n";
import {getMessages, isLocale} from "@/lib/i18n";
import {buildPageMetadata, eligibilityAlternates} from "@/lib/seo";
import {notFound} from "next/navigation";
import BenefitsDirectoryView from "./benefits-directory-view";
import EligibilityLocaleSync from "./eligibility-locale-sync";

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw).Eligibility;
  return buildPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: `/${raw}/eligibility`,
    locale: raw,
    alternates: eligibilityAlternates(raw),
  });
}

export default async function EligibilityPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <EligibilityLocaleSync locale={raw} />
      <BenefitsDirectoryView locale={raw} />
    </>
  );
}
