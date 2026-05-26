"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {isNavActive, switchLocalePath} from "@/lib/locale-path";
import {SITE_IMAGES} from "@/lib/site-images";
import {Menu, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

/** 홈은 로고 링크로만 제공해 동일 URL(`/`) 중복 링크를 피합니다. */
const navItems = ["/services", "/eligibility", "/resources", "/about", "/contact"] as const;

const localeOptions: {id: Locale; labelKey: "langKo" | "langEn" | "langEs"}[] = [
  {id: "ko", labelKey: "langKo"},
  {id: "en", labelKey: "langEn"},
  {id: "es", labelKey: "langEs"},
];

export function Header() {
  const {locale, setLocale, messages} = useLocale();
  const header = messages.Header;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  const heroRoutes = ["/", "/services", "/about", "/contact"];
  const transparentMode = heroRoutes.includes(pathname);

  const changeLocale = (next: Locale) => {
    const target = switchLocalePath(pathname, next);
    if (target) {
      router.push(target);
    }
    setLocale(next);
  };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const labels: Record<(typeof navItems)[number], string> = {
    "/services": header.nav.services,
    "/eligibility": header.nav.eligibility,
    "/resources": header.nav.resources,
    "/about": header.nav.about,
    "/contact": header.nav.contact,
  };

  const navHref = (path: (typeof navItems)[number]) => {
    if (path === "/eligibility") return `/${locale}/eligibility`;
    if (path === "/resources") return `/${locale}/resources`;
    return path;
  };

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
    transparentMode && !solid ? "text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" : "text-ink-subtle";

  const logoImgClass =
    "h-9 w-auto max-w-[148px] object-contain object-left md:h-11 md:max-w-[188px]";

  const logoImgOverlay =
    transparentMode && !solid ? "drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]" : "";

  const logoOnDarkBackdrop = transparentMode && !solid;
  const logoSrc = logoOnDarkBackdrop ? SITE_IMAGES.logos.white : SITE_IMAGES.logos.primary;

  const mobileToggleClass =
    transparentMode && !solid ? "text-white hover:bg-white/10" : "text-ink-muted hover:bg-white hover:text-hapvi-dark";

  const mobilePanelClass =
    transparentMode && !solid ? "border-white/10 bg-hapvi-dark text-white" : "border-stone-200/80 bg-cream";

  const mobileNavLinkClass =
    transparentMode && !solid ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-ink-muted hover:bg-white hover:text-hapvi-dark";

  const langBtnClass =
    transparentMode && !solid
      ? "border-white/35 text-white/90 hover:border-white/55 hover:bg-white/10 hover:text-white"
      : "border-stone-200 text-ink-muted hover:border-hapvi-primary/35 hover:text-hapvi-dark";

  const alternateLocaleButtons = localeOptions.filter((opt) => opt.id !== locale);

  const navActiveClass = (active: boolean) => {
    if (!active) return "";
    if (transparentMode && !solid) return "font-semibold text-white";
    return "font-semibold text-hapvi-primary";
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${glass}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 md:gap-4"
          aria-label={`HapVi Together — ${header.nav.home}`}
        >
          <Image
            key={logoSrc}
            src={logoSrc}
            alt=""
            width={logoOnDarkBackdrop ? 503 : 288}
            height={logoOnDarkBackdrop ? 503 : 288}
            sizes={logoOnDarkBackdrop ? "(max-width: 768px) 36px, 44px" : "(max-width: 768px) 148px, 188px"}
            priority
            fetchPriority="high"
            aria-hidden
            className={
              logoOnDarkBackdrop
                ? `h-9 w-9 shrink-0 object-contain object-left md:h-11 md:w-11 ${logoImgOverlay}`
                : `${logoImgClass} ${logoImgOverlay}`
            }
          />
          <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
            <span className={`${logoMainClass} block`} aria-hidden="true">
              HapVi Together
            </span>
            <span
              className={`block text-[0.65rem] font-medium uppercase tracking-[0.16em] md:text-xs md:tracking-[0.18em] ${logoSubClass}`}
              aria-hidden="true"
            >
              {header.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-10" aria-label={header.nav.home}>
            {navItems.map((href) => {
              const active = isNavActive(pathname, href, locale);
              return (
                <Link
                  key={href}
                  href={navHref(href)}
                  className={`text-[0.9375rem] font-medium transition ${navLinkClass} ${navActiveClass(active)}`}
                  aria-current={active ? "page" : undefined}
                >
                  {labels[href]}
                </Link>
              );
            })}
          </nav>
          <div
            className={`flex items-center gap-1 border-l pl-8 opacity-95 ${
              transparentMode && !solid ? "border-white/25" : "border-stone-200/90"
            }`}
            role="group"
            aria-label={header.langSwitcherLabel}
          >
            {alternateLocaleButtons.map(({id, labelKey}) => (
              <button
                key={id}
                type="button"
                onClick={() => changeLocale(id)}
                className={`inline-flex h-8 w-[7.5rem] shrink-0 items-center justify-center rounded-md border text-center text-[0.72rem] font-semibold leading-none transition ${langBtnClass}`}
              >
                {header[labelKey]}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${mobileToggleClass}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? header.menuClose : header.menuOpen}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
        >
          {isOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-nav-panel" className={`border-t px-5 py-5 md:hidden ${mobilePanelClass}`}>
          <nav className="flex flex-col gap-1" aria-label={header.nav.home}>
            {navItems.map((href) => {
              const active = isNavActive(pathname, href, locale);
              return (
                <Link
                  key={href}
                  href={navHref(href)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${mobileNavLinkClass} ${active ? "bg-white/15 font-semibold text-white" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {labels[href]}
                </Link>
              );
            })}
          </nav>
          <div
            className={`mt-5 flex flex-wrap gap-2 border-t pt-5 ${transparentMode && !solid ? "border-white/15" : "border-stone-200/80"}`}
            role="group"
            aria-label={header.langSwitcherLabel}
          >
            {alternateLocaleButtons.map(({id, labelKey}) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  changeLocale(id);
                  setIsOpen(false);
                }}
                className={`inline-flex h-10 w-[7.5rem] shrink-0 items-center justify-center rounded-md border text-center text-xs font-semibold leading-none transition ${langBtnClass}`}
              >
                {header[labelKey]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
