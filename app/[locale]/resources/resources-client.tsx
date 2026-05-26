"use client";

import type {Locale} from "@/lib/i18n";
import type {ResourceCategory, ResourceItem} from "@/lib/resources";
import {RESOURCE_CATEGORIES} from "@/lib/resources";
import {ExternalLink} from "lucide-react";
import Link from "next/link";
import {useMemo, useState} from "react";

type Filter = "all" | ResourceCategory;

const BADGE_CLASS: Record<ResourceCategory, string> = {
  housing: "bg-blue-100 text-blue-800",
  food: "bg-green-100 text-green-800",
  health: "bg-red-100 text-red-800",
  utility: "bg-yellow-100 text-yellow-900",
  emergency: "bg-orange-100 text-orange-800",
};

function localizedName(item: ResourceItem, locale: Locale): string {
  if (locale === "en") return item.name_en;
  if (locale === "es") return item.name_es;
  return item.name_ko;
}

function localizedDesc(item: ResourceItem, locale: Locale): string {
  if (locale === "en") return item.desc_en;
  if (locale === "es") return item.desc_es;
  return item.desc_ko;
}

type ResourcesCopy = {
  title: string;
  filterAll: string;
  categories: Record<ResourceCategory, string>;
  visitOfficial: string;
  empty: string;
  unknownResource: string;
  contactCta: string;
};

export default function ResourcesPageClient({
  locale,
  items,
  copy,
}: {
  locale: Locale;
  items: ResourceItem[];
  copy: ResourcesCopy;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const tabs: {id: Filter; label: string}[] = [
    {id: "all", label: copy.filterAll},
    ...RESOURCE_CATEGORIES.map((id) => ({id, label: copy.categories[id]})),
  ];

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-hapvi-primary px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-4xl text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl lg:text-4xl">
            {copy.title}
          </h1>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div
            className="-mt-6 flex flex-wrap gap-2 rounded-xl border border-stone-200 bg-white p-3 shadow-soft md:-mt-8 md:gap-2.5 md:p-4"
            role="tablist"
            aria-label={copy.filterAll}
          >
            {tabs.map((tab) => {
              const selected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-hapvi-primary focus-visible:ring-offset-2 ${
                    selected
                      ? "bg-hapvi-primary text-white"
                      : "bg-stone-100 text-ink-muted hover:bg-stone-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-8 rounded-xl border border-stone-200 bg-white p-10 text-center text-ink-muted">{copy.empty}</p>
          ) : (
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-soft transition hover:border-hapvi-primary/40"
                >
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_CLASS[item.category]}`}
                  >
                    {copy.categories[item.category]}
                  </span>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-ink">{localizedName(item, locale)}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{localizedDesc(item, locale)}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#5D1818] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hapvi-dark"
                  >
                    {copy.visitOfficial}
                    <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 rounded-2xl border border-hapvi-primary/15 bg-hapvi-light px-6 py-8 text-center md:px-10">
            <p className="text-base leading-relaxed text-ink md:text-lg">{copy.unknownResource}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-md bg-[#5D1818] px-8 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-hapvi-dark"
            >
              {copy.contactCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
