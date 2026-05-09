"use client";

import {useLocale} from "@/components/LocaleProvider";
import {StockPhoto} from "@/components/StockPhoto";
import {SITE_IMAGES} from "@/lib/site-images";
import {Heart, Unlock, Users} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPageClient() {
  const {messages} = useLocale();
  const t = messages.About;
  const services = messages.Services;
  const home = messages.Home;
  const alts = messages.StockPhotoAlts;
  const stock = SITE_IMAGES.stock;
  const introParagraphs = t.intro.paragraphs;
  return (
    <div className="bg-cream">
      <section className="grid min-h-[min(88vh,920px)] md:grid-cols-2">
        <div className="flex flex-col justify-center bg-hapvi-primary px-8 pb-16 pt-28 text-white md:px-14 lg:px-20 lg:pb-24 lg:pt-36">
          <h1 className="max-w-xl whitespace-pre-line text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]">
            {t.hero.title}
          </h1>
          <p className="mt-8 max-w-xl whitespace-pre-line text-lg leading-relaxed text-white/85">{t.hero.description}</p>
        </div>
        <div className="relative min-h-[260px] md:min-h-full">
          <StockPhoto
            src={stock.aboutMeeting}
            alt={alts.aboutMeeting}
            className="absolute inset-0 min-h-[260px] md:min-h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            overlayClassName="bg-gradient-to-br from-stone-900/40 via-hapvi-primary/45 to-hapvi-dark/55"
          />
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-cream">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-16 lg:py-20">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(200px,38%)] md:items-stretch md:gap-10 lg:gap-14">
            <div className="min-w-0">
              <div>
                {introParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg leading-snug text-ink-muted ${index === 1 ? "mt-2" : ""} ${index === 2 ? "mt-3" : ""} ${index === 3 ? "mt-2" : ""} ${index === 4 ? "mt-6" : ""} ${index === 5 ? "mt-2" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-10">
                <Link
                  href="/services"
                  className="text-base font-semibold text-hapvi-dark underline decoration-hapvi-primary/35 underline-offset-[6px] hover:text-hapvi-primary"
                >
                  {home.services.learnMore}
                </Link>
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
                >
                  {services.apply}
                </Link>
              </div>
            </div>
            <div className="flex min-h-[200px] items-end justify-center md:min-h-0 md:justify-end md:pb-2 lg:pb-4">
              <Image
                src={SITE_IMAGES.compass}
                alt=""
                width={520}
                height={520}
                className="h-auto w-full max-w-[220px] object-contain md:max-w-[260px] lg:max-w-[300px]"
                sizes="(max-width: 768px) 220px, 300px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[280px] md:min-h-[380px]">
          <StockPhoto
            src={stock.aboutCommunity}
            alt={alts.aboutCommunity}
            className="absolute inset-0 min-h-[280px] md:min-h-[380px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            overlayClassName="bg-gradient-to-t from-cream/90 via-hapvi-light/35 to-transparent"
          />
        </div>
        <div className="flex flex-col justify-center bg-hapvi-primary px-8 py-14 text-white md:px-14 lg:px-20 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hapvi-light">{t.mission.label}</p>
          <div className="mt-6 space-y-4 text-xl font-medium leading-relaxed md:text-[1.35rem]">
            <p>{introParagraphs[0]}</p>
            <p>{introParagraphs[1]}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <article className="rounded-xl border border-stone-100 bg-white p-8 shadow-card md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hapvi-primary">{t.mission.label}</p>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink md:text-[1.35rem]">
              {introParagraphs.slice(0, 3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
          <article className="rounded-xl border border-stone-100 bg-white p-8 shadow-card md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hapvi-primary">{t.vision.label}</p>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink md:text-[1.35rem]">
              {introParagraphs.slice(3).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        <h2 className="mt-20 text-center text-[1.65rem] font-semibold tracking-tight text-ink md:text-3xl">{t.work.title}</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Users className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t.work.accompany.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.work.accompany.description}</p>
          </article>
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Unlock className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t.work.accessibility.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t.work.accessibility.description}</p>
          </article>
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Heart className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t.work.community.title}</h3>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-muted">{t.work.community.description}</p>
          </article>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-cream-deep px-5 py-14 text-center md:px-8 md:py-16">
        <p className="text-lg font-medium leading-relaxed text-ink">{t.footerLine1}</p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{t.footerLine2}</p>
      </section>
    </div>
  );
}
