import type {Metadata} from "next";
import dynamic from "next/dynamic";
import {FaqJsonLd} from "@/components/FaqJsonLd";
import {getMessages} from "@/lib/i18n";
import {buildPageMetadata} from "@/lib/seo";

const HomePageClient = dynamic(() => import("./home-client"), {ssr: true});

export const metadata: Metadata = buildPageMetadata({
  title: "미국 주거 지원, 한국어로 함께합니다 | HapVi Together",
  path: "/",
});

export default function HomePage() {
  const faq = getMessages("ko").Home.faq.items;
  return (
    <>
      <FaqJsonLd items={faq} />
      <HomePageClient />
    </>
  );
}
