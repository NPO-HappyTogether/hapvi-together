import type {Metadata} from "next";
import dynamic from "next/dynamic";
import {buildPageMetadata} from "@/lib/seo";

const ServicesPageClient = dynamic(() => import("./services-client"), {ssr: true});

export const metadata: Metadata = buildPageMetadata({
  title: "주거 연결 및 정부 혜택 신청 지원 서비스 | HapVi Together",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageClient />;
}
