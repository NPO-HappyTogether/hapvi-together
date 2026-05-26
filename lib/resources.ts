export type ResourceCategory = "housing" | "food" | "health" | "utility" | "emergency";

export type ResourceItem = {
  id: string;
  category: ResourceCategory;
  name_ko: string;
  name_en: string;
  name_es: string;
  desc_ko: string;
  desc_en: string;
  desc_es: string;
  url: string;
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = ["housing", "food", "health", "utility", "emergency"];

const REVALIDATE_SECONDS = 3600;

const CATEGORY_SET = new Set<string>(RESOURCE_CATEGORIES);

function isResourceCategory(value: string): value is ResourceCategory {
  return CATEGORY_SET.has(value);
}

function parseRow(raw: unknown): ResourceItem | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.trim() : String(o.id ?? "").trim();
  const categoryRaw = typeof o.category === "string" ? o.category.trim().toLowerCase() : "";
  if (!id || !isResourceCategory(categoryRaw)) return null;

  const name_ko = typeof o.name_ko === "string" ? o.name_ko.trim() : "";
  const name_en = typeof o.name_en === "string" ? o.name_en.trim() : "";
  const name_es = typeof o.name_es === "string" ? o.name_es.trim() : "";
  const desc_ko = typeof o.desc_ko === "string" ? o.desc_ko.trim() : "";
  const desc_en = typeof o.desc_en === "string" ? o.desc_en.trim() : "";
  const desc_es = typeof o.desc_es === "string" ? o.desc_es.trim() : "";
  const url = typeof o.url === "string" ? o.url.trim() : "";

  if (!name_ko || !url || !/^https?:\/\//i.test(url)) return null;

  return {
    id,
    category: categoryRaw,
    name_ko,
    name_en: name_en || name_ko,
    name_es: name_es || name_ko,
    desc_ko,
    desc_en: desc_en || desc_ko,
    desc_es: desc_es || desc_ko,
    url,
  };
}

function resourcesWebhookUrl(): string | null {
  // Same Apps Script as contact CRM when only GOOGLE_SHEETS_WEBHOOK_URL is set (local/Vercel).
  const base = (process.env.RESOURCES_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").trim();
  if (!base) return null;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}type=resources`;
}

/** Google Sheets CMS (Apps Script GET `?type=resources`). Errors → `[]`. */
export async function fetchResources(): Promise<ResourceItem[]> {
  const url = resourcesWebhookUrl();
  if (!url) {
    console.info("[resources] RESOURCES_WEBHOOK_URL not set");
    return [];
  }

  try {
    const res = await fetch(url, {
      next: {revalidate: REVALIDATE_SECONDS},
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json = (await res.json()) as {data?: unknown[]};
    return (json.data ?? []).map(parseRow).filter((r): r is ResourceItem => r !== null);
  } catch (e) {
    console.error("[resources] fetch failed", e);
    return [];
  }
}
