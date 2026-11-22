import { NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";
import { Waitlist } from "@/models/waitlist";
import { Course } from "@/models/course";
import { sendWaitlistEmails } from "@/lib/email";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const Body = z.object({
  slug: z.string().min(1).max(120),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/),
  note: z.string().trim().max(500).optional(),
  website: z.string().optional(), // honeypot: real people leave this empty
});

// Public: join a course's waitlist.
export async function POST(req: Request) {
  let data: z.infer<typeof Body>;
  try {
    data = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Please check your name, email and phone number." }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ ok: true }); // bot

  try {
    await connectToDatabase();
    const course: any = await Course.findOne({ slug: data.slug }).lean();
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const existing = await Waitlist.findOne({ courseSlug: data.slug, email: data.email.toLowerCase() });
    if (existing) {
      // Already on the list: refresh details, don't send duplicate emails.
      existing.name = data.name;
      existing.phone = data.phone;
      if (data.note) existing.note = data.note;
      await existing.save();
      return NextResponse.json({ ok: true, already: true });
    }

    await Waitlist.create({
      courseSlug: data.slug,
      courseTitle: course.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      note: data.note,
    });
    await sendWaitlistEmails({ name: data.name, email: data.email, phone: data.phone, courseTitle: course.title, note: data.note });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist POST failed:", err);
    return NextResponse.json({ error: "Could not save. Please try again or WhatsApp us." }, { status: 500 });
  }
}

// Admin: list everyone (newest first).
export async function GET(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const rows = await Waitlist.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(rows.map((r: any) => ({ ...r, _id: String(r._id) })));
}
