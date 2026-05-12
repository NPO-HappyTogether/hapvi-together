import {Resend} from "resend";

import type {ContactMessageLanguage} from "@/lib/contact-language";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BURGUNDY = "#5D1818";
const SITE = "https://hapvi.org";
const PRIVACY_URL = "https://hapvi.org/privacy";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function welcomeSubject(language: ContactMessageLanguage): string {
  switch (language) {
    case "Korean":
      return "HapVi Together가 함께합니다";
    case "Spanish":
      return "Bienvenido a HapVi Together";
    case "English":
    case "Other":
    default:
      return "Welcome to HapVi Together";
  }
}

const bodyP =
  "margin:0 0 14px;font-size:15px;line-height:1.65;color:#444444;";

/** 한국어·영어·스페인어 환영 본문 */
function welcomeMainHtml(language: ContactMessageLanguage, safeName: string): string {
  if (language === "Korean") {
    return `
      <p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#333333;">안녕하세요, ${safeName}님</p>
      <p style="margin:0 0 14px;font-size:17px;line-height:1.45;font-weight:700;color:${BURGUNDY};">HapVi Together에 오신 것을 환영합니다!</p>
      <p style="${bodyP}">저희는 미국 LA에 사는 한인 가정이<br />안정된 집을 갖고, 마땅히 받아야 할 혜택을<br />누릴 수 있도록 돕는 비영리 단체입니다.</p>
      <p style="${bodyP}">영어가 어렵고, 서류가 복잡하고,<br />어디서 시작해야 할지 몰라 포기하셨나요?</p>
      <p style="${bodyP}">HapVi Together가 처음부터 끝까지<br />한국어로 함께하겠습니다.</p>
      <p style="${bodyP}">모든 서비스는 무료입니다.</p>
      <p style="${bodyP}"><strong style="color:#222222;">🏠 주거 연결</strong><br />임대 주택·섹션8·공공 주거 프로그램 안내</p>
      <p style="${bodyP}"><strong style="color:#222222;">📋 정부 혜택 신청</strong><br />혜택 자격 확인 및 신청 서류 검토</p>
      <p style="${bodyP}"><strong style="color:#222222;">🤝 지역 자원 연결</strong><br />커뮤니티 기관 및 긴급 지원 연결</p>
      <p style="${bodyP}">모든 한인 가정이 이 땅에서<br />안정된 삶을 살 수 있도록,<br />저희가 끝까지 함께하겠습니다.</p>
      <p style="margin:0;font-size:15px;line-height:1.65;color:#444444;">궁금한 점은 언제든지 연락 주세요.</p>
    `.trim();
  }
  if (language === "Spanish") {
    return `
      <p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#333333;">Hola, ${safeName}</p>
      <p style="margin:0 0 14px;font-size:17px;line-height:1.45;font-weight:700;color:${BURGUNDY};">¡Le damos la bienvenida a HapVi Together!</p>
      <p style="${bodyP}">Somos una organización sin fines de lucro<br />dedicada a ayudar a las familias<br />coreano-estadounidenses de Los Ángeles<br />a encontrar una vivienda estable y a acceder<br />a los beneficios que se merecen.</p>
      <p style="${bodyP}">¿Te sientes abrumado por las barreras del idioma,<br />los trámites complicados o simplemente porque<br />no sabes por dónde empezar?</p>
      <p style="${bodyP}">HapVi Together está aquí para guiarte<br />en cada paso del camino, en coreano.</p>
      <p style="${bodyP}">Todos nuestros servicios son gratuitos.</p>
      <p style="${bodyP}"><strong style="color:#222222;">🏠 Conexión de vivienda</strong><br />Orientación sobre viviendas de alquiler,<br />la Sección 8 y programas de vivienda pública</p>
      <p style="${bodyP}"><strong style="color:#222222;">📋 Solicitud de beneficios</strong><br />Verificación de elegibilidad y revisión<br />de documentos de solicitud</p>
      <p style="${bodyP}"><strong style="color:#222222;">🤝 Recursos comunitarios</strong><br />Referencias a agencias locales y apoyo<br />de emergencia</p>
      <p style="${bodyP}">Todas las familias coreano-estadounidenses<br />merecen una vida estable y digna aquí.<br />Estamos comprometidos a acompañarte<br />hasta que lo logres.</p>
      <p style="margin:0;font-size:15px;line-height:1.65;color:#444444;">No dudes en contactarnos en cualquier momento.</p>
    `.trim();
  }
  return `
    <p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#333333;">Hello, ${safeName}</p>
    <p style="margin:0 0 14px;font-size:17px;line-height:1.45;font-weight:700;color:${BURGUNDY};">Welcome to HapVi Together!</p>
    <p style="${bodyP}">We are a nonprofit organization dedicated to<br />helping Korean-American families in Los Angeles<br />find stable housing and access the benefits<br />they deserve.</p>
    <p style="${bodyP}">Feeling overwhelmed by language barriers,<br />complicated paperwork, or simply not knowing<br />where to start?</p>
    <p style="${bodyP}">HapVi Together is here to guide you every<br />step of the way — in Korean.</p>
    <p style="${bodyP}">All of our services are free.</p>
    <p style="${bodyP}"><strong style="color:#222222;">🏠 Housing Connection</strong><br />Rental housing, Section 8, and public housing<br />program guidance</p>
    <p style="${bodyP}"><strong style="color:#222222;">📋 Benefits Application</strong><br />Eligibility check and application document review</p>
    <p style="${bodyP}"><strong style="color:#222222;">🤝 Community Resources</strong><br />Local agency referrals and emergency support</p>
    <p style="${bodyP}">Every Korean-American family deserves a stable<br />and dignified life here.<br />We are committed to walking alongside you<br />until you get there.</p>
    <p style="margin:0;font-size:15px;line-height:1.65;color:#444444;">Feel free to reach out anytime.</p>
  `.trim();
}

