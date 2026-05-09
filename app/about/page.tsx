import type {Metadata} from "next";
import AboutPageClient from "./about-client";
import {buildPageMetadata} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "HapVi Together 소개 - Happy Village Together",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
