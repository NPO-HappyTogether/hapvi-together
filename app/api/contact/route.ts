import {NextResponse} from "next/server";
import {
  appendContactToGoogleSheets,
  isValidContactValue,
  splitContactIntoEmailPhone,
} from "@/lib/contact-google-sheet";
import {localeToContactMessageLanguage, type ContactMessageLanguage} from "@/lib/contact-locale";
import {sendContactConsultationEmail} from "@/lib/contact-notify";
import {sendContactWelcomeEmail} from "@/lib/contact-welcome-mail";
import {getClientIp, recordRequestIfAllowed} from "@/lib/rate-limit";
import {isHoneypotFilled} from "@/lib/sanitize";

export const runtime = "nodejs";

const GENERIC_ERROR_MESSAGE = "요청을 처리할 수 없습니다";
const RATE_LIMIT_MESSAGE = "잠시 후 다시 시도해주세요";

const ALLOWED_HELP = new Set(["housing", "benefits", "unknown"]);

function parseBody(raw: unknown): {
  name: string;
  contact: string;
  helpTypes: string[];
  message: string;
  language: ContactMessageLanguage;
} | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const contact = typeof o.contact === "string" ? o.contact.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  const helpRaw = o.helpTypes;
  const helpTypes =
    Array.isArray(helpRaw) ? helpRaw.filter((x): x is string => typeof x === "string" && ALLOWED_HELP.has(x)) : [];

  if (!name || name.length > 200) return null;
  if (!isValidContactValue(contact)) return null;
  if (helpTypes.length === 0) return null;
  if (message.length > 5000) return null;

  const language = localeToContactMessageLanguage(o.locale);

  return {name, contact, helpTypes, message, language};
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!recordRequestIfAllowed("contact", ip, 5)) {
    return NextResponse.json({error: RATE_LIMIT_MESSAGE}, {status: 429});
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({error: GENERIC_ERROR_MESSAGE}, {status: 400});
  }

  if (isHoneypotFilled(json)) {
    return NextResponse.json({ok: true});
  }

  const parsed = parseBody(json);
  if (!parsed) {
    return NextResponse.json({error: GENERIC_ERROR_MESSAGE}, {status: 400});
  }

  try {
    await sendContactConsultationEmail(parsed);
  } catch (e) {
    console.error("[contact] mail failed", e);
    return NextResponse.json({error: GENERIC_ERROR_MESSAGE}, {status: 502});
  }

  const {language} = parsed;
  const {email, phone} = splitContactIntoEmailPhone(parsed.contact);

  const [sheetResult, welcomeResult] = await Promise.allSettled([
    appendContactToGoogleSheets({
      name: parsed.name,
      email,
      phone,
      message: parsed.message,
      language,
    }),
    sendContactWelcomeEmail({toEmail: email, language, name: parsed.name}),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("[contact] google sheet failed", sheetResult.reason);
  }
  if (welcomeResult.status === "rejected") {
    console.error("[contact] welcome mail failed", welcomeResult.reason);
  }

  return NextResponse.json({ok: true});
}
