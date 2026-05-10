import type {Locale} from "@/components/LocaleProvider";
import {PrivacyRoute, privacySharedMetadata} from "@/app/[locale]/privacy/privacy-route";

export const metadata = privacySharedMetadata;

/** `/privacy`는 URL에 locale이 없으므로 사이트 기본 언어(ko)로 동기화합니다. */
const DEFAULT_PRIVACY_LOCALE: Locale = "ko";

export default function PrivacyPage() {
  return <PrivacyRoute locale={DEFAULT_PRIVACY_LOCALE} />;
}
