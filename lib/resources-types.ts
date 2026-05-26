export const RESOURCE_CATEGORIES = [
  "housing",
  "food",
  "health",
  "legal",
  "emergency",
  "community",
  "other",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export type ResourceRow = {
  id: string;
  category: ResourceCategory;
  title_ko: string;
  title_en: string;
  title_es: string;
  description_ko: string;
  description_en: string;
  description_es: string;
  url: string;
  sort_order: number;
  last_verified?: string;
};

export function isResourceCategory(value: string): value is ResourceCategory {
  return (RESOURCE_CATEGORIES as readonly string[]).includes(value);
}