function welcomePlainText(language: ContactMessageLanguage, name: string): string {
  const n = name.trim() || "there";
  if (language === "Korean") {
    return [
      `안녕하세요, ${n}님`,
      "",
      "HapVi Together에 오신 것을 환영합니다!",
      "",
      "저희는 미국 LA에 사는 한인 가정이",
      "안정된 집을 갖고, 마땅히 받아야 할 혜택을",
      "누릴 수 있도록 돕는 비영리 단체입니다.",
      "",
      "영어가 어렵고, 서류가 복잡하고,",
      "어디서 시작해야 할지 몰라 포기하셨나요?",
      "",
      "HapVi Together가 처음부터 끝까지",
      "한국어로 함께하겠습니다.",
      "",
      "모든 서비스는 무료입니다.",
      "",
      "🏠 주거 연결",
      "임대 주택·섹션8·공공 주거 프로그램 안내",
      "",
      "📋 정부 혜택 신청",
      "혜택 자격 확인 및 신청 서류 검토",
      "",
      "🤝 지역 자원 연결",
      "커뮤니티 기관 및 긴급 지원 연결",
      "",
      "모든 한인 가정이 이 땅에서",
      "안정된 삶을 살 수 있도록,",
      "저희가 끝까지 함께하겠습니다.",
      "",
      "궁금한 점은 언제든지 연락 주세요.",
    ].join("\n");
  }
  if (language === "Spanish") {
    return [
      `Hola, ${n}`,
      "",
      "¡Le damos la bienvenida a HapVi Together!",
      "",
      "Somos una organización sin fines de lucro",
      "dedicada a ayudar a las familias",
      "coreano-estadounidenses de Los Ángeles",
      "a encontrar una vivienda estable y a acceder",
      "a los beneficios que se merecen.",
      "",
      "¿Te sientes abrumado por las barreras del idioma,",
      "los trámites complicados o simplemente porque",
      "no sabes por dónde empezar?",
      "",
      "HapVi Together está aquí para guiarte",
      "en cada paso del camino, en coreano.",
      "",
      "Todos nuestros servicios son gratuitos.",
      "",
      "🏠 Conexión de vivienda",
      "Orientación sobre viviendas de alquiler,",
      "la Sección 8 y programas de vivienda pública",
      "",
      "📋 Solicitud de beneficios",
      "Verificación de elegibilidad y revisión",
      "de documentos de solicitud",
      "",
      "🤝 Recursos comunitarios",
      "Referencias a agencias locales y apoyo",
      "de emergencia",
      "",
      "Todas las familias coreano-estadounidenses",
      "merecen una vida estable y digna aquí.",
      "Estamos comprometidos a acompañarte",
      "hasta que lo logres.",
      "",
      "No dudes en contactarnos en cualquier momento.",
    ].join("\n");
  }
  return [
    `Hello, ${n}`,
    "",
    "Welcome to HapVi Together!",
    "",
    "We are a nonprofit organization dedicated to",
    "helping Korean-American families in Los Angeles",
    "find stable housing and access the benefits",
    "they deserve.",
    "",
    "Feeling overwhelmed by language barriers,",
    "complicated paperwork, or simply not knowing",
    "where to start?",
    "",
    "HapVi Together is here to guide you every",
    "step of the way — in Korean.",
    "",
    "All of our services are free.",
    "",
    "🏠 Housing Connection",
    "Rental housing, Section 8, and public housing",
    "program guidance",
    "",
    "📋 Benefits Application",
    "Eligibility check and application document review",
    "",
    "🤝 Community Resources",
    "Local agency referrals and emergency support",
    "",
    "Every Korean-American family deserves a stable",
    "and dignified life here.",
    "We are committed to walking alongside you",
    "until you get there.",
    "",
    "Feel free to reach out anytime.",
  ].join("\n");
}

