import {FloatingDonateTab} from "@/components/FloatingDonateTab";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {routing} from "@/i18n/routing";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const tDonate = await getTranslations({locale, namespace: "FloatingDonate"});

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <FloatingDonateTab label={tDonate("label")} ariaLabel={tDonate("ariaLabel")} />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
