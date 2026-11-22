// Small helpers shared by the admin screens.
import { getCourseExperience } from "@/lib/course-experience";

export type AdminEnrollment = {
  _id: string; courseSlug: string; courseTitle: string; feeType?: string; name: string; email: string; phone: string;
  amount: number; currency?: string; razorpayOrderId: string; razorpayPaymentId?: string;
  status: "created" | "paid" | "failed"; paidAt?: string; createdAt: string;
};
export type AdminWait = { _id: string; courseSlug: string; courseTitle: string; name: string; email: string; phone: string; notifiedAt?: string; createdAt: string };
export type AdminCourse = { slug: string; title: string; image?: any; price?: number; startDate?: string; registrationsOpen?: boolean; batchInfo?: string; featured?: boolean };

export async function getJSON<T>(url: string, fallback: T): Promise<T> {
  try {
    const r = await fetch(url, { credentials: "same-origin", cache: "no-store" });
    return r.ok ? ((await r.json()) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const courseName = (slug: string, title?: string) => getCourseExperience(slug).displayTitle || title || slug;
export const rupees = (paise: number) => "₹" + Math.round((paise || 0) / 100).toLocaleString("en-IN");
export const shortDate = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
};
export const dateTime = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? "" : t.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
};
/** Digits only, with India's code added for 10-digit numbers — for wa.me links. */
export const waNumber = (phone: string) => {
  const d = (phone || "").replace(/\D/g, "");
  return d.length === 10 ? "91" + d : d;
};
export const imgUrl = (image: any): string | undefined =>
  !image ? undefined : typeof image === "string" ? image : image.secure_url || image.url || image.src;
