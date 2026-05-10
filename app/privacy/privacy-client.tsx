"use client";

import {useLocale} from "@/components/LocaleProvider";

const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";
const GA_OPT_OUT_URL = "https://tools.google.com/dlpage/gaoptout";

export default function PrivacyPageClient() {
  const {messages} = useLocale();
  const t = messages.Privacy;

  return (
    <div className="bg-cream">
      <article className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-hapvi-dark md:text-4xl">{t.title}</h1>
        <p className="mt-6 leading-relaxed text-ink-muted">{t.intro}</p>

        <Section title={t.s1Title} items={t.s1Items} />
        <Section title={t.s2Title} items={t.s2Items} />
        <Section title={t.s3Title} items={t.s3Items} />
        <Section title={t.s4Title} items={t.s4Items} />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-hapvi-dark">{t.s5Title}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.s5Lead}</p>
          <p className="mt-4 font-medium text-ink">{t.s5DataLabel}</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-ink-muted">
            {t.s5DataItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.s5LinksIntro}</p>
          <ul className="mt-3 space-y-2 text-ink-muted">
            <li>
              <a
                href={GOOGLE_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-hapvi-dark underline decoration-hapvi-primary/40 underline-offset-[5px] hover:text-hapvi-primary"
              >
                {t.s5LinkGooglePrivacyLabel}
              </a>
              <span className="text-ink-subtle"> — {GOOGLE_PRIVACY_URL}</span>
            </li>
            <li>
              <a
                href={GA_OPT_OUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-hapvi-dark underline decoration-hapvi-primary/40 underline-offset-[5px] hover:text-hapvi-primary"
              >
                {t.s5LinkGaOptOutLabel}
              </a>
              <span className="text-ink-subtle"> — {GA_OPT_OUT_URL}</span>
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.s5CookieNote}</p>
        </section>

        <Section title={t.s6Title} items={t.s6Items} />
        <Section title={t.s7Title} items={t.s7Items} />
        <Section title={t.s8Title} items={t.s8Items} />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-hapvi-dark">{t.s9Title}</h2>
          {t.s9Paragraphs.map((p, i) => (
            <p key={i} className={`leading-relaxed text-ink-muted ${i === 0 ? "mt-4" : "mt-3"}`}>
              {p}
            </p>
          ))}
        </section>

        <p className="mt-12 border-t border-stone-200 pt-8 text-sm text-ink-subtle">
          <span className="font-medium text-ink-muted">{t.lastUpdatedLabel}</span> {t.lastUpdated}
        </p>
      </article>
    </div>
  );
}

function Section({title, items}: {title: string; items: string[]}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-hapvi-dark">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
