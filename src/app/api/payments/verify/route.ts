import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCheckoutSignature } from "@/lib/razorpay";
import { markEnrollmentPaid } from "@/services/enrollmentService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  razorpay_order_id: z.string().min(1).max(100),
  razorpay_payment_id: z.string().min(1).max(100),
  razorpay_signature: z.string().min(1).max(200),
});

// Called by the browser right after Razorpay Checkout succeeds. The payment is
// only accepted if the signature matches, which proves it came from Razorpay.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  try {
    if (!verifyCheckoutSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });
    }
    const enrollment = await markEnrollmentPaid(razorpay_order_id, razorpay_payment_id, "checkout");
    if (!enrollment) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json({ ok: true, orderId: razorpay_order_id, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error("verify failed:", err);
    return NextResponse.json({ error: "Could not confirm the payment" }, { status: 500 });
  }
}
