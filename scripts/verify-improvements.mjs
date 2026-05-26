/**
 * Post-improvement verification (no secrets in output).
 */
import {readFileSync, existsSync} from "fs";
import {join} from "path";

const ROOT = join(import.meta.dirname, "..");
let failed = 0;

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}
function fail(msg) {
  console.error(`  ✗ ${msg}`);
  failed++;
}

function read(path) {
  return readFileSync(join(ROOT, path), "utf8");
}

console.log("\n[Improvements verification]\n");

// Files removed / added
if (!existsSync(join(ROOT, "docs/PHASE9-TEST.md"))) pass("PHASE9-TEST.md removed");
else fail("PHASE9-TEST.md still exists");

if (existsSync(join(ROOT, "components/SkipLink.tsx"))) pass("SkipLink component exists");
else fail("SkipLink missing");

if (existsSync(join(ROOT, "lib/locale-path.ts"))) pass("locale-path helper exists");
else fail("locale-path missing");

// Source patterns
const header = read("components/Header.tsx");
if (header.includes("switchLocalePath") && header.includes("aria-expanded={isOpen}")) {
  pass("Header: locale URL switch + aria-expanded");
} else fail("Header improvements incomplete");

const layout = read("app/layout.tsx");
if (layout.includes('id="main-content"') && layout.includes("SkipLink")) {
  pass("Layout: skip link + main id");
} else fail("Layout skip link incomplete");

const sitemap = read("app/sitemap.ts");
const bareInStatic =
  /path:\s*"\/eligibility"/.test(sitemap) ||
  /path:\s*"\/resources"/.test(sitemap) ||
  /path:\s*"\/privacy"/.test(sitemap);
if (!bareInStatic && sitemap.includes("/${locale}/eligibility")) {
  pass("Sitemap: locale-only eligibility/resources/privacy in STATIC_PATHS");
} else fail("Sitemap STATIC_PATHS still lists bare locale pages");

const eligibility = read("app/eligibility/page.tsx");
if (eligibility.includes('redirect("/ko/eligibility")')) pass("Bare /eligibility → redirect");
else fail("/eligibility redirect missing");

const home = read("app/home-client.tsx");
if (home.includes("scrollDown") && home.includes("privacyPath(locale)")) {
  pass("Home: scroll aria + locale privacy");
} else fail("Home improvements incomplete");

const footer = read("components/Footer.tsx");
if (footer.includes("footer.copyright") && footer.includes("localeRoutedPath")) {
  pass("Footer: i18n copyright + nav links");
} else fail("Footer improvements incomplete");

const privacyPage = read("app/[locale]/privacy/page.tsx");
if (privacyPage.includes("privacyAlternates") && privacyPage.includes("metaDescription")) {
  pass("Privacy: per-locale metadata + hreflang");
} else fail("Privacy metadata incomplete");

const page = read("app/page.tsx");
if (page.includes("FaqJsonLd")) pass("Home: FAQ JSON-LD");
else fail("FAQ JSON-LD missing");

const resources = read("app/[locale]/resources/resources-client.tsx");
if (resources.includes("role=\"tabpanel\"") && resources.includes("bg-hapvi-primary")) {
  pass("Resources: tabpanel + design tokens");
} else fail("Resources client incomplete");

const contact = read("app/contact/contact-client.tsx");
if (contact.includes("successNoEmail") && contact.includes("privacyPath(locale)")) {
  pass("Contact: phone success copy + locale privacy");
} else fail("Contact improvements incomplete");

// i18n keys
const ko = JSON.parse(read("messages/ko.json"));
for (const key of ["A11y.skipToContent", "Header.menuClose", "Home.hero.scrollDown", "Footer.copyright", "Footer.nav.eligibility", "Privacy.metaDescription", "Contact.form.successNoEmail"]) {
  const parts = key.split(".");
  let v = ko;
  for (const p of parts) v = v?.[p];
  if (v) pass(`Message key: ${key}`);
  else fail(`Missing message key: ${key}`);
}

console.log(failed ? `\n${failed} check(s) failed.\n` : "\nAll improvement checks passed.\n");
process.exit(failed ? 1 : 0);
