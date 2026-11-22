import { NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";
import { PersonalRequest } from "@/models/personal-request";
import { Course } from "@/models/course";
import { sendPersonalRequestEmails } from "@/lib/email";
import { isAdminRequest } from "@/lib/admin-auth";
import { consentBody, consentRecord, guardianProblem } from "@/lib/consent";
import { getCourseExperience } from "@/lib/course-experience";

export const dynamic = "force-dynamic";

const Body = z.object({
  slug: z.string().min(1).max(120),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/),
  country: z.string().trim().max(80).optional(),
  timezone: z.string().trim().max(80).optional(),
  preferredTimes: z.string().trim().max(300).optional(),
  note: z.string().trim().max(600).optional(),
  ...consentBody,
  website: z.string().optional(), // honeypot
});

// Public: ask for one-to-one classes.
export async function POST(req: Request) {
  let data: z.infer<typeof Body>;
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      const consentIssue = parsed.error.issues.find((i) => i.path[0] === "consent");
      return NextResponse.json({ error: consentIssue?.message || "Please check your name, email and phone number." }, { status: 400 });
    }
    data = parsed.data;
  } catch {
    return NextResponse.json({ error: "Please check your name, email and phone number." }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ ok: true }); // bot
  const gp = guardianProblem(data.slug, data.guardian);
  if (gp) return NextResponse.json({ error: gp }, { status: 400 });

  try {
    await connectToDatabase();
    const course: any = await Course.findOne({ slug: data.slug }).lean();
    if (!course || !getCourseExperience(data.slug).personal || course.personalClasses === false) {
      return NextResponse.json({ error: "Personal classes aren't available for this course." }, { status: 404 });
    }
    const courseTitle = getCourseExperience(data.slug).displayTitle || course.title;

    // Same person, same course, still open → update instead of duplicating.
    const existing = await PersonalRequest.findOne({ courseSlug: data.slug, email: data.email.toLowerCase(), status: { $in: ["new", "contacted"] } });
    if (existing) {
      Object.assign(existing, { name: data.name, phone: data.phone, country: data.country, timezone: data.timezone, preferredTimes: data.preferredTimes, note: data.note, consent: consentRecord(data.slug, data.guardian) });
      await existing.save();
      return NextResponse.json({ ok: true, already: true });
    }

    await PersonalRequest.create({ courseSlug: data.slug, courseTitle, name: data.name, email: data.email, phone: data.phone, country: data.country, timezone: data.timezone, preferredTimes: data.preferredTimes, note: data.note, consent: consentRecord(data.slug, data.guardian) });
    await sendPersonalRequestEmails({ ...data, courseTitle });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("personal request POST failed:", err);
    return NextResponse.json({ error: "Could not send. Please try again or WhatsApp us." }, { status: 500 });
  }
}

// Admin: list requests.
export async function GET(req: Request) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const rows = await PersonalRequest.find({}).sort({ createdAt: -1 }).limit(1000).lean();
  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
