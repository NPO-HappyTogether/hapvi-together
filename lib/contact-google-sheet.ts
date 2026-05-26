import type {ContactMessageLanguage} from "@/lib/contact-locale";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 이메일 또는 전화번호(숫자 7~15자리) */
export function isValidContactValue(contact: string): boolean {
  const c = contact.trim();
  if (!c || c.length > 320) return false;
  if (EMAIL_RE.test(c)) return true;
  const digits = c.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function splitContactIntoEmailPhone(contact: string): {email: string; phone: string} {
  const c = contact.trim();
  if (EMAIL_RE.test(c)) return {email: c, phone: ""};
  return {email: "", phone: c};
}

export type GoogleSheetContactRow = {
  name: string;
  email: string;
  phone: string;
  message: string;
  language: ContactMessageLanguage;
};

export async function appendContactToGoogleSheets(row: GoogleSheetContactRow): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) {
    console.info("[contact-sheet] GOOGLE_SHEETS_WEBHOOK_URL 미설정 — 시트 동기화 생략");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: row.name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      language: row.language,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google Sheets webhook HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
}
