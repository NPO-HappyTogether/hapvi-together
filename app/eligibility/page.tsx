import type {Locale} from "@/components/LocaleProvider";
import {buildPageMetadata} from "@/lib/seo";
import ko from "@/messages/ko.json";
import BenefitsDirectory from "@/app/[locale]/eligibility/BenefitsDirectory";

export const metadata = buildPageMetadata({
  title: ko.Eligibility.metaTitle,
  description: ko.Eligibility.metaDescription,
  path: "/ko/eligibility",
});

/** `/eligibility` — URL에 locale이 없으면 기본 언어(ko)로 표시합니다. */
const DEFAULT_ELIGIBILITY_LOCALE: Locale = "ko";

export default function EligibilityPage() {
  return <BenefitsDirectory locale={DEFAULT_ELIGIBILITY_LOCALE} />;
}
