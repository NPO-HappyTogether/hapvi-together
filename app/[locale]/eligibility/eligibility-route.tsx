import type {Locale} from "@/components/LocaleProvider";
import type {Metadata} from "next";
import dynamic from "next/dynamic";
import {buildPageMetadata} from "@/lib/seo";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const EligibilityLocaleSync = dynamic(() => import("./eligibility-locale-sync"), {ssr: true});

const metaByLocale: Record<Locale, {title: string; description: string}> = {
  ko: {title: ko.Eligibility.metaTitle, description: ko.Eligibility.metaDescription},
  en: {title: en.Eligibility.metaTitle, description: en.Eligibility.metaDescription},
  es: {title: es.Eligibility.metaTitle, description: es.Eligibility.metaDescription},
};

export function eligibilityMetadataFor(locale: Locale): Metadata {
  const m = metaByLocale[locale];
  return buildPageMetadata({
    title: m.title,
    description: m.description,
    path: `/${locale}/eligibility`,
  });
}

export function EligibilityRoute({locale}: {locale: Locale}) {
  return <EligibilityLocaleSync locale={locale} />;
}
