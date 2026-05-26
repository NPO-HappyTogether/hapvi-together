import ResourcesDirectoryView from "@/app/[locale]/resources/resources-directory-view";
import ResourcesLocaleSync from "@/app/[locale]/resources/resources-locale-sync";
import {getMessages} from "@/lib/i18n";
import {buildPageMetadata} from "@/lib/seo";

const m = getMessages("ko");

export const metadata = buildPageMetadata({
  title: m.Resources.metaTitle,
  description: m.Resources.metaDescription,
  path: "/ko/resources",
  locale: "ko",
});

export default function ResourcesPage() {
  return (
    <>
      <ResourcesLocaleSync locale="ko" />
      <ResourcesDirectoryView locale="ko" />
    </>
  );
}
