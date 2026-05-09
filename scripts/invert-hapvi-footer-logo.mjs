/**
 * 푸터용 마크: 원본 아이콘(버건디 배경 + 흰 실루엣)에서
 * 흰색 ↔ #5D1818 역전해 어두운 배경 위에서 선명하게 보이게 함.
 * 실행: node scripts/invert-hapvi-footer-logo.mjs
 */
import sharp from "sharp";

const INPUT = "public/img/hapvi-logo.png";
const OUTPUT = "public/img/hapvi-logo-footer-mark.png";
/** HapVi 버건디 */
const BURG = { r: 93, g: 24, b: 24 };

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function dBurg(r, g, b) {
  return Math.hypot(BURG.r - r, BURG.g - g, BURG.b - b);
}

const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;
const out = Buffer.from(data);

for (let i = 0; i < data.length; i += ch) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const L = lum(r, g, b);
  const d = dBurg(r, g, b);

  let nr;
  let ng;
  let nb;

  /* 본체가 밝은 영역(아이콘 형태) → 버건디 */
  if (L > 118 || (L > 95 && d > 42)) {
    nr = BURG.r;
    ng = BURG.g;
    nb = BURG.b;
  } else if (d < 62 || L < 72) {
    /* 배경 버건디 계열 → 흰색 */
    nr = 255;
    ng = 255;
    nb = 255;
  } else {
    /* 안티앨리어싱 */
    nr = L > 96 ? BURG.r : 255;
    ng = L > 96 ? BURG.g : 255;
    nb = L > 96 ? BURG.b : 255;
  }

  out[i] = nr;
  out[i + 1] = ng;
  out[i + 2] = nb;
  if (ch === 4) out[i + 3] = data[i + 3];
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: ch },
})
  .png()
  .toFile(OUTPUT);

console.log(`Wrote ${OUTPUT} (${info.width}x${info.height})`);
