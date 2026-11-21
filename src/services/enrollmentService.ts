import connectToDatabase from "@/lib/mongodb";
import { Enrollment, IEnrollment } from "@/models/enrollment";
import { sendEnrollmentEmails } from "@/lib/email";

// Marks an order as paid. Both the checkout verify route and the webhook call
// this; whichever arrives first flips the status and sends the emails, so a
// student is never recorded or emailed twice.
export async function markEnrollmentPaid(
  orderId: string,
  paymentId: string,
  source: "checkout" | "webhook"
): Promise<IEnrollment | null> {
  await connectToDatabase();

  const updated = await Enrollment.findOneAndUpdate(
    { razorpayOrderId: orderId, status: { $ne: "paid" } },
    { $set: { status: "paid", razorpayPaymentId: paymentId, paidAt: new Date(), confirmedBy: source } },
    { new: true }
  );

  if (!updated) {
    // Already paid (or unknown order) — return whatever exists, send nothing.
    return Enrollment.findOne({ razorpayOrderId: orderId });
  }

  try {
    const sent = await sendEnrollmentEmails(updated);
    if (sent) {
      updated.emailsSentAt = new Date();
      await updated.save();
    }
  } catch (err) {
    // A mail problem must never undo a successful payment.
    console.error("sendEnrollmentEmails error:", err);
  }
  return updated;
}

export async function markEnrollmentFailed(orderId: string): Promise<void> {
  await connectToDatabase();
  await Enrollment.updateOne({ razorpayOrderId: orderId, status: "created" }, { $set: { status: "failed" } });
}
