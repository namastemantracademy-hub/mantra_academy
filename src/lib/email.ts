import nodemailer, { type Transporter } from "nodemailer";
import type { IEnrollment } from "@/models/enrollment";
import { feeNote, feeReceiptSuffix } from "@/lib/fees";

// Sends mail through Gmail using an App Password (not the normal Gmail password).
// GMAIL_USER          the Gmail address that sends the mail
// GMAIL_APP_PASSWORD  16-character App Password from Google Account > Security
// ADMIN_NOTIFY_EMAIL  where enrollment alerts go (defaults to GMAIL_USER)

let transporter: Transporter | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  }
  return transporter;
}

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAmount(e: IEnrollment): string {
  const rupees = (e.amount / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  return `₹${rupees} ${feeReceiptSuffix(e.feeType)}`;
}

function shell(inner: string): string {
  return `<div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:24px;background:#FBF7EF;color:#2A2018;border-radius:12px">
<p style="font-size:20px;margin:0 0 16px;color:#8A3B0F">Mantra Academy</p>
${inner}
<p style="font-size:13px;color:#6B5B4B;margin-top:24px">Mantra Academy · mantracademy.in</p>
</div>`;
}

export async function sendEnrollmentEmails(e: IEnrollment): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.warn("Email not sent: GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    return false;
  }
  const from = `"Mantra Academy" <${process.env.GMAIL_USER}>`;
  const adminTo = process.env.ADMIN_NOTIFY_EMAIL || process.env.GMAIL_USER!;
  const name = escapeHtml(e.name);
  const course = escapeHtml(e.courseTitle);
  const paymentId = escapeHtml(e.razorpayPaymentId || "");
  const amount = escapeHtml(formatAmount(e));

  const studentHtml = shell(`
<p>Namaste ${name},</p>
<p>Thank you for enrolling in <b>${course}</b>. Your payment was received.</p>
<table style="font-size:14px;margin:12px 0">
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Course</td><td>${course}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Amount</td><td>${amount}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Payment ID</td><td>${paymentId}</td></tr>
</table>
<p style="font-size:14px;color:#6B5B4B">${escapeHtml(feeNote(e.feeType))}</p>
<p><b>Next steps</b></p>
<ol style="padding-left:18px">
<li>We will contact you on WhatsApp or email within 24 hours with your class link and batch details.</li>
<li>Keep this email as your payment receipt.</li>
<li>Questions? Reply to this email.</li>
</ol>`);

  const adminHtml = shell(`
<p><b>New enrollment</b></p>
<table style="font-size:14px">
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Course</td><td>${course}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Name</td><td>${name}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Email</td><td>${escapeHtml(e.email)}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Phone</td><td>${escapeHtml(e.phone)}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Amount</td><td>${amount}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Payment ID</td><td>${paymentId}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#6B5B4B">Order ID</td><td>${escapeHtml(e.razorpayOrderId)}</td></tr>
</table>`);

  const results = await Promise.allSettled([
    t.sendMail({ from, to: e.email, replyTo: adminTo, subject: `Enrollment confirmed: ${e.courseTitle}`, html: studentHtml }),
    t.sendMail({ from, to: adminTo, replyTo: e.email, subject: `New enrollment: ${e.courseTitle} — ${e.name}`, html: adminHtml }),
  ]);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Enrollment email failed:", r.reason);
  });
  return results.every((r) => r.status === "fulfilled");
}
