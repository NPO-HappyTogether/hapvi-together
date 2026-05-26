import {appendFile, mkdir} from "fs/promises";
import {join} from "path";
import {NextResponse} from "next/server";
import {localeToContactMessageLanguage} from "@/lib/contact-locale";
import {getClientIp, recordRequestIfAllowed} from "@/lib/rate-limit";
import {isHoneypotFilled} from "@/lib/sanitize";
import {sendWaitlistAdminNotification} from "@/lib/waitlist-notify";
import {
  appendWaitlistToGoogleSheets,
  formatSubmittedAtLosAngeles,
} from "@/lib/waitlist-google-sheet";

export const runtime = "nodejs";

const ON_VERCEL = process.env.VERCEL === "1";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmail(body: unknown): string | null {
  if (!body || typeof body !== "object" || !("email" in body)) return null;
  const value = (body as {email: unknown}).email;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || !EMAIL_RE.test(trimmed)) return null;
  return trimmed;
}

/** 클라이언트 locale (ko/en/es). 그 외·누락 → null */
function parseWaitlistLocale(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as {locale?: unknown}).locale;
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (t === "ko" || t === "en" || t === "es") return t;
  return null;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!recordRequestIfAllowed("waitlist", ip, 10)) {
    return NextResponse.json({error: "rate_limited"}, {status: 429});
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({error: "invalid_json"}, {status: 400});
  }

  if (isHoneypotFilled(json)) {
    return NextResponse.json({ok: true, adminEmailSent: false});
  }

  const email = parseEmail(json);
  if (!email) {
    return NextResponse.json({error: "invalid_email"}, {status: 400});
  }

  const locale = parseWaitlistLocale(json);
  const language = localeToContactMessageLanguage(locale);
  const now = new Date();
  const sheetId = `WL-${now.getTime()}`;
  const submittedAtLa = formatSubmittedAtLosAngeles(now);

  try {
    await appendWaitlistToGoogleSheets({
      type: "waitlist",
      id: sheetId,
      submitted_at: submittedAtLa,
      email,
      language,
    });
  } catch (e) {
    console.error("[waitlist] google sheet failed", e);
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          locale,
          source: "hapvi-footer-waitlist",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error("[waitlist] webhook status", res.status, await res.text().catch(() => ""));
        return NextResponse.json({error: "delivery_failed"}, {status: 502});
      }
    } catch (e) {
      console.error("[waitlist] webhook", e);
      return NextResponse.json({error: "delivery_failed"}, {status: 502});
    }
  } else if (ON_VERCEL) {
    console.info("[waitlist signup]", email, locale ?? "", "(Vercel: no webhook → file log skipped; rely on admin mail)");
  } else {
    const dir = join(process.cwd(), "data");
    const file = join(dir, "waitlist.log");
    const line = `${new Date().toISOString()}\t${email}\t${locale ?? ""}\n`;
    try {
      await mkdir(dir, {recursive: true});
      await appendFile(file, line, "utf8");
    } catch (e) {
      console.warn("[waitlist] local log unavailable", e);
      console.info("[waitlist signup]", email);
    }
  }

  let adminEmailSent = false;
  try {
    adminEmailSent = await sendWaitlistAdminNotification(email);
  } catch (e) {
    console.error("[waitlist] admin notification email failed", e);
    return NextResponse.json({error: "delivery_failed"}, {status: 502});
  }

  return NextResponse.json({ok: true, adminEmailSent});
}
