import {Link} from "@/i18n/navigation";
import {FileText, HandHeart, Home as HomeIcon} from "lucide-react";
import {useTranslations} from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div className="bg-white">
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-hapvi-light via-white to-[#f0fbf6] px-4 py-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {t("hero.description")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-full bg-hapvi-primary px-6 py-3 text-center text-base font-medium text-white transition hover:bg-hapvi-dark sm:w-auto"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/services"
              className="w-full rounded-full border border-hapvi-primary px-6 py-3 text-center text-base font-medium text-hapvi-primary transition hover:bg-hapvi-light sm:w-auto"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold leading-snug text-gray-900">
          {t("problem.titleLine1")}
          <br className="sm:hidden" /> {t("problem.titleLine2")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{t("problem.description")}</p>
        <p className="mt-5 text-lg font-medium text-hapvi-primary">{t("problem.highlight")}</p>
      </section>

      <section className="bg-hapvi-light px-4 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">{t("services.title")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <HomeIcon className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">{t("services.housing.title")}</h3>
              <p className="mt-3 text-gray-600">{t("services.housing.description")}</p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                {t("services.learnMore")}
              </Link>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <FileText className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">{t("services.benefits.title")}</h3>
              <p className="mt-3 text-gray-600">{t("services.benefits.description")}</p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                {t("services.learnMore")}
              </Link>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <HandHeart className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {t("services.community.title")}
              </h3>
              <p className="mt-3 text-gray-600">{t("services.community.description")}</p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                {t("services.learnMore")}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-hapvi-primary px-4 py-20 text-white">
        <blockquote className="mx-auto max-w-4xl text-center text-2xl italic leading-relaxed md:text-3xl">
          &ldquo;{t("quote")}&rdquo;
        </blockquote>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">{t("finalCta.title")}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{t("finalCta.description")}</p>
          <p className="mt-3 text-sm font-medium text-hapvi-primary">{t("finalCta.free")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
          >
            {t("finalCta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
