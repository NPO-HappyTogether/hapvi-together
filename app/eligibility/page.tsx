import BenefitsDirectoryView from "@/app/[locale]/eligibility/benefits-directory-view";
import EligibilityLocaleSync from "@/app/[locale]/eligibility/eligibility-locale-sync";
import {buildPageMetadata} from "@/lib/seo";
import {getMessages} from "@/lib/i18n";

const m = getMessages("ko");

export const metadata = buildPageMetadata({
  title: m.Eligibility.metaTitle,
  description: m.Eligibility.metaDescription,
  path: "/ko/eligibility",
  locale: "ko",
});

/** `/eligibility` — URL에 locale이 없으면 기본 언어(ko)로 표시합니다. */
export default function EligibilityPage() {
  return (
    <>
      <EligibilityLocaleSync locale="ko" />
      <BenefitsDirectoryView locale="ko" />
    </>
  );
}
