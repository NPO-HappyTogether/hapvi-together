import type {Locale} from "@/components/LocaleProvider";
import {EligibilityRoute, eligibilityMetadataFor} from "./eligibility-route";
import {notFound} from "next/navigation";

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") return {};
  return eligibilityMetadataFor(raw as Locale);
}

export default async function EligibilityPageByLocale({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (raw !== "ko" && raw !== "en" && raw !== "es") notFound();
  return <EligibilityRoute locale={raw as Locale} />;
}
