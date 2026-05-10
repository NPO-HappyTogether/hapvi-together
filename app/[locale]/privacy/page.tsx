import dynamic from "next/dynamic";
import {notFound} from "next/navigation";
import type {Locale} from "@/components/LocaleProvider";
import {privacyPageMetadata} from "@/lib/privacy-metadata";

const PrivacyLocaleSync = dynamic(() => import("./privacy-locale-sync"), {ssr: true});

export const metadata = privacyPageMetadata;

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export default async function PrivacyPageByLocale({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") notFound();
  const locale = raw as Locale;
  return <PrivacyLocaleSync locale={locale} />;
}
