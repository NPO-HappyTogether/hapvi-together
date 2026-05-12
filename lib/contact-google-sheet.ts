import type {ContactMessageLanguage} from "@/lib/contact-locale";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
