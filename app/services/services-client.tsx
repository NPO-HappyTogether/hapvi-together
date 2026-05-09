"use client";

import {useLocale} from "@/components/LocaleProvider";
import {StockPhoto} from "@/components/StockPhoto";
import {SITE_IMAGES} from "@/lib/site-images";
import {CheckCircle2, Circle} from "lucide-react";
import Link from "next/link";

export default function ServicesPageClient() {
  const {messages} = useLocale();
  const t = messages.Services;
  const alts = messages.StockPhotoAlts;
  const stock = SITE_IMAGES.stock;
  return (
    <div className="bg-hapvi-light">
      <section className="grid min-h-[min(560px,88vh)] md:grid-cols-2">
        <div className="flex flex-col justify-center bg-hapvi-primary px-8 pb-14 pt-28 text-white md:px-14 lg:px-20 lg:pb-20 lg:pt-36">
          <h1 className="max-w-xl whitespace-pre-line text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]">
            {t.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-snug text-white/88">{t.hero.descriptionLine1}</p>
          <p className="mt-1.5 max-w-xl text-lg leading-snug text-white/88">{t.hero.descriptionLine2}</p>
        </div>
        <div className="relative min-h-[220px] md:min-h-full">
          <StockPhoto
            src={stock.servicesCity}
            alt={alts.servicesCity}
            className="absolute inset-0 min-h-[220px] md:min-h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            overlayClassName="bg-gradient-to-br from-stone-900/45 via-hapvi-primary/40 to-hapvi-dark/55"
          />
        </div>
      </section>

      <div className="bg-hapvi-dark px-5 py-3.5 text-white md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm">
          <span className="font-semibold tracking-tight">{t.hero.titleInline}</span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85" aria-label={t.hero.titleInline}>
            <a
              href="#service-01"
              className="rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-hapvi-dark"
            >
              {t.service1.badge}
            </a>
            <span className="hidden text-white/40 sm:inline" aria-hidden>
              ·
            </span>
            <a
              href="#service-02"
              className="rounded transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-hapvi-dark"
            >
              {t.service2.badge}
            </a>
          </nav>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl space-y-10 px-5 py-14 md:space-y-12 md:px-8 md:py-20">
        <article
          id="service-01"
          className="scroll-mt-28 overflow-hidden rounded-xl bg-white shadow-card md:grid md:grid-cols-2 md:rounded-2xl"
        >
          <div className="relative min-h-[240px] md:min-h-full">
            <StockPhoto
              src={stock.housingKeys}
              alt={alts.housingKeys}
              className="absolute inset-0 min-h-[240px] md:min-h-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              overlayClassName="bg-gradient-to-t from-hapvi-dark/45 to-hapvi-primary/25"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <span className="inline-flex w-fit rounded border border-hapvi-primary/25 bg-hapvi-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-hapvi-dark">
              {t.service1.badge}
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.service1.title}</h2>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-ink-muted md:text-lg">{t.service1.description}</p>

            <p className="mt-8 text-sm font-semibold text-hapvi-primary">{t.service1.forWhoTitle}</p>
            <ul className="mt-4 space-y-3 text-ink-muted">
              {t.service1.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-hapvi-primary" strokeWidth={2} />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-10 inline-flex w-fit rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
            >
              {t.apply}
            </Link>
          </div>
        </article>

        <article
          id="service-02"
          className="scroll-mt-28 overflow-hidden rounded-xl bg-white shadow-card md:grid md:grid-cols-2 md:rounded-2xl"
        >
          <div className="relative min-h-[240px] md:order-1 md:min-h-full">
            <StockPhoto
              src={stock.benefitsDesk}
              alt={alts.benefitsDesk}
              className="absolute inset-0 min-h-[240px] md:min-h-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              overlayClassName="bg-gradient-to-t from-hapvi-dark/40 to-stone-700/20"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:order-2 md:p-10 lg:p-12">
            <span className="inline-flex w-fit rounded border border-hapvi-primary/25 bg-hapvi-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-hapvi-dark">
              {t.service2.badge}
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.service2.title}</h2>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-ink-muted md:text-lg">{t.service2.description}</p>

            <p className="mt-8 text-sm font-semibold text-hapvi-primary">{t.service2.programsTitle}</p>
            <ul className="mt-4 space-y-3 text-ink">
              {t.service2.programs.map((program) => (
                <li key={program} className="flex items-start gap-3 font-medium">
                  <Circle className="mt-1.5 h-2 w-2 shrink-0 fill-hapvi-primary text-hapvi-primary" />
                  <span className="leading-relaxed">{program}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-10 inline-flex w-fit rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
            >
              {t.apply}
            </Link>
          </div>
        </article>
      </section>

      <section
        id="online-platform"
        className="scroll-mt-28 border-t border-stone-200/80 bg-cream-muted px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-hapvi-primary/10 bg-white p-8 text-center shadow-soft md:p-10">
          <span className="inline-flex rounded-md border border-hapvi-primary/20 bg-hapvi-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-hapvi-dark">
            {t.comingSoon.badge}
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink md:text-2xl">{t.comingSoon.title}</h2>
          <p className="mx-auto mt-5 max-w-lg whitespace-pre-line text-base leading-relaxed text-ink-muted md:text-lg">
            {t.comingSoon.description}
          </p>

          <a
            href="#online-platform"
            className="mt-8 inline-flex justify-center rounded-lg border border-hapvi-primary bg-white px-6 py-3 text-sm font-semibold text-hapvi-primary shadow-sm transition hover:bg-hapvi-light focus:outline-none focus-visible:ring-2 focus-visible:ring-hapvi-primary/40 focus-visible:ring-offset-2"
          >
            {t.comingSoon.button}
          </a>
        </div>
      </section>
    </div>
  );
}
