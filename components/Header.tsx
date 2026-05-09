"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const navItems = ["/", "/services", "/about", "/contact"] as const;
const languageLabels = {
  ko: "한국어",
  en: "English",
  es: "Español",
} as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const labels: Record<(typeof navItems)[number], string> = {
    "/": t("nav.home"),
    "/services": t("nav.services"),
    "/about": t("nav.about"),
    "/contact": t("nav.contact"),
  };
  const switchLocales = (["ko", "en", "es"] as const).filter((value) => value !== locale);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold text-hapvi-dark">HapVi Together</span>
          <span className="text-xs text-gray-600">{t("tagline")}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((href) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 transition hover:text-hapvi-primary"
            >
              {labels[href]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {switchLocales.map((switchLocale) => (
            <button
              key={switchLocale}
              type="button"
              className="rounded-full bg-[#E6F1FB] px-3 py-1.5 text-sm font-medium text-[#185FA5]"
              onClick={() => router.replace(pathname, { locale: switchLocale })}
            >
              {languageLabels[switchLocale]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="mb-4 flex flex-col gap-3">
            {navItems.map((href) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {labels[href]}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            {switchLocales.map((switchLocale) => (
              <button
                key={switchLocale}
                type="button"
                className="rounded-full bg-[#E6F1FB] px-3 py-1.5 text-sm font-medium text-[#185FA5]"
                onClick={() => {
                  setIsOpen(false);
                  router.replace(pathname, { locale: switchLocale });
                }}
              >
                {languageLabels[switchLocale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
