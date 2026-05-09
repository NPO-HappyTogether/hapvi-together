import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
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
  return (
    <html lang="ko" className={`${dmSans.variable} ${notoSansKr.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
