import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Enrollment } from "@/models/enrollment";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Admin only: every enrollment / payment attempt, newest first. */
export async function GET(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const rows = await Enrollment.find({})
    .select("courseSlug courseTitle feeType name email phone amount currency razorpayOrderId razorpayPaymentId status paidAt createdAt")
    .sort({ createdAt: -1 })
    .limit(2000)
    .lean();
  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
