import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Enrollment } from "@/models/enrollment";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { markEnrollmentFailed, markEnrollmentPaid } from "@/services/enrollmentService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Razorpay calls this URL directly (server to server). It is the backup that
// records a payment even if the student closed the browser before the
// thank-you page loaded. Subscribe to: payment.captured, order.paid, payment.failed.
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  try {
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("webhook not configured:", err);
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const payment = event?.payload?.payment?.entity;
    const orderId: string | undefined = payment?.order_id || event?.payload?.order?.entity?.id;

    if (!orderId || !payment?.id) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (event.event === "payment.captured" || event.event === "order.paid") {
      await connectToDatabase();
      const enrollment = await Enrollment.findOne({ razorpayOrderId: orderId }).lean();
      if (!enrollment) {
        // Not an order from this website (e.g. a payment link) — acknowledge and ignore.
        return NextResponse.json({ ok: true, ignored: true });
      }
      if (Number(payment.amount) !== Number(enrollment.amount)) {
        console.error("webhook amount mismatch", { orderId, expected: enrollment.amount, got: payment.amount });
        return NextResponse.json({ ok: true, flagged: "amount_mismatch" });
      }
      await markEnrollmentPaid(orderId, payment.id, "webhook");
    } else if (event.event === "payment.failed") {
      await markEnrollmentFailed(orderId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("webhook processing failed:", err);
    // 500 makes Razorpay retry later.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
