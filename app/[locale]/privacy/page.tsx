import {notFound} from "next/navigation";
import type {Locale} from "@/components/LocaleProvider";
import {PrivacyRoute, privacySharedMetadata} from "./privacy-route";

export const metadata = privacySharedMetadata;

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export default async function PrivacyPageByLocale({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") notFound();
  const locale = raw as Locale;
  return <PrivacyRoute locale={locale} />;
}
