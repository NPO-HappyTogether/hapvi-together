import {appendFile, mkdir} from "fs/promises";
import {join} from "path";
import {NextResponse} from "next/server";
import {sendWaitlistAdminNotification} from "@/lib/waitlist-notify";

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

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({error: "invalid_json"}, {status: 400});
  }

  const email = parseEmail(json);
  if (!email) {
    return NextResponse.json({error: "invalid_email"}, {status: 400});
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
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
    console.info("[waitlist signup]", email, "(Vercel: no webhook → file log skipped; rely on admin mail)");
  } else {
    const dir = join(process.cwd(), "data");
    const file = join(dir, "waitlist.log");
    const line = `${new Date().toISOString()}\t${email}\n`;
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
