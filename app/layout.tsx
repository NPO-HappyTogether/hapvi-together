import type {Metadata} from "next";
import {DM_Sans, Noto_Sans_KR} from "next/font/google";
import {FloatingDonateTab} from "@/components/FloatingDonateTab";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import ko from "@/messages/ko.json";
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
  title: "HapVi Together",
  description: "For a Better Village",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const donate = ko.FloatingDonate;

  return (
    <html lang="ko" className={`${dmSans.variable} ${notoSansKr.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <FloatingDonateTab label={donate.label} ariaLabel={donate.ariaLabel} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