function buildWelcomeHtml(language: ContactMessageLanguage, name: string): string {
  const safeName = escapeHtml(name.trim() || "there");
  const main = welcomeMainHtml(language, safeName);
  const footerStyle =
    "margin-top:28px;padding-top:18px;border-top:1px solid #E8E8E8;font-size:13px;line-height:1.6;color:#555555;";
  const linkStyle = "color:#5D1818;text-decoration:underline;";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td style="padding:0 0 20px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:700;color:${BURGUNDY};letter-spacing:-0.02em;">HapVi Together</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">${main}</td>
          </tr>
          <tr>
            <td style="${footerStyle}">
              <a href="mailto:info@hapvi.org" style="${linkStyle}">info@hapvi.org</a>
              &nbsp;·&nbsp;
              <a href="${SITE}" style="${linkStyle}">hapvi.org</a>
              &nbsp;·&nbsp;
              <a href="${PRIVACY_URL}" style="${linkStyle}">Privacy Policy</a>
              <br /><span style="display:block;margin-top:10px;">EIN: 33-3980325</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 신청자 이메일이 있고 RESEND_API_KEY 가 있을 때만 Resend로 환영 메일 발송.
 * 발신: RESEND_FROM 또는 HapVi Together &lt;info@hapvi.org&gt;
 */
export async function sendContactWelcomeEmail(opts: {
  toEmail: string;
  language: ContactMessageLanguage;
  name: string;
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

  const lang: ContactMessageLanguage =
    opts.language === "Other" ? "English" : opts.language;
  const subject = welcomeSubject(opts.language);
  const html = buildWelcomeHtml(lang, opts.name);
  const text =
    `${welcomePlainText(lang, opts.name)}\n\n---\ninfo@hapvi.org · ${SITE} · Privacy Policy: ${PRIVACY_URL}\nEIN: 33-3980325`;

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
