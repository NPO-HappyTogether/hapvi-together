"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [solid, setSolid] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const heroRoutes = ["/", "/services", "/about", "/contact"];
  const transparentMode = heroRoutes.includes(pathname);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const labels: Record<(typeof navItems)[number], string> = {
    "/": t("nav.home"),
    "/services": t("nav.services"),
    "/about": t("nav.about"),
    "/contact": t("nav.contact"),
  };
  const switchLocales = (["ko", "en", "es"] as const).filter((value) => value !== locale);

  const glass =
    transparentMode && !solid
      ? "border-transparent bg-transparent text-white"
      : "border-stone-200/80 bg-cream/95 text-ink-muted backdrop-blur-md shadow-sm";

  const navLinkClass =
    transparentMode && !solid
      ? "text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.88)] hover:text-white"
      : "text-ink-muted hover:text-hapvi-primary";

  const logoMainClass =
    transparentMode && !solid
      ? "text-[1.05rem] font-semibold tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] transition group-hover:text-hapvi-light md:text-lg"
      : "text-[1.05rem] font-semibold tracking-tight text-hapvi-dark transition group-hover:text-hapvi-primary md:text-lg";

  const logoSubClass =
    transparentMode && !solid
      ? "text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
      : "text-ink-subtle";

  const logoImgClass =
    "h-9 w-auto max-w-[148px] object-contain object-left md:h-11 md:max-w-[188px]";

  const logoImgOverlay =
    transparentMode && !solid ? "drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]" : "";

  /** 어두운 배경(히어로 위 투명 헤더)에서는 밝은 로고, 크림/밝은 바에서는 기존 버건디 마크 */
  const logoOnDarkBackdrop = transparentMode && !solid;
  const logoSrc = logoOnDarkBackdrop ? "/img/Logo%20White.png" : "/img/hapvi-logo.png";

  const langBtnClass =
    transparentMode && !solid
      ? "border border-white/75 bg-[#3d0a0a]/72 text-white shadow-md backdrop-blur-sm hover:bg-[#3d0a0a]/88"
      : "border-stone-200/90 bg-white text-hapvi-dark hover:bg-hapvi-light hover:border-hapvi-primary/25";

  const mobileToggleClass =
    transparentMode && !solid ? "text-white hover:bg-white/10" : "text-ink-muted hover:bg-white hover:text-hapvi-dark";

  const mobilePanelClass =
    transparentMode && !solid ? "border-white/10 bg-hapvi-dark text-white" : "border-stone-200/80 bg-cream";

  const mobileNavLinkClass =
    transparentMode && !solid ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-ink-muted hover:bg-white hover:text-hapvi-dark";

  const mobileLangBtnClass =
    transparentMode && !solid
      ? "border border-white/75 bg-[#3d0a0a]/72 text-white shadow-md backdrop-blur-sm hover:bg-[#3d0a0a]/88"
      : "border-stone-200/90 bg-white text-hapvi-dark hover:bg-hapvi-light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${glass}`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3 md:gap-4">
          <Image
            key={logoSrc}
            src={logoSrc}
            alt=""
            width={logoOnDarkBackdrop ? 503 : 288}
            height={logoOnDarkBackdrop ? 503 : 288}
            priority
            aria-hidden
            className={
              logoOnDarkBackdrop
                ? `h-9 w-9 shrink-0 object-contain object-left md:h-11 md:w-11 ${logoImgOverlay}`
                : `${logoImgClass} ${logoImgOverlay}`
            }
          />
          <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
            <span className={logoMainClass}>HapVi Together</span>
            <span className={`text-[0.65rem] font-medium uppercase tracking-[0.16em] md:text-xs md:tracking-[0.18em] ${logoSubClass}`}>
              {t("tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((href) => (
            <Link key={href} href={href} className={`text-[0.9375rem] font-medium transition ${navLinkClass}`}>
              {labels[href]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {switchLocales.map((switchLocale) => (
            <button
              key={switchLocale}
              type="button"
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold tracking-wide shadow-sm transition ${langBtnClass}`}
              onClick={() => router.replace(pathname, { locale: switchLocale })}
            >
              {languageLabels[switchLocale]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${mobileToggleClass}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {isOpen && (
        <div className={`border-t px-5 py-5 md:hidden ${mobilePanelClass}`}>
          <nav className="mb-5 flex flex-col gap-1">
            {navItems.map((href) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${mobileNavLinkClass}`}
                onClick={() => setIsOpen(false)}
              >
                {labels[href]}
              </Link>
            ))}
          </nav>
          <div className={`flex flex-wrap gap-2 border-t pt-4 ${transparentMode && !solid ? "border-white/15" : "border-stone-200/60"}`}>
            {switchLocales.map((switchLocale) => (
              <button
                key={switchLocale}
                type="button"
                className={`rounded-md border px-3 py-2 text-xs font-semibold shadow-sm transition ${mobileLangBtnClass}`}
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
