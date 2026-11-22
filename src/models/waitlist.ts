import mongoose, { Schema, Document } from "mongoose";

// People who asked to be told when the next batch of a course opens.
export interface IWaitlist extends Document {
  courseSlug: string;
  courseTitle: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  notifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    courseSlug: { type: String, required: true, index: true },
    courseTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    note: { type: String, trim: true },
    notifiedAt: { type: Date },
  },
  { timestamps: true },
);

// One entry per person per course.
WaitlistSchema.index({ courseSlug: 1, email: 1 }, { unique: true });

export const Waitlist =
  (mongoose.models.Waitlist as mongoose.Model<IWaitlist>) ||
  mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);
