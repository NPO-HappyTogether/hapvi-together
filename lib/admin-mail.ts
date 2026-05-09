import nodemailer from "nodemailer";
import {Resend} from "resend";

/**
 * 관리자 알림 수신 (출시 알림·상담 신청 등 공통).
 * WAITLIST_NOTIFY_EMAIL 미설정 시 info@hapvi.org
 *
 * Resend: RESEND_API_KEY + RESEND_FROM
 * SMTP: SMTP_HOST / SMTP_USER / SMTP_PASS / SMTP_FROM(선택)
 */

export function adminNotifyRecipients(): string[] {
  const raw = process.env.WAITLIST_NOTIFY_EMAIL?.trim();
  if (!raw) return ["info@hapvi.org"];
  return raw.split(/[,;]/).map((x) => x.trim()).filter(Boolean);
}

async function sendResendApi(
  resend: Resend,
  replyTo: string | undefined,
  to: string[],
  from: string,
  subject: string,
  html: string,
  text: string,
  includeReplyTo: boolean,
) {
  const reply =
    includeReplyTo && replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) ? replyTo : undefined;

  const {data, error} = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    ...(reply ? {replyTo: reply} : {}),
  });

  if (error) {
    const msg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as {message: unknown}).message)
        : JSON.stringify(error);
    throw new Error(`Resend API: ${msg}`);
  }

  if (data?.id) {
    console.info("[admin-mail] Resend message id", data.id);
  }
}

async function sendResendSmtpRelay(
  replyTo: string | undefined,
  to: string[],
  from: string,
  subject: string,
  html: string,
  text: string,
  apiKey: string,
  includeReplyTo: boolean,
) {
  const reply =
    includeReplyTo && replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) ? replyTo : undefined;

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {user: "resend", pass: apiKey},
  });

  await transporter.sendMail({
    from,
    to: to.join(", "),
    subject,
    text,
    html,
    ...(reply ? {replyTo: reply} : {}),
  });
}

async function sendViaResend(
  replyTo: string | undefined,
  to: string[],
  from: string,
  subject: string,
  html: string,
  text: string,
) {
  const apiKey = process.env.RESEND_API_KEY!.trim();
  const resend = new Resend(apiKey);

  try {
    await sendResendApi(resend, replyTo, to, from, subject, html, text, true);
    return;
  } catch (e1) {
    console.warn("[admin-mail] Resend API (with replyTo) failed:", e1);
  }

  try {
    await sendResendApi(resend, replyTo, to, from, subject, html, text, false);
    return;
  } catch (e2) {
    console.warn("[admin-mail] Resend API (no replyTo) failed:", e2);
  }

  try {
    await sendResendSmtpRelay(replyTo, to, from, subject, html, text, apiKey, true);
    console.info("[admin-mail] delivered via Resend SMTP relay");
    return;
  } catch (e3) {
    console.warn("[admin-mail] Resend SMTP (with replyTo) failed:", e3);
  }

  await sendResendSmtpRelay(replyTo, to, from, subject, html, text, apiKey, false);
  console.info("[admin-mail] delivered via Resend SMTP relay (no replyTo)");
}

async function sendViaCustomSmtp(
  replyTo: string | undefined,
  to: string[],
  subject: string,
  html: string,
  text: string,
) {
  const host = process.env.SMTP_HOST!.trim();
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = process.env.SMTP_FROM?.trim() || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {user, pass},
  });

  const mailReply =
    replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) ? replyTo : undefined;

  await transporter.sendMail({
    from,
    to: to.join(", "),
    subject,
    text,
    html,
    ...(mailReply ? {replyTo: mailReply} : {}),
  });
}

/** false면 메일 계층 미설정(로그만). 설정됐는데 실패하면 throw */
export async function sendTeamEmail(opts: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const to = adminNotifyRecipients();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM?.trim();

  if (resendKey && resendFrom) {
    await sendViaResend(opts.replyTo, to, resendFrom, opts.subject, opts.html, opts.text);
    return true;
  }

  if (resendKey && !resendFrom) {
    throw new Error(
      'RESEND_FROM 가 비어 있습니다. 예: RESEND_FROM="HapVi Together <waitlist@hapvi.org>"',
    );
  }

  if (process.env.SMTP_HOST?.trim() && process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim()) {
    await sendViaCustomSmtp(opts.replyTo, to, opts.subject, opts.html, opts.text);
    return true;
  }

  console.info(
    "[admin-mail] 메일 미발송: RESEND_API_KEY+RESEND_FROM 또는 SMTP_* 가 필요합니다. 수신 기본값:",
    to.join(", "),
  );
  return false;
}
