import mongoose, { Schema, Document } from "mongoose";
import { consentSchemaDef } from "@/lib/consent";

// Someone asking for one-to-one classes. We agree a time slot first, then send a payment link.
export interface IPersonalRequest extends Document {
  courseSlug: string;
  courseTitle: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  timezone?: string;
  preferredTimes?: string;
  note?: string;
  status: "new" | "contacted" | "confirmed" | "closed";
  /** Proof of consent (DPDP Act): when they ticked the box, and which policy version. */
  consent?: { agreedAt?: Date; version?: string; guardian?: boolean };
  createdAt: Date;
  updatedAt: Date;
}

const PersonalRequestSchema = new Schema<IPersonalRequest>(
  {
    courseSlug: { type: String, required: true, index: true },
    courseTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    timezone: { type: String, trim: true },
    preferredTimes: { type: String, trim: true },
    note: { type: String, trim: true },
    status: { type: String, enum: ["new", "contacted", "confirmed", "closed"], default: "new", index: true },
    consent: consentSchemaDef,
  },
  { timestamps: true },
);

export const PersonalRequest =
  (mongoose.models.PersonalRequest as mongoose.Model<IPersonalRequest>) ||
  mongoose.model<IPersonalRequest>("PersonalRequest", PersonalRequestSchema);
