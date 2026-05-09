import type {Metadata} from "next";
import ContactPageClient from "./contact-client";
import {buildPageMetadata} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "무료 상담 신청 - HapVi Together",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
