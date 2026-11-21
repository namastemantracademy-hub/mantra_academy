// How a course's price should be described. Safe to import in browser and server code.
//
// "registration" (default): the price is a registration fee that also counts as the
//   first month's fee. Later months are collected outside this website.
// "full": the price is the total fee (e.g. a workshop) — nothing more to pay.

export type FeeType = "registration" | "full";

export function normalizeFeeType(value: unknown): FeeType {
  return value === "full" ? "full" : "registration";
}

export function formatRupees(price?: number | null): string {
  if (typeof price !== "number" || !Number.isFinite(price)) return "";
  return `₹${price.toLocaleString("en-IN")}`;
}

export function feeLabel(feeType: unknown): string {
  return normalizeFeeType(feeType) === "full"
    ? "Total workshop fee"
    : "Registration fee, includes your first month";
}

export function feeShortLabel(feeType: unknown): string {
  return normalizeFeeType(feeType) === "full" ? "Total fee" : "Registration + 1st month";
}

export function feeNote(feeType: unknown): string {
  return normalizeFeeType(feeType) === "full"
    ? "This is the total workshop fee. Nothing more to pay."
    : "This is your registration fee and also counts as your first month's fee. Fees from the second month are collected separately. We'll share the details after you join.";
}

export function feeReceiptSuffix(feeType: unknown): string {
  return normalizeFeeType(feeType) === "full" ? "(total workshop fee)" : "(registration + first month)";
}
