import {StockPhoto} from "@/components/StockPhoto";
import {STOCK_PHOTOS} from "@/lib/stock-photos";
import {Heart, Unlock, Users} from "lucide-react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export default function AboutPage() {
  const t = useTranslations("About");
  const th = useTranslations("Header");
  const ts = useTranslations("Services");
  const home = useTranslations("Home");

  return (
    <div className="bg-cream">
      {/* 웰컴 스플릿 — 참고 3 */}
      <section className="grid min-h-[min(88vh,920px)] md:grid-cols-2">
        <div className="flex flex-col justify-center bg-hapvi-primary px-8 pb-16 pt-28 text-white md:px-14 lg:px-20 lg:pb-24 lg:pt-36">
          <h1 className="max-w-xl text-3xl font-semibold leading-[1.18] tracking-tight md:text-4xl lg:text-[2.75rem]">
            {t("hero.title")}
          </h1>
          <p className="mt-8 max-w-xl whitespace-pre-line text-lg leading-relaxed text-white/85">
            {t("hero.description")}
          </p>
        </div>
        <div className="relative min-h-[260px] md:min-h-full">
          <StockPhoto
            src={STOCK_PHOTOS.aboutMeeting}
            alt="비영리 단체 회의와 협업 장면"
            className="absolute inset-0 min-h-[260px] md:min-h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            overlayClassName="bg-gradient-to-br from-stone-900/40 via-hapvi-primary/45 to-hapvi-dark/55"
          />
        </div>
      </section>

      {/* 세로 라벨 + 본문 + 사이드 CTA — 참고 3 */}
      <section className="grid border-y border-stone-200/80 md:min-h-[520px] md:grid-cols-[minmax(4rem,5.5rem)_minmax(0,1fr)_minmax(3rem,4rem)]">
        <div className="flex items-center justify-center bg-hapvi-light px-2 py-10 md:py-0">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-hapvi-dark md:[writing-mode:vertical-rl]">
            {th("nav.about")}
          </span>
        </div>
        <div className="bg-white px-8 py-14 md:px-14 lg:px-20 lg:py-20">
          <p className="text-lg leading-relaxed text-ink-muted">
            {t("mission.textLine1")} {t("mission.textLine2")}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted">
            {t("vision.textLine1")} {t("vision.textLine2")}
          </p>
          <p className="mt-10">
            <Link
              href="/services"
              className="text-base font-semibold text-hapvi-dark underline decoration-hapvi-primary/35 underline-offset-[6px] hover:text-hapvi-primary"
            >
              {home("services.learnMore")}
            </Link>
          </p>
        </div>
        <div className="relative hidden bg-hapvi-primary md:block">
          <Link
            href="/contact"
            className="absolute inset-y-8 right-3 flex w-11 items-center justify-center rounded-md border border-white/25 bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-sm transition hover:bg-white/20 [writing-mode:vertical-rl]"
          >
            {ts("apply")}
          </Link>
        </div>
      </section>

      {/* 포토 + 미션 인용 블록 — 참고 3 하단 전환 */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[280px] md:min-h-[380px]">
          <StockPhoto
            src={STOCK_PHOTOS.aboutCommunity}
            alt="지역 공동체와 봉사 활동"
            className="absolute inset-0 min-h-[280px] md:min-h-[380px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            overlayClassName="bg-gradient-to-t from-cream/90 via-hapvi-light/35 to-transparent"
          />
        </div>
        <div className="flex flex-col justify-center bg-hapvi-primary px-8 py-14 text-white md:px-14 lg:px-20 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hapvi-light">{t("mission.label")}</p>
          <p className="mt-6 text-xl font-medium leading-relaxed md:text-[1.35rem]">
            {t("mission.textLine1")}
            <br />
            {t("mission.textLine2")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <article className="rounded-xl border border-stone-100 bg-white p-8 shadow-card md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hapvi-primary">{t("mission.label")}</p>
            <p className="mt-5 text-xl font-medium leading-relaxed text-ink md:text-[1.35rem]">
              {t("mission.textLine1")}
              <br />
              {t("mission.textLine2")}
            </p>
          </article>
          <article className="rounded-xl border border-stone-100 bg-white p-8 shadow-card md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hapvi-primary">{t("vision.label")}</p>
            <p className="mt-5 text-xl font-medium leading-relaxed text-ink md:text-[1.35rem]">
              {t("vision.textLine1")}
              <br />
              {t("vision.textLine2")}
            </p>
          </article>
        </div>

        <h2 className="mt-20 text-center text-[1.65rem] font-semibold tracking-tight text-ink md:text-3xl">{t("work.title")}</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Users className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t("work.accompany.title")}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t("work.accompany.description")}</p>
          </article>
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Unlock className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t("work.accessibility.title")}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t("work.accessibility.description")}</p>
          </article>
          <article className="flex flex-col rounded-xl border border-stone-100 bg-white p-8 shadow-card transition hover:border-hapvi-primary/15">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-hapvi-light text-hapvi-primary">
              <Heart className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{t("work.community.title")}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{t("work.community.description")}</p>
          </article>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-cream-deep px-5 py-14 text-center md:px-8 md:py-16">
        <p className="text-lg font-medium leading-relaxed text-ink">{t("footerLine1")}</p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{t("footerLine2")}</p>
      </section>

      <div className="flex justify-center py-6 md:hidden">
        <Link
          href="/contact"
          className="rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white shadow-soft"
        >
          {ts("apply")}
        </Link>
      </div>
    </div>
  );
}
