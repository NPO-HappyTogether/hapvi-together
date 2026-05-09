import type {Metadata} from "next";
import dynamic from "next/dynamic";
import {buildPageMetadata} from "@/lib/seo";

const AboutPageClient = dynamic(() => import("./about-client"), {ssr: true});

export const metadata: Metadata = buildPageMetadata({
  title: "HapVi Together 소개 - Happy Village Together",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
