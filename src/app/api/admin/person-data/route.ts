import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Enrollment } from "@/models/enrollment";
import { Waitlist } from "@/models/waitlist";
import { PersonalRequest } from "@/models/personal-request";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/**
 * Admin only: find or delete everything we hold about one person (DPDP Act
 * requests). Search by email, or by phone (last 10 digits).
 * Paid enrollments are kept, because accounts and tax law need payment records.
 */
function filterFor(q: string) {
  const query = q.trim();
  if (query.includes("@")) return { email: query.toLowerCase() };
  const digits = query.replace(/\D/g, "").slice(-10);
  if (digits.length < 7) return null;
  return { phone: { $regex: digits.split("").join("\\D*") + "\\D*$" } };
}

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = new URL(req.url).searchParams.get("q") || "";
  const f = filterFor(q);
  if (!f) return NextResponse.json({ error: "Enter an email, or a phone number with at least 7 digits." }, { status: 400 });
  await connectToDatabase();
  const fields = "courseSlug courseTitle name email phone status createdAt consent";
  const [enrollments, waitlist, requests] = await Promise.all([
    Enrollment.find(f).select(fields + " amount paidAt razorpayPaymentId").sort({ createdAt: -1 }).limit(200).lean(),
    Waitlist.find(f).select(fields + " notifiedAt").sort({ createdAt: -1 }).limit(200).lean(),
    PersonalRequest.find(f).select(fields + " country timezone preferredTimes note").sort({ createdAt: -1 }).limit(200).lean(),
  ]);
  return NextResponse.json({ enrollments, waitlist, requests }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { q } = await req.json().catch(() => ({ q: "" }));
  const f = filterFor(String(q || ""));
  if (!f) return NextResponse.json({ error: "Enter an email, or a phone number with at least 7 digits." }, { status: 400 });
  await connectToDatabase();
  const [w, r, e] = await Promise.all([
    Waitlist.deleteMany(f),
    PersonalRequest.deleteMany(f),
    Enrollment.deleteMany({ ...f, status: { $ne: "paid" } }),
  ]);
  const keptPaid = await Enrollment.countDocuments({ ...f, status: "paid" });
  return NextResponse.json({ deleted: { waitlist: w.deletedCount, requests: r.deletedCount, unpaid: e.deletedCount }, keptPaid });
}
