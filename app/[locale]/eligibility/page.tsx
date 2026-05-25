import type {Locale} from "@/components/LocaleProvider";
import {buildPageMetadata} from "@/lib/seo";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import ko from "@/messages/ko.json";
import {notFound} from "next/navigation";
import EligibilityChecker from "./EligibilityChecker";

const metaByLocale: Record<Locale, {title: string; description: string}> = {
  ko: {title: ko.Eligibility.metaTitle, description: ko.Eligibility.metaDescription},
  en: {title: en.Eligibility.metaTitle, description: en.Eligibility.metaDescription},
  es: {title: es.Eligibility.metaTitle, description: es.Eligibility.metaDescription},
};

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") return {};
  const m = metaByLocale[raw as Locale];
  return buildPageMetadata({title: m.title, description: m.description, path: `/${raw}/eligibility`});
}

export default async function EligibilityPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") notFound();
  return <EligibilityChecker locale={raw as Locale} />;
}
