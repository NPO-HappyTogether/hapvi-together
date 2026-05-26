import fallback from "@/data/resources-fallback.json";
import type {ResourceCategory, ResourceRow} from "@/lib/resources-types";
import {isResourceCategory} from "@/lib/resources-types";

const REVALIDATE_SECONDS = 3600;

function parseRow(raw: unknown): ResourceRow | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.trim() : "";
  const categoryRaw = typeof o.category === "string" ? o.category.trim().toLowerCase() : "other";
  const category: ResourceCategory = isResourceCategory(categoryRaw) ? categoryRaw : "other";
  const title_ko = typeof o.title_ko === "string" ? o.title_ko.trim() : "";
  const title_en = typeof o.title_en === "string" ? o.title_en.trim() : "";
  const title_es = typeof o.title_es === "string" ? o.title_es.trim() : "";
  const description_ko = typeof o.description_ko === "string" ? o.description_ko.trim() : "";
  const description_en = typeof o.description_en === "string" ? o.description_en.trim() : "";
  const description_es = typeof o.description_es === "string" ? o.description_es.trim() : "";
  const url = typeof o.url === "string" ? o.url.trim() : "";

  if (!id || !title_ko || !url || !url.startsWith("https://")) return null;

  return {
    id,
    category,
    title_ko,
    title_en: title_en || title_ko,
    title_es: title_es || title_ko,
    description_ko,
    description_en: description_en || description_ko,
    description_es: description_es || description_ko,
    url,
    sort_order: typeof o.sort_order === "number" ? o.sort_order : Number(o.sort_order) || 999,
    last_verified: typeof o.last_verified === "string" ? o.last_verified.trim() : undefined,
  };
}

function sortResources(rows: ResourceRow[]): ResourceRow[] {
  return [...rows].sort((a, b) => a.sort_order - b.sort_order || a.title_ko.localeCompare(b.title_ko));
}

export async function fetchResourcesFromCms(): Promise<ResourceRow[]> {
  const url = process.env.RESOURCES_CMS_URL?.trim();
  if (!url) {
    console.info("[resources-cms] RESOURCES_CMS_URL 미설정 — fallback JSON 사용");
    return sortResources((fallback.resources as unknown[]).map(parseRow).filter((r): r is ResourceRow => r !== null));
  }

  try {
    const res = await fetch(url, {
      next: {revalidate: REVALIDATE_SECONDS},
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json = (await res.json()) as {resources?: unknown[]};
    const rows = (json.resources ?? []).map(parseRow).filter((r): r is ResourceRow => r !== null);
    return sortResources(rows);
  } catch (e) {
    console.error("[resources-cms] fetch failed, using fallback", e);
    return sortResources((fallback.resources as unknown[]).map(parseRow).filter((r): r is ResourceRow => r !== null));
  }
}

export function groupResourcesByCategory(
  rows: ResourceRow[],
  categoryOrder: ResourceCategory[],
): {category: ResourceCategory; items: ResourceRow[]}[] {
  return categoryOrder
    .map((category) => ({
      category,
      items: rows.filter((r) => r.category === category),
    }))
    .filter((g) => g.items.length > 0);
}
