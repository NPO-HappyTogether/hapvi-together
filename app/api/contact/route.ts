import {NextResponse} from "next/server";
import {sendContactConsultationEmail} from "@/lib/contact-notify";

export const runtime = "nodejs";

const ALLOWED_HELP = new Set(["housing", "benefits", "unknown"]);

function parseBody(raw: unknown): {name: string; contact: string; helpTypes: string[]; message: string} | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const contact = typeof o.contact === "string" ? o.contact.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  const helpRaw = o.helpTypes;
  const helpTypes =
    Array.isArray(helpRaw) ? helpRaw.filter((x): x is string => typeof x === "string" && ALLOWED_HELP.has(x)) : [];

  if (!name || name.length > 200) return null;
  if (!contact || contact.length > 320) return null;
  if (helpTypes.length === 0) return null;
  if (message.length > 5000) return null;

  return {name, contact, helpTypes, message};
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({error: "invalid_json"}, {status: 400});
  }

  const parsed = parseBody(json);
  if (!parsed) {
    return NextResponse.json({error: "invalid_body"}, {status: 400});
  }

  try {
    await sendContactConsultationEmail(parsed);
  } catch (e) {
    console.error("[contact] mail failed", e);
    return NextResponse.json({error: "delivery_failed"}, {status: 502});
  }

  return NextResponse.json({ok: true});
}
