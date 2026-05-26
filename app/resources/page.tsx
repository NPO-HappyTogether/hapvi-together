import ResourcesPageClient from "@/app/[locale]/resources/resources-client";
import ResourcesLocaleSync from "@/app/[locale]/resources/resources-locale-sync";
import {getMessages} from "@/lib/i18n";
import {fetchResources} from "@/lib/resources";
import {buildPageMetadata} from "@/lib/seo";

const m = getMessages("ko");

export const metadata = buildPageMetadata({
  title: m.resources.metaTitle,
  description: m.resources.metaDescription,
  path: "/ko/resources",
  locale: "ko",
});

export default async function ResourcesPage() {
  const items = await fetchResources();
  const copy = getMessages("ko").resources;

  return (
    <>
      <ResourcesLocaleSync locale="ko" />
      <ResourcesPageClient locale="ko" items={items} copy={copy} />
    </>
  );
}
