/** 시트·환영 메일 등 연락 후속 처리용 언어 구분 */
export type ContactMessageLanguage = "Korean" | "English" | "Spanish" | "Other";

/**
 * 폼/API에서 넘긴 locale → 후속 로직용 언어.
 * ko/en/es 만 인정, 그 외·누락 → Other (환영 메일은 영어 흐름).
 */
export function localeToContactMessageLanguage(locale: unknown): ContactMessageLanguage {
  const raw = typeof locale === "string" ? locale.trim().toLowerCase() : "";
  if (raw === "ko") return "Korean";
  if (raw === "en") return "English";
  if (raw === "es") return "Spanish";
  return "Other";
}
