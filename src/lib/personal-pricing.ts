// Monthly guru dakṣiṇā for one-to-one classes (same for every course that offers them).
export type PersonalPricing = { usd: number; inr: number };
export const DEFAULT_PERSONAL_PRICING: PersonalPricing = { usd: 190, inr: 17800 };
export const PERSONAL_DETAILS = [
  "One-to-one, online",
  "2 classes a week · 1 hour each",
  "8 classes every month",
  "A time slot reserved for you",
];

export function cleanPricing(v: any): PersonalPricing {
  const usd = Math.round(Number(v?.usd));
  const inr = Math.round(Number(v?.inr));
  return {
    usd: usd > 0 && usd < 100000 ? usd : DEFAULT_PERSONAL_PRICING.usd,
    inr: inr > 0 && inr < 10000000 ? inr : DEFAULT_PERSONAL_PRICING.inr,
  };
}
