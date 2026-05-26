import type {MetadataRoute} from "next";
import {LOCALES} from "@/lib/i18n";
import {SITE_ORIGIN} from "@/lib/seo";

const STATIC_PATHS = [
  {path: "", priority: 1, changeFrequency: "weekly" as const},
  {path: "/services", priority: 0.9, changeFrequency: "weekly" as const},
  {path: "/contact", priority: 0.9, changeFrequency: "monthly" as const},
  {path: "/about", priority: 0.8, changeFrequency: "monthly" as const},
  {path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const},
  {path: "/eligibility", priority: 0.85, changeFrequency: "weekly" as const},
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map(({path, priority, changeFrequency}) => ({
    url: path ? `${SITE_ORIGIN}${path}` : SITE_ORIGIN,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_ORIGIN}/${locale}/eligibility`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
    entries.push({
      url: `${SITE_ORIGIN}/${locale}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
