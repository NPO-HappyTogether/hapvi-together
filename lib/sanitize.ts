/** 이메일 제목 등 헤더 인젝션 방지 */
export function sanitizeEmailSubjectPart(value: string, maxLen = 100): string {
  return value.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLen);
}

/** honeypot 필드 — 값이 있으면 봇으로 간주 */
export function isHoneypotFilled(body: unknown, field = "website"): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[field];
  return typeof value === "string" && value.trim().length > 0;
}
