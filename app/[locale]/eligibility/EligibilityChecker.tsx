"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {
  evaluateEligibility,
  type BenefitId,
  type BenefitResult,
  type HouseholdSizeChoice,
  type HousingType,
  type ImmigrationStatus,
  type IncomeBand,
  type RejectReasonKey,
} from "@/lib/eligibility-rules";
import {ChevronLeft, ChevronRight, ExternalLink} from "lucide-react";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";

const choiceClass = (selected: boolean) =>
  [
    "w-full rounded-lg border px-4 py-3 text-left text-sm transition",
    selected
      ? "border-hapvi-primary bg-hapvi-light font-semibold text-hapvi-dark ring-2 ring-hapvi-primary/20"
      : "border-stone-200 bg-white text-ink hover:border-hapvi-primary/40",
  ].join(" ");

const TOTAL_STEPS = 4;
type StepIndex = 0 | 1 | 2 | 3 | 4;

export default function EligibilityChecker({locale: urlLocale}: {locale: Locale}) {
  const {messages, setLocale} = useLocale();
  const t = messages.Eligibility;

  useEffect(() => {
    setLocale(urlLocale);
  }, [urlLocale, setLocale]);

  const [step, setStep] = useState<StepIndex>(0);
  const [householdSize, setHouseholdSize] = useState<HouseholdSizeChoice | null>(null);
  const [incomeBand, setIncomeBand] = useState<IncomeBand | null>(null);
  const [housing, setHousing] = useState<HousingType | null>(null);
  const [immigration, setImmigration] = useState<ImmigrationStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo<BenefitResult[] | null>(() => {
    if (
      step !== 4 ||
      householdSize === null ||
      incomeBand === null ||
      housing === null ||
      immigration === null
    ) {
      return null;
    }
    return evaluateEligibility({householdSize, incomeBand, housing, immigration});
  }, [step, householdSize, incomeBand, housing, immigration]);

  const eligibleResults = results?.filter((r) => r.eligible) ?? [];
  const ineligibleResults = results?.filter((r) => !r.eligible) ?? [];

  const stepLabel = t.steps.label
    .replace("{current}", String(Math.min(step + 1, TOTAL_STEPS)))
    .replace("{total}", String(TOTAL_STEPS));

  function resetForm() {
    setStep(0);
    setHouseholdSize(null);
    setIncomeBand(null);
    setHousing(null);
    setImmigration(null);
    setError(null);
  }

  function validateCurrentStep(): boolean {
    if (step === 0 && householdSize === null) {
      setError(t.validation.householdRequired);
      return false;
    }
    if (step === 1 && incomeBand === null) {
      setError(t.validation.incomeRequired);
      return false;
    }
    if (step === 2 && housing === null) {
      setError(t.validation.housingRequired);
      return false;
    }
    if (step === 3 && immigration === null) {
      setError(t.validation.immigrationRequired);
      return false;
    }
    setError(null);
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    if (step < 3) setStep((step + 1) as StepIndex);
    else setStep(4);
  }

  function goBack() {
    setError(null);
    if (step > 0 && step <= 4) setStep((step - 1) as StepIndex);
  }

  const progressPct = step >= 4 ? 100 : ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-hapvi-primary px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{t.hero.badge}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{t.hero.description}</p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto -mt-10 max-w-3xl rounded-2xl border border-stone-200/80 bg-white p-6 shadow-card md:p-8">
          {step < 4 && (
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-muted">
                <span>{stepLabel}</span>
                <span>{Math.round(progressPct)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-cream-deep">
                <div
                  className="h-full rounded-full bg-hapvi-primary transition-all duration-300"
                  style={{width: `${progressPct}%`}}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}

          {step === 0 && (
            <fieldset>
              <legend className="text-xl font-semibold text-ink">{t.steps.household.title}</legend>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.steps.household.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {([1, 2, 3, 4, 5] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={choiceClass(householdSize === n)}
                    onClick={() => {
                      setHouseholdSize(n);
                      setError(null);
                    }}
                  >
                    {n === 5 ? t.steps.household.fivePlus : t.steps.household.members[n - 1]}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="text-xl font-semibold text-ink">{t.steps.income.title}</legend>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.steps.income.description}</p>
              <div className="mt-6 space-y-2">
                {(
                  [
                    ["band_0_1000", t.steps.income.band0],
                    ["band_1001_2000", t.steps.income.band1],
                    ["band_2001_3000", t.steps.income.band2],
                    ["band_3001_4000", t.steps.income.band3],
                    ["band_4001_plus", t.steps.income.band4],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={choiceClass(incomeBand === value)}
                    onClick={() => {
                      setIncomeBand(value);
                      setError(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-xl font-semibold text-ink">{t.steps.housing.title}</legend>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.steps.housing.description}</p>
              <div className="mt-6 space-y-2">
                {(
                  [
                    ["rent", t.steps.housing.rent],
                    ["own", t.steps.housing.own],
                    ["homeless", t.steps.housing.homeless],
                    ["other", t.steps.housing.other],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={choiceClass(housing === value)}
                    onClick={() => {
                      setHousing(value);
                      setError(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="text-xl font-semibold text-ink">{t.steps.immigration.title}</legend>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.steps.immigration.description}</p>
              <div className="mt-6 space-y-2">
                {(
                  [
                    ["citizen_lpr", t.steps.immigration.citizenLpr],
                    ["legal", t.steps.immigration.legal],
                    ["unknown", t.steps.immigration.unknown],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={choiceClass(immigration === value)}
                    onClick={() => {
                      setImmigration(value);
                      setError(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && results && (
            <div>
              <h2 className="text-xl font-semibold text-ink">{t.steps.results.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.steps.results.description}</p>

              {eligibleResults.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-hapvi-primary">
                    {t.results.eligibleHeading}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {eligibleResults.map((item) => (
                      <EligibleCard key={item.id} id={item.id} t={t} />
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-8 rounded-lg bg-cream-muted px-4 py-4 text-sm text-ink-muted">{t.results.noneEligible}</p>
              )}

              {ineligibleResults.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                    {t.results.ineligibleHeading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {ineligibleResults.map((item) => (
                      <IneligibleCard key={item.id} result={item} t={t} />
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-8 rounded-lg bg-cream-muted px-4 py-3 text-xs leading-relaxed text-ink-muted">
                {t.disclaimer}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink hover:bg-cream-muted"
                >
                  {t.actions.startOver}
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-hapvi-primary px-5 py-3 text-sm font-semibold text-white hover:bg-hapvi-dark"
                >
                  {t.actions.contactCta}
                </Link>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center justify-center gap-1 rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40 hover:bg-cream-muted"
              >
                <ChevronLeft className="h-4 w-4" />
                {t.actions.back}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center gap-1 rounded-md bg-hapvi-primary px-6 py-3 text-sm font-semibold text-white hover:bg-hapvi-dark"
              >
                {step === 3 ? t.actions.seeResults : t.actions.next}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

type EligibilityMessages = (typeof import("@/messages/ko.json"))["Eligibility"];

function EligibleCard({id, t}: {id: BenefitId; t: EligibilityMessages}) {
  const benefit = t.benefits[id];
  return (
    <li className="rounded-xl border border-hapvi-primary/20 bg-hapvi-light/30 p-5">
      <h4 className="text-lg font-semibold text-ink">{benefit.name}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{benefit.summary}</p>
      <a
        href={benefit.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-hapvi-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-hapvi-dark"
      >
        {benefit.applyLabel}
        <ExternalLink className="h-4 w-4" />
      </a>
    </li>
  );
}

function IneligibleCard({result, t}: {result: BenefitResult; t: EligibilityMessages}) {
  const benefit = t.benefits[result.id];
  const reason =
    result.rejectReasonKey !== null ? t.rejectReasons[result.rejectReasonKey as RejectReasonKey] : "";
  return (
    <li className="rounded-lg border border-stone-200 bg-stone-50 p-4">
      <h4 className="text-base font-semibold text-stone-500">{benefit.name}</h4>
      <p className="mt-1 text-sm text-stone-500">{reason}</p>
    </li>
  );
}
