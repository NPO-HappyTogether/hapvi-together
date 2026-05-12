"use client";

import {useLocale} from "@/components/LocaleProvider";
import {StockPhoto} from "@/components/StockPhoto";
import {SITE_IMAGES} from "@/lib/site-images";
import {Clock, Mail} from "lucide-react";
import {useState} from "react";

const inputFilledClass =
  "w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-subtle focus:border-hapvi-primary focus:ring-2 focus:ring-hapvi-primary/25";

export default function ContactPageClient() {
  const {messages, locale} = useLocale();
  const t = messages.Contact;
  const alts = messages.StockPhotoAlts;
  const stock = SITE_IMAGES.stock;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<null | "help" | "delivery">(null);

  return (
    <div className="min-h-screen bg-hapvi-dark md:bg-transparent">
      <section className="grid min-h-screen md:grid-cols-2">
        <div className="relative order-1 min-h-[42vh] md:order-2 md:min-h-screen">
          <StockPhoto
            src={stock.contactOffice}
            alt={alts.contactOffice}
            className="absolute inset-0 h-full w-full min-h-[42vh] md:min-h-screen"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            overlayClassName="bg-gradient-to-br from-hapvi-dark/35 via-hapvi-primary/25 to-transparent"
          />
        </div>

        <div className="order-2 flex flex-col justify-center bg-hapvi-primary px-6 pb-16 pt-24 md:order-1 md:px-12 lg:px-16 xl:px-24 md:py-16 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{t.info.title}</p>
          <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed text-white/85">{t.hero.description}</p>

          <div className="mt-10 space-y-6 text-white/90">
            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-hapvi-light" strokeWidth={2} />
              <div>
                <p className="text-sm font-semibold text-white">{t.info.email}</p>
                <p className="mt-1 text-base">info@hapvi.org</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-hapvi-light" strokeWidth={2} />
              <div>
                <p className="text-sm font-semibold text-white">{t.info.hoursLabel}</p>
                <p className="mt-1 text-base leading-relaxed">{t.info.hoursValue}</p>
              </div>
            </div>
          </div>

          <form
            className="mt-12 space-y-6"
            onSubmit={async (event) => {
              event.preventDefault();
              setFormError(null);
              const form = event.currentTarget;
              const fd = new FormData(form);
              const name = String(fd.get("name") ?? "").trim();
              const contact = String(fd.get("contact") ?? "").trim();
              const message = String(fd.get("message") ?? "").trim();
              const helpChoice = fd.get("helpType");
              const helpTypes =
                typeof helpChoice === "string" &&
                (helpChoice === "housing" || helpChoice === "benefits" || helpChoice === "unknown")
                  ? [helpChoice]
                  : [];

              if (helpTypes.length === 0) {
                setFormError("help");
                return;
              }

              setLoading(true);
              setSubmitted(false);
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({name, contact, message, helpTypes, locale}),
                });
                if (!res.ok) {
                  setFormError("delivery");
                  return;
                }
                setSubmitted(true);
                form.reset();
              } catch {
                setFormError("delivery");
              } finally {
                setLoading(false);
              }
            }}
          >
            <fieldset className="rounded-md border border-white/35 bg-white/[0.06] p-4 pt-3">
              <legend className="px-1 text-sm font-semibold text-white">{t.form.name.label}</legend>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t.form.name.placeholder}
                required
                autoComplete="name"
                className={`${inputFilledClass} mt-3`}
              />
            </fieldset>

            <fieldset className="rounded-md border border-white/35 bg-white/[0.06] p-4 pt-3">
              <legend className="px-1 text-sm font-semibold text-white">{t.form.contact.label}</legend>
              <input
                id="contact"
                name="contact"
                type="email"
                placeholder={t.form.contact.placeholder}
                required
                autoComplete="email"
                className={`${inputFilledClass} mt-3`}
              />
            </fieldset>

            <fieldset className="rounded-md border border-white/35 bg-white/[0.06] p-4 pt-3">
              <legend className="px-1 text-sm font-semibold text-white">{t.form.helpType.legend}</legend>
              <div className="mt-3 space-y-2.5 text-sm text-white/90">
                <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition hover:bg-white/10">
                  <input
                    type="radio"
                    name="helpType"
                    value="housing"
                    required
                    className="size-4 shrink-0 border-white/45 bg-transparent accent-hapvi-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hapvi-light/50"
                  />
                  <span>{t.form.helpType.housing}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition hover:bg-white/10">
                  <input
                    type="radio"
                    name="helpType"
                    value="benefits"
                    className="size-4 shrink-0 border-white/45 bg-transparent accent-hapvi-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hapvi-light/50"
                  />
                  <span>{t.form.helpType.benefits}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition hover:bg-white/10">
                  <input
                    type="radio"
                    name="helpType"
                    value="unknown"
                    className="size-4 shrink-0 border-white/45 bg-transparent accent-hapvi-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hapvi-light/50"
                  />
                  <span>{t.form.helpType.unknown}</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="rounded-md border border-white/35 bg-white/[0.06] p-4 pt-3">
              <legend className="px-1 text-sm font-semibold text-white">{t.form.message.label}</legend>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t.form.message.placeholder}
                className={`${inputFilledClass} mt-3 resize-y`}
              />
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-hapvi-light px-6 py-3.5 text-base font-semibold text-hapvi-dark shadow-lg transition hover:bg-white disabled:pointer-events-none disabled:opacity-65"
            >
              {loading ? t.form.submitting : t.form.submit}
            </button>
          </form>

          {formError === "help" && (
            <p className="mt-6 rounded-md border border-amber-300/50 bg-amber-950/35 px-4 py-3 text-sm font-medium text-amber-100">
              {t.form.helpRequired}
            </p>
          )}
          {formError === "delivery" && (
            <p className="mt-6 rounded-md border border-amber-300/50 bg-amber-950/35 px-4 py-3 text-sm font-medium text-amber-100">
              {t.form.errorDelivery}
            </p>
          )}

          {submitted && (
            <p className="mt-8 rounded-md border border-white/25 bg-white/10 px-4 py-4 text-sm font-semibold text-white">
              {t.form.success}
            </p>
          )}

          <div className="mt-14 border-t border-white/15 pt-10">
            <p className="text-base font-semibold text-white">{t.bottom.free}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">{t.bottom.safe}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
