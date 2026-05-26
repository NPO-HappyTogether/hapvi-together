import type {Locale} from "@/lib/i18n";
import {getMessages} from "@/lib/i18n";
import {fetchResourcesFromCms, groupResourcesByCategory} from "@/lib/resources-cms";
import {RESOURCE_CATEGORIES, type ResourceCategory, type ResourceRow} from "@/lib/resources-types";
import {ExternalLink} from "lucide-react";
import Link from "next/link";

function localized(row: ResourceRow, locale: Locale, field: "title" | "description"): string {
  if (field === "title") {
    if (locale === "en") return row.title_en;
    if (locale === "es") return row.title_es;
    return row.title_ko;
  }
  if (locale === "en") return row.description_en;
  if (locale === "es") return row.description_es;
  return row.description_ko;
}

export default async function ResourcesDirectoryView({locale}: {locale: Locale}) {
  const t = getMessages(locale).Resources;
  const rows = await fetchResourcesFromCms();
  const grouped = groupResourcesByCategory(rows, [...RESOURCE_CATEGORIES]);
  const categoryLabels = t.categories as Record<ResourceCategory, string>;

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-hapvi-primary px-5 pb-12 pt-28 md:px-8 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{t.intro}</p>
          <p className="mt-3 text-sm text-white/70">{t.lastVerifiedNote}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto -mt-8 max-w-5xl space-y-12">
          {grouped.length === 0 ? (
            <p className="rounded-xl border border-stone-200 bg-white p-8 text-center text-ink-muted">{t.empty}</p>
          ) : (
            grouped.map(({category, items}) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-ink md:text-2xl">{categoryLabels[category]}</h2>
                <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {items.map((row) => (
                    <li
                      key={row.id}
                      className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-soft transition hover:border-hapvi-primary"
                    >
                      <h3 className="text-lg font-semibold leading-snug text-ink">{localized(row, locale, "title")}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                        {localized(row, locale, "description")}
                      </p>
                      {row.last_verified ? (
                        <p className="mt-2 text-xs text-ink-subtle">
                          {t.cardVerified}: {row.last_verified}
                        </p>
                      ) : null}
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-hapvi-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hapvi-dark"
                      >
                        {t.officialSiteCta}
                        <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          <div className="rounded-2xl border border-hapvi-primary/15 bg-hapvi-light px-6 py-10 text-center md:px-10">
            <p className="text-base leading-relaxed text-ink md:text-lg">{t.consult.text}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex rounded-md bg-hapvi-primary px-8 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
              >
                {t.consult.cta}
              </Link>
              <Link
                href={`/${locale}/eligibility`}
                className="inline-flex rounded-md border-2 border-hapvi-primary bg-white px-8 py-3.5 text-base font-semibold text-hapvi-primary transition hover:bg-hapvi-light"
              >
                {t.consult.eligibilityCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
