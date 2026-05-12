import {Resend} from "resend";

import type {ContactMessageLanguage} from "@/lib/contact-language";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 환영 메일 본문·제목은 추후 확정; 지금은 발송 파이프라인만 연결 */
const WELCOME_PLACEHOLDER: Record<
  ContactMessageLanguage,
  {subject: string; html: string; text: string}
> = {
  Korean: {
    subject: "[HapVi Together] 환영 메일 (초안)",
    html: "<p>환영 메일 본문은 추후 추가됩니다.</p>",
    text: "환영 메일 본문은 추후 추가됩니다.",
  },
  English: {
    subject: "[HapVi Together] Welcome (draft)",
    html: "<p>Welcome email content will be added later.</p>",
    text: "Welcome email content will be added later.",
  },
  Spanish: {
    subject: "[HapVi Together] Bienvenida (borrador)",
    html: "<p>El contenido del correo de bienvenida se añadirá más adelante.</p>",
    text: "El contenido del correo de bienvenida se añadirá más adelante.",
  },
  Other: {
    subject: "[HapVi Together] Welcome (draft)",
    html: "<p>Welcome email content will be added later.</p>",
    text: "Welcome email content will be added later.",
  },
};

function welcomeVariant(language: ContactMessageLanguage): (typeof WELCOME_PLACEHOLDER)["English"] {
  if (language === "Other") return WELCOME_PLACEHOLDER.English;
  return WELCOME_PLACEHOLDER[language];
}

/**
 * 신청자 이메일이 있고 RESEND_API_KEY 가 있을 때만 Resend로 환영 메일 발송.
 * from: RESEND_FROM 또는 info@hapvi.org (표시용 이름 포함 권장)
 */
export async function sendContactWelcomeEmail(opts: {
  toEmail: string;
  language: ContactMessageLanguage;
}): Promise<void> {
  const to = opts.toEmail.trim();
  if (!EMAIL_RE.test(to)) {
    console.info("[contact-welcome] 수신 이메일 없음(연락처가 메일 형식 아님) — 환영 메일 생략");
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[contact-welcome] RESEND_API_KEY 미설정 — 환영 메일 생략");
    return;
  }

  const from =
    process.env.RESEND_FROM?.trim() ||
    "HapVi Together <info@hapvi.org>";

  const {subject, html, text} = welcomeVariant(opts.language);
  const resend = new Resend(apiKey);

  const {data, error} = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
  });

  if (error) {
    const msg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as {message: unknown}).message)
        : JSON.stringify(error);
    throw new Error(`Resend (welcome): ${msg}`);
  }

  if (data?.id) {
    console.info("[contact-welcome] Resend message id", data.id);
  }
}
