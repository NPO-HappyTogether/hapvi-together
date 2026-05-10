import dynamic from "next/dynamic";
import type {Locale} from "@/components/LocaleProvider";
import {privacyPageMetadata} from "@/lib/privacy-metadata";

const PrivacyLocaleSync = dynamic(() => import("./privacy-locale-sync"), {ssr: true});

/** `/privacy` 및 `/[locale]/privacy`에서 공통 사용 */
export const privacySharedMetadata = privacyPageMetadata;

export function PrivacyRoute({locale}: {locale: Locale}) {
  return <PrivacyLocaleSync locale={locale} />;
}
