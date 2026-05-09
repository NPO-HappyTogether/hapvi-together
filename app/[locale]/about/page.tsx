import {Heart, Unlock, Users} from "lucide-react";
import {useTranslations} from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24">
        <h1 className="text-4xl font-bold text-gray-900">{t("hero.title")}</h1>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-gray-700">
          {t("hero.description")}
        </p>
      </section>

      <section className="bg-hapvi-light px-4 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 md:gap-12">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-hapvi-primary">{t("mission.label")}</p>
            <p className="mt-4 text-xl font-medium leading-relaxed text-gray-900">
              {t("mission.textLine1")}
              <br />
              {t("mission.textLine2")}
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-hapvi-primary">{t("vision.label")}</p>
            <p className="mt-4 text-xl font-medium leading-relaxed text-gray-900">
              {t("vision.textLine1")}
              <br />
              {t("vision.textLine2")}
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">{t("work.title")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Users className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">{t("work.accompany.title")}</h3>
            <p className="mt-3 text-gray-600">{t("work.accompany.description")}</p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Unlock className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">{t("work.accessibility.title")}</h3>
            <p className="mt-3 text-gray-600">{t("work.accessibility.description")}</p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Heart className="h-7 w-7 text-hapvi-primary" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">{t("work.community.title")}</h3>
            <p className="mt-3 text-gray-600">{t("work.community.description")}</p>
          </article>
        </div>
      </section>

      <section className="bg-[#F1EFE8] px-4 py-12 text-center">
        <p className="text-lg font-medium text-gray-900">{t("footerLine1")}</p>
        <p className="mt-3 text-base text-gray-600">{t("footerLine2")}</p>
      </section>
    </div>
  );
}
