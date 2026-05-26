import dynamic from "next/dynamic";
import type {Locale} from "@/components/LocaleProvider";

const PrivacyLocaleSync = dynamic(() => import("./privacy-locale-sync"), {ssr: true});

export function PrivacyRoute({locale}: {locale: Locale}) {
  return <PrivacyLocaleSync locale={locale} />;
}
