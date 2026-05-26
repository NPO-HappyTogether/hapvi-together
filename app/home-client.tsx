"use client";

import {useLocale} from "@/components/LocaleProvider";
import {StockPhoto} from "@/components/StockPhoto";
import {SITE_IMAGES} from "@/lib/site-images";
import {ChevronDown, FileText, HandHeart, Home as HomeIcon} from "lucide-react";
import Link from "next/link";

export default function HomePageClient() {
  const {messages, locale} = useLocale();
  const h = messages.Home;
  const alts = messages.StockPhotoAlts;
  const stock = SITE_IMAGES.stock;
  const marqueeChunk = (
    <>
      <span className="mx-6 inline-block">{h.quote}</span>
      <span className="text-hapvi-primary" aria-hidden>
        ·
      </span>
      <span className="mx-6 inline-block">{h.problem.highlight}</span>
      <span className="text-hapvi-primary" aria-hidden>
        ·
      </span>
    </>
  );

  return (
    <div className="bg-cream">
      <section
        className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-hapvi-dark"
        style={{
          backgroundImage: `url(${stock.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <StockPhoto
          src={stock.hero}
          alt={alts.homeHero}
          className="absolute inset-0 z-0 min-h-full bg-hapvi-dark"
          priority
          sizes="100vw"
          overlayClassName="bg-gradient-to-br from-black/70 via-[#3d0a0a]/82 to-[#5d1818]/88"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 80% 60%, rgba(245,232,232,0.25), transparent 40%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 pb-12 pt-32 text-center md:px-8 md:pt-36">
          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[3.35rem]">
            {h.hero.titleLine1}
            <br />
            <span className="text-hapvi-light">{h.hero.titleLine2}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{h.hero.description}</p>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-md bg-white px-8 py-3.5 text-center text-base font-semibold text-hapvi-dark shadow-lg shadow-black/10 transition hover:bg-hapvi-light sm:w-auto"
            >
              <span id="home-primary-contact-cta">{h.hero.ctaPrimary}</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-md border-2 border-white bg-hapvi-dark/90 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-black/25 backdrop-blur-sm transition hover:bg-hapvi-primary hover:border-white sm:w-auto"
            >
              <span id="home-primary-services-cta">{h.hero.ctaSecondary}</span>
            </Link>
          </div>
          <a
            href="#mission"
            aria-label={h.finalCta.title}
            className="mt-14 inline-flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
          >
            <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={2} aria-hidden />
          </a>
        </div>

        <div className="relative z-10 border-t border-white/15 bg-hapvi-light">
          <div className="overflow-hidden py-3">
            <div className="flex w-max animate-marquee items-center font-medium uppercase tracking-[0.12em] text-hapvi-dark">
              <div className="flex shrink-0 items-center whitespace-nowrap px-4 text-[0.7rem] md:text-xs">{marqueeChunk}</div>
              <div className="flex shrink-0 items-center whitespace-nowrap px-4 text-[0.7rem] md:text-xs" aria-hidden>
                {marqueeChunk}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="grid min-h-[520px] md:grid-cols-2">
        <div className="relative min-h-[280px] md:min-h-full">
          <StockPhoto
            src={stock.missionSupport}
            alt={alts.homeMissionSupport}
            className="absolute inset-0 min-h-[280px] md:min-h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            overlayClassName="bg-gradient-to-br from-hapvi-primary/45 to-hapvi-dark/60"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_55%)]"
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center bg-white px-8 py-16 md:px-14 lg:px-20 lg:py-24">
          <h2 className="text-3xl font-semibold leading-snug tracking-tight text-ink md:text-[2.15rem]">
            {h.problem.titleLine1}
            <br />
            {h.problem.titleLine2}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">{h.problem.description}</p>
          <h3 className="mt-6 text-lg font-semibold leading-relaxed text-hapvi-primary">{h.problem.highlight}</h3>
          <p className="mt-8">
            <Link
              href="/about"
              className="text-base font-semibold text-hapvi-dark underline decoration-hapvi-primary/40 underline-offset-4 hover:text-hapvi-primary"
            >
              {h.services.learnMore}
            </Link>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-md border-2 border-hapvi-dark bg-transparent px-6 py-3 text-sm font-semibold text-hapvi-dark transition hover:bg-hapvi-dark hover:text-white"
              aria-labelledby="home-primary-contact-cta"
            >
              <span aria-hidden="true">{h.hero.ctaPrimary}</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-md bg-hapvi-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-hapvi-primary"
              aria-labelledby="home-primary-services-cta"
            >
              <span aria-hidden="true">{h.hero.ctaSecondary}</span>
            </Link>
            <Link
              href={`/${locale}/eligibility`}
              className="inline-flex rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-hapvi-dark"
            >
              {h.hero.eligibilityCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-hapvi-light px-8 py-16 md:px-14 md:py-24 lg:px-20">
          <blockquote className="font-serif text-2xl font-normal leading-snug tracking-tight text-ink md:text-[1.85rem] md:leading-snug">
            &ldquo;{h.quote}&rdquo;
          </blockquote>
        </div>
        <div className="relative min-h-[320px] md:min-h-[420px]">
          <StockPhoto
            src={stock.testimonialGroup}
            alt={alts.homeTestimonialGroup}
            className="absolute inset-0 min-h-[320px] md:min-h-[420px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            overlayClassName="bg-gradient-to-br from-hapvi-dark/65 via-hapvi-primary/55 to-[#6b2a2a]/70"
          />
        </div>
      </section>

      <section className="bg-hapvi-primary px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">{h.services.title}</h2>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            <article className="flex flex-col items-start">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/5">
                <HomeIcon className="h-7 w-7 text-hapvi-light" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{h.services.housing.title}</h3>
              <p className="mt-4 leading-relaxed text-white/85">{h.services.housing.description}</p>
              <Link
                href="/services"
                className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-hapvi-light hover:text-white"
                aria-label={h.services.housing.learnMoreAriaLabel}
              >
                {h.services.learnMore}
              </Link>
            </article>
            <article className="flex flex-col items-start">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/5">
                <FileText className="h-7 w-7 text-hapvi-light" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{h.services.benefits.title}</h3>
              <p className="mt-4 leading-relaxed text-white/85">{h.services.benefits.description}</p>
              <Link
                href="/services"
                className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-hapvi-light hover:text-white"
                aria-label={h.services.benefits.learnMoreAriaLabel}
              >
                {h.services.learnMore}
              </Link>
            </article>
            <article className="flex flex-col items-start">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/5">
                <HandHeart className="h-7 w-7 text-hapvi-light" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{h.services.community.title}</h3>
              <p className="mt-4 leading-relaxed text-white/85">{h.services.community.description}</p>
              <Link
                href="/services"
                className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-hapvi-light hover:text-white"
                aria-label={h.services.community.learnMoreAriaLabel}
              >
                {h.services.learnMore}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-cream px-5 py-24 md:px-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-stone-100 bg-white px-8 py-14 text-center shadow-card md:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{h.finalCta.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{h.finalCta.description}</p>
          <h3 className="mt-4 text-sm font-semibold text-hapvi-primary">{h.finalCta.free}</h3>
          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-lg bg-hapvi-primary px-8 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
            aria-labelledby="home-primary-contact-cta"
          >
            <span aria-hidden="true">{h.finalCta.button}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
