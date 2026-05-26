import type {Locale} from "@/lib/i18n";
import {getMessages, isLocale} from "@/lib/i18n";
import {buildPageMetadata, resourcesAlternates} from "@/lib/seo";
import {notFound} from "next/navigation";
import ResourcesDirectoryView from "./resources-directory-view";
import ResourcesLocaleSync from "./resources-locale-sync";

export function generateStaticParams(): {locale: Locale}[] {
  return [{locale: "ko"}, {locale: "en"}, {locale: "es"}];
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw).Resources;
  return buildPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: `/${raw}/resources`,
    locale: raw,
    alternates: resourcesAlternates(raw),
  });
}

export default async function ResourcesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <ResourcesLocaleSync locale={raw} />
      <ResourcesDirectoryView locale={raw} />
    </>
  );
}
