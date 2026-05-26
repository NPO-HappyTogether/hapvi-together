import {readFileSync} from "fs";
import {join} from "path";

const root = join(import.meta.dirname, "..", "messages");
const locales = ["ko", "en", "es"];

function flatKeys(obj, prefix = "") {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...flatKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const byLocale = locales.map((locale) => {
  const data = JSON.parse(readFileSync(join(root, `${locale}.json`), "utf8"));
  return {locale, keys: new Set(flatKeys(data))};
});

const base = byLocale[0];
let failed = false;

for (const other of byLocale.slice(1)) {
  for (const key of base.keys) {
    if (!other.keys.has(key)) {
      console.error(`[i18n] missing in ${other.locale}: ${key}`);
      failed = true;
    }
  }
  for (const key of other.keys) {
    if (!base.keys.has(key)) {
      console.error(`[i18n] extra in ${other.locale}: ${key}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("[i18n] ko/en/es keys are in sync");
