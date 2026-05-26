import type {Metadata} from "next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {DM_Sans, Noto_Sans_KR} from "next/font/google";
import Script from "next/script";
import {FloatingDonateTab} from "@/components/FloatingDonateTab";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {SkipLink} from "@/components/SkipLink";
import {OrganizationJsonLd} from "@/components/OrganizationJsonLd";
import {LocaleProvider} from "@/components/LocaleProvider";
import {
  ROOT_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_ORIGIN,
  SITE_OG_IMAGE,
} from "@/lib/seo";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-LV7PFSGM3E";
const isProduction = process.env.NODE_ENV === "production";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

/** 본문 한글 위주 — swap으로 FOIT 방지, preload로 초기 글리프 우선 확보 */
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-kr",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
      <head>
        <OrganizationJsonLd />
        {isProduction ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="ga-gtag-init" strategy="beforeInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
              `.trim()}
            </Script>
          </>
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <LocaleProvider>
          <SkipLink />
          <Header />
          <FloatingDonateTab />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
