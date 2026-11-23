import mongoose, { Schema, Document } from "mongoose";
import { consentSchemaDef } from "@/lib/consent";

// One record per Razorpay order. It starts as "created" when the student
// opens checkout and becomes "paid" once the payment signature (or the
// Razorpay webhook) confirms it.
export interface IEnrollment extends Document {
  courseSlug: string;
  courseTitle: string;
  feeType: "registration" | "full";
  name: string;
  email: string;
  phone: string;
  amount: number; // in paise (₹1 = 100 paise), exactly as sent to Razorpay
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: "created" | "paid" | "failed";
  paidAt?: Date;
  confirmedBy?: "checkout" | "webhook";
  emailsSentAt?: Date;
  /** Where the record came from. "google-form": registered on our old Google Form and paid outside the website. */
  source?: "website" | "google-form";
  /** Proof of consent (DPDP Act): when they ticked the box, and which policy version. */
  consent?: { agreedAt?: Date; version?: string; guardian?: boolean };
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    courseSlug: { type: String, required: true, index: true },
    courseTitle: { type: String, required: true },
    feeType: { type: String, enum: ["registration", "full"], default: "registration" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, index: true, sparse: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created", index: true },
    paidAt: Date,
    confirmedBy: { type: String, enum: ["checkout", "webhook"] },
    emailsSentAt: Date,
    source: { type: String, enum: ["website", "google-form"] },
    consent: consentSchemaDef,
  },
  { timestamps: true }
);

export const Enrollment =
  (mongoose.models.Enrollment as mongoose.Model<IEnrollment>) ||
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
