import type {Metadata} from "next";
import dynamic from "next/dynamic";
import {Suspense} from "react";
import {buildPageMetadata} from "@/lib/seo";

const ContactPageClient = dynamic(() => import("./contact-client"), {ssr: true});

export const metadata: Metadata = buildPageMetadata({
  title: "무료 상담 신청 - HapVi Together",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageClient />
    </Suspense>
  );
}
