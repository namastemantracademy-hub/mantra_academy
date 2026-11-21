import Link from "next/link";
import { CheckCircle2, Clock, Mail, MessageCircle } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import { Enrollment } from "@/models/enrollment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { feeNote, feeReceiptSuffix } from "@/lib/fees";

export const dynamic = "force-dynamic";

async function getEnrollment(orderId?: string) {
  if (!orderId || !/^order_[A-Za-z0-9]{6,40}$/.test(orderId)) return null;
  try {
    await connectToDatabase();
    return await Enrollment.findOne({ razorpayOrderId: orderId }).lean();
  } catch (err) {
    console.error("thank-you lookup failed:", err);
    return null;
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const enrollment: any = await getEnrollment(order);
  const paid = enrollment?.status === "paid";
  const firstName = enrollment?.name ? String(enrollment.name).split(" ")[0] : "";
  const whatsappUrl = process.env.WHATSAPP_COMMUNITY_URL;

  if (!enrollment) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h1 className="text-3xl font-headline font-bold text-primary">We couldn't find that order</h1>
        <p className="text-foreground/80">
          If money was deducted, don't worry — write to us at{" "}
          <a className="underline" href="mailto:namaste.mantracademy@gmail.com">namaste.mantracademy@gmail.com</a>{" "}
          with your payment details and we'll sort it out.
        </p>
        <Button asChild><Link href="/courses">Back to courses</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 md:py-16 space-y-8">
      <div className="text-center space-y-3">
        {paid ? (
          <CheckCircle2 className="h-14 w-14 text-primary mx-auto" aria-hidden />
        ) : (
          <Clock className="h-14 w-14 text-primary mx-auto" aria-hidden />
        )}
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          {paid ? `Namaste${firstName ? `, ${firstName}` : ""}. You're enrolled.` : "We're confirming your payment"}
        </h1>
        <p className="text-lg text-foreground/80">
          {paid
            ? <>Your payment for <b>{enrollment.courseTitle}</b> was received.</>
            : <>This usually takes under a minute. Refresh this page shortly — you'll also get an email once it's confirmed.</>}
        </p>
      </div>

      <Card className="border border-primary/20 rounded-xl">
        <CardContent className="p-6">
          <dl className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2 text-sm md:text-base">
            <dt className="text-muted-foreground">Course</dt>
            <dd className="font-medium">{enrollment.courseTitle}</dd>
            <dt className="text-muted-foreground">Amount</dt>
            <dd className="font-medium">
              ₹{(enrollment.amount / 100).toLocaleString("en-IN")}
              {" "}{feeReceiptSuffix(enrollment.feeType)}
            </dd>
            {enrollment.razorpayPaymentId && (
              <>
                <dt className="text-muted-foreground">Payment ID</dt>
                <dd className="font-mono break-all">{enrollment.razorpayPaymentId}</dd>
              </>
            )}
            <dt className="text-muted-foreground">Order ID</dt>
            <dd className="font-mono break-all">{enrollment.razorpayOrderId}</dd>
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">{feeNote(enrollment.feeType)}</p>
        </CardContent>
      </Card>

      {paid && (
        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-primary">Next steps</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden />
              <span>Check your email — we've sent your receipt and welcome note. Look in Promotions or Spam if you don't see it.</span>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden />
              <span>Within 24 hours we'll message you on WhatsApp with your class link, batch timings and materials.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden />
              <span>Save your Payment ID above. Questions? Write to namaste.mantracademy@gmail.com.</span>
            </li>
          </ol>
          <div className="flex flex-wrap gap-3 pt-2">
            {whatsappUrl && (
              <Button asChild size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">Join the WhatsApp community</a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg"><Link href="/courses">Explore more courses</Link></Button>
          </div>
        </section>
      )}
    </div>
  );
}
