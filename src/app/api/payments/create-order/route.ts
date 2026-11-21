import { NextResponse } from "next/server";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/models/course";
import { Enrollment } from "@/models/enrollment";
import { getRazorpay, getRazorpayKeyId } from "@/lib/razorpay";
import { normalizeFeeType } from "@/lib/fees";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  slug: z.string().trim().min(1).max(200),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number"),
});

// Creates a Razorpay order. The amount always comes from the course record in
// MongoDB — anything the browser says about price is ignored.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message || "Invalid details" }, { status: 400 });
  }
  const { slug, name, email, phone } = parsed.data;

  try {
    await connectToDatabase();
    const course: any = await Course.findOne({ slug }).lean();
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const amount = Math.round(Number(course.price) * 100); // rupees → paise
    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json({ error: "This course is not open for online payment yet" }, { status: 400 });
    }

    const feeType = normalizeFeeType(course.feeType);
    const order = await getRazorpay().orders.create({
      amount,
      currency: "INR",
      receipt: `ma_${Date.now().toString(36)}`.slice(0, 40),
      notes: {
        course_slug: slug,
        course_title: String(course.title).slice(0, 250),
        fee_type: feeType,
        student_name: name.slice(0, 250),
        student_email: email.slice(0, 250),
        student_phone: phone.slice(0, 250),
      },
    });

    await Enrollment.create({
      courseSlug: slug,
      courseTitle: course.title,
      feeType,
      name,
      email,
      phone,
      amount,
      currency: "INR",
      razorpayOrderId: order.id,
      status: "created",
    });

    return NextResponse.json({
      keyId: getRazorpayKeyId(),
      orderId: order.id,
      amount,
      currency: "INR",
      courseTitle: course.title,
      feeType,
    });
  } catch (err) {
    console.error("create-order failed:", err);
    return NextResponse.json({ error: "Could not start the payment. Try again in a moment." }, { status: 500 });
  }
}
