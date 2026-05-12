import type {ContactMessageLanguage} from "@/lib/contact-locale";

export type WaitlistSheetRow = {
  id: string;
  submitted_at: string;
  email: string;
  language: ContactMessageLanguage;
};

/** 로스앤젤레스 타임존 기준 표시용 시각 (스프레드시트 정렬·표시용) */
export function formatSubmittedAtLosAngeles(date = new Date()): string {
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  return `${fmt.format(date)} America/Los_Angeles`;
}

export async function appendWaitlistToGoogleSheets(row: WaitlistSheetRow): Promise<void> {
  const url = process.env.WAITLIST_GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) {
    console.info("[waitlist-sheet] WAITLIST_GOOGLE_SHEETS_WEBHOOK_URL 미설정 — Waitlist 시트 동기화 생략");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id: row.id,
      submitted_at: row.submitted_at,
      email: row.email,
      language: row.language,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Waitlist Sheets webhook HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
}
