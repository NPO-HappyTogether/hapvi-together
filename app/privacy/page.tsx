import dynamic from "next/dynamic";
import {privacyPageMetadata} from "@/lib/privacy-metadata";

const PrivacyPageClient = dynamic(() => import("./privacy-client"), {ssr: true});

export const metadata = privacyPageMetadata;

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
