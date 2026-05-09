import type {Metadata} from "next";
import HomePageClient from "./home-client";
import {buildPageMetadata} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "미국 주거 지원, 한국어로 함께합니다 | HapVi Together",
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
