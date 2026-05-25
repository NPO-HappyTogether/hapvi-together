import type {Locale} from "@/components/LocaleProvider";
import {EligibilityRoute, eligibilityMetadataFor} from "@/app/[locale]/eligibility/eligibility-route";

export const metadata = eligibilityMetadataFor("ko");

/** `/eligibility` — URL에 locale이 없으면 기본 언어(ko)로 동기화합니다. */
const DEFAULT_ELIGIBILITY_LOCALE: Locale = "ko";

export default function EligibilityPage() {
  return <EligibilityRoute locale={DEFAULT_ELIGIBILITY_LOCALE} />;
}
