/**
 * 혜택 자격 스크리닝 — 정적 규칙 (DB 없음).
 * 가구 4명 기준 월 소득 한도를 가구원 수에 비례 조정 (안내용, 공식 심사 아님).
 */

export type HouseholdSizeChoice = 1 | 2 | 3 | 4 | 5;

export type IncomeBand =
  | "band_0_1000"
  | "band_1001_2000"
  | "band_2001_3000"
  | "band_3001_4000"
  | "band_4001_plus";

export type HousingType = "rent" | "own" | "homeless" | "other";

export type ImmigrationStatus = "citizen_lpr" | "legal" | "unknown";

export type BenefitId =
  | "section8"
  | "calfresh"
  | "medi-cal"
  | "liheap"
  | "emergency-rental";

export type RejectReasonKey =
  | "income_too_high"
  | "not_renting"
  | "immigration_required"
  | "immigration_uncertain";

export interface EligibilityInput {
  householdSize: HouseholdSizeChoice;
  incomeBand: IncomeBand;
  housing: HousingType;
  immigration: ImmigrationStatus;
}

export interface BenefitResult {
  id: BenefitId;
  eligible: boolean;
  rejectReasonKey: RejectReasonKey | null;
}

const BASE_HOUSEHOLD = 4;

/** 가구 4명 기준 한도 → 가구원 수에 비례 */
function scaledLimit(baseForHousehold4: number, householdSize: HouseholdSizeChoice): number {
  const size = householdSize === 5 ? 5 : householdSize;
  return Math.round(baseForHousehold4 * (size / BASE_HOUSEHOLD));
}

/** 소득 구간의 상한(보수적 판단: 구간 최댓값으로 비교) */
function incomeBandUpper(band: IncomeBand): number {
  switch (band) {
    case "band_0_1000":
      return 1000;
    case "band_1001_2000":
      return 2000;
    case "band_2001_3000":
      return 3000;
    case "band_3001_4000":
      return 4000;
    case "band_4001_plus":
      return 99999;
  }
}

function meetsIncome(band: IncomeBand, limit: number): boolean {
  return incomeBandUpper(band) <= limit;
}

function isRenting(housing: HousingType): boolean {
  return housing === "rent";
}

function hasLegalImmigration(status: ImmigrationStatus): boolean {
  return status === "citizen_lpr" || status === "legal";
}

function evaluateSection8(input: EligibilityInput): BenefitResult {
  const limit = scaledLimit(3000, input.householdSize);
  if (!meetsIncome(input.incomeBand, limit)) {
    return {id: "section8", eligible: false, rejectReasonKey: "income_too_high"};
  }
  if (!isRenting(input.housing)) {
    return {id: "section8", eligible: false, rejectReasonKey: "not_renting"};
  }
  if (input.immigration === "unknown") {
    return {id: "section8", eligible: false, rejectReasonKey: "immigration_uncertain"};
  }
  if (!hasLegalImmigration(input.immigration)) {
    return {id: "section8", eligible: false, rejectReasonKey: "immigration_required"};
  }
  return {id: "section8", eligible: true, rejectReasonKey: null};
}

function evaluateCalFresh(input: EligibilityInput): BenefitResult {
  const limit = scaledLimit(3250, input.householdSize);
  if (!meetsIncome(input.incomeBand, limit)) {
    return {id: "calfresh", eligible: false, rejectReasonKey: "income_too_high"};
  }
  return {id: "calfresh", eligible: true, rejectReasonKey: null};
}

function evaluateMediCal(input: EligibilityInput): BenefitResult {
  const limit = scaledLimit(3500, input.householdSize);
  if (!meetsIncome(input.incomeBand, limit)) {
    return {id: "medi-cal", eligible: false, rejectReasonKey: "income_too_high"};
  }
  if (input.immigration === "unknown") {
    return {id: "medi-cal", eligible: false, rejectReasonKey: "immigration_uncertain"};
  }
  if (!hasLegalImmigration(input.immigration)) {
    return {id: "medi-cal", eligible: false, rejectReasonKey: "immigration_required"};
  }
  return {id: "medi-cal", eligible: true, rejectReasonKey: null};
}

function evaluateLiheap(input: EligibilityInput): BenefitResult {
  const limit = scaledLimit(3000, input.householdSize);
  if (!meetsIncome(input.incomeBand, limit)) {
    return {id: "liheap", eligible: false, rejectReasonKey: "income_too_high"};
  }
  return {id: "liheap", eligible: true, rejectReasonKey: null};
}

function evaluateEmergencyRental(input: EligibilityInput): BenefitResult {
  const limit = scaledLimit(3500, input.householdSize);
  if (!meetsIncome(input.incomeBand, limit)) {
    return {id: "emergency-rental", eligible: false, rejectReasonKey: "income_too_high"};
  }
  if (!isRenting(input.housing)) {
    return {id: "emergency-rental", eligible: false, rejectReasonKey: "not_renting"};
  }
  return {id: "emergency-rental", eligible: true, rejectReasonKey: null};
}

export function evaluateEligibility(input: EligibilityInput): BenefitResult[] {
  return [
    evaluateSection8(input),
    evaluateCalFresh(input),
    evaluateMediCal(input),
    evaluateLiheap(input),
    evaluateEmergencyRental(input),
  ];
}

export const BENEFIT_IDS: BenefitId[] = [
  "section8",
  "calfresh",
  "medi-cal",
  "liheap",
  "emergency-rental",
];
