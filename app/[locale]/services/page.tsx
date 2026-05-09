import {Link} from "@/i18n/navigation";
import {CheckCircle2, Circle} from "lucide-react";
import {useTranslations} from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("Services");

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-3xl px-4 pb-12 pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{t("hero.title")}</h1>
        <p className="mt-6 text-xl text-gray-600">
          {t("hero.descriptionLine1")}
          <br />
          {t("hero.descriptionLine2")}
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-20">
        <article className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div>
            <span className="inline-flex rounded-full bg-hapvi-light px-3 py-1 text-sm font-medium text-hapvi-dark">
              {t("service1.badge")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">{t("service1.title")}</h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-700">
              {t("service1.description")}
            </p>

            <p className="mt-6 text-sm font-semibold text-hapvi-primary">{t("service1.forWhoTitle")}</p>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>{t("service1.points.0")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>{t("service1.points.1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>{t("service1.points.2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>{t("service1.points.3")}</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              {t("apply")}
            </Link>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-hapvi-light to-white p-8 text-center text-gray-500">
            {t("illustration")}
          </div>
        </article>

        <article className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="order-2 md:order-1 rounded-2xl bg-gradient-to-br from-hapvi-light to-white p-8 text-center text-gray-500">
            {t("illustration")}
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-flex rounded-full bg-hapvi-light px-3 py-1 text-sm font-medium text-hapvi-dark">
              {t("service2.badge")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">{t("service2.title")}</h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-700">
              {t("service2.description")}
            </p>

            <p className="mt-6 text-sm font-semibold text-hapvi-primary">
              {t("service2.programsTitle")}
            </p>
            <ul className="mt-3 space-y-2 text-gray-800">
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>{t("service2.programs.0")}</span>
              </li>
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>{t("service2.programs.1")}</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              {t("apply")}
            </Link>
          </div>
        </article>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border-2 border-dashed border-[#d9cdb2] bg-[#F1EFE8] p-8 text-center">
          <span className="inline-flex rounded-full bg-[#FAEEDA] px-3 py-1 text-sm font-medium text-[#854F0B]">
            {t("comingSoon.badge")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{t("comingSoon.title")}</h2>
          <p className="mt-4 whitespace-pre-line text-lg text-gray-700">{t("comingSoon.description")}</p>

          <form className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t("comingSoon.placeholder")}
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-full border border-hapvi-primary px-5 py-3 text-sm font-medium text-hapvi-primary transition hover:bg-hapvi-light"
            >
              {t("comingSoon.button")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
