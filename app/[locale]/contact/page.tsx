"use client";

import {Clock, Mail} from "lucide-react";
import {useTranslations} from "next-intl";
import {useState} from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("Contact");

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-2xl px-4 pb-12 pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{t("hero.title")}</h1>
        <p className="mt-6 whitespace-pre-line text-xl text-gray-600">{t("hero.description")}</p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 pb-20 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-800">
                {t("form.name.label")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("form.name.placeholder")}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="contact" className="mb-2 block text-sm font-medium text-gray-800">
                {t("form.contact.label")}
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder={t("form.contact.placeholder")}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-gray-800">
                {t("form.helpType.legend")}
              </legend>
              <div className="space-y-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="housing" />
                  <span>{t("form.helpType.housing")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="benefits" />
                  <span>{t("form.helpType.benefits")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="unknown" />
                  <span>{t("form.helpType.unknown")}</span>
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-800">
                {t("form.message.label")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("form.message.placeholder")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              {t("form.submit")}
            </button>
          </form>

          {submitted && (
            <p className="mt-4 rounded-xl bg-hapvi-light px-4 py-3 text-sm font-medium text-hapvi-dark">
              {t("form.success")}
            </p>
          )}
        </div>

        <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-gray-900">{t("info.title")}</h2>
          <ul className="mt-5 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t("info.email")}</p>
                <p>info@hapvi.org</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t("info.hoursLabel")}</p>
                <p>{t("info.hoursValue")}</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>

      <section className="bg-hapvi-light px-4 py-10 text-center">
        <p className="text-lg font-medium text-hapvi-dark">{t("bottom.free")}</p>
        <p className="mt-2 text-base text-gray-600">{t("bottom.safe")}</p>
      </section>
    </div>
  );
}
