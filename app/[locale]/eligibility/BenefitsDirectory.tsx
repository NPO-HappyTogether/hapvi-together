"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {ExternalLink} from "lucide-react";
import Link from "next/link";
import {useEffect} from "react";

export default function BenefitsDirectory({locale: urlLocale}: {locale: Locale}) {
  const {messages, setLocale} = useLocale();
  const t = messages.Eligibility;

  useEffect(() => {
    setLocale(urlLocale);
  }, [urlLocale, setLocale]);

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-hapvi-primary px-5 pb-12 pt-28 md:px-8 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{t.intro}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto -mt-8 max-w-5xl">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.benefitCards.map((card) => (
              <li
                key={card.title}
                className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-soft transition hover:border-hapvi-primary"
              >
                <span className="text-3xl" aria-hidden>
                  {card.icon}
                </span>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-ink">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{card.description}</p>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-hapvi-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hapvi-dark"
                >
                  {t.officialSiteCta}
                  <ExternalLink className="h-4 w-4" strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl border border-hapvi-primary/15 bg-hapvi-light px-6 py-10 text-center md:px-10">
            <p className="text-base leading-relaxed text-ink md:text-lg">{t.consult.text}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-md bg-hapvi-primary px-8 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
            >
              {t.consult.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
