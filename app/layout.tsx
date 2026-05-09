import type {Metadata} from "next";
import {DM_Sans, Noto_Sans_KR} from "next/font/google";
import {FloatingDonateTab} from "@/components/FloatingDonateTab";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {LocaleProvider} from "@/components/LocaleProvider";
import {
  ROOT_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_ORIGIN,
  SITE_OG_IMAGE,
} from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-kr",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: ROOT_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_ORIGIN,
    siteName: "HapVi Together",
    title: ROOT_TITLE,
    description: SITE_DESCRIPTION,
    images: [{url: SITE_OG_IMAGE}],
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${dmSans.variable} ${notoSansKr.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <LocaleProvider>
          <Header />
          <FloatingDonateTab />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
