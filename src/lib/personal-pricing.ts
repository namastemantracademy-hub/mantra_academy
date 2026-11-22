// Monthly guru dakṣiṇā for one-to-one classes (same for every course that offers them).
export type PersonalPricing = { usd: number; inr: number };
export const DEFAULT_PERSONAL_PRICING: PersonalPricing = { usd: 190, inr: 17800 };
/** What a personal (one-to-one) student gets. `courseLine` describes the course content. */
export function personalDetails(courseLine?: string): string[] {
  return [
    "One-to-one live classes with your Āchārya",
    "2 classes a week · 1 hour each · 8 classes a month",
    "A fixed time slot reserved only for you",
    "Learn at your own pace — start from your level, beginner or advanced",
    courseLine || "The complete course, taught fully to you",
    "Correction of every syllable, svara and pause — in every class",
    "Recordings of every class to practise with",
    "Course manual included",
    "Direct WhatsApp support from your Āchārya between classes",
    "Reschedule a class with prior notice, by mutual understanding",
  ];
}
export const PERSONAL_DETAILS = personalDetails();

export function cleanPricing(v: any): PersonalPricing {
  const usd = Math.round(Number(v?.usd));
  const inr = Math.round(Number(v?.inr));
  return {
    usd: usd > 0 && usd < 100000 ? usd : DEFAULT_PERSONAL_PRICING.usd,
    inr: inr > 0 && inr < 10000000 ? inr : DEFAULT_PERSONAL_PRICING.inr,
  };
}
