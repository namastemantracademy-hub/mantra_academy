import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Mantra Academy",
  description: "Refund within 7 days of payment or before your second class.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      intro="If a course isn't right for you, we'll give your money back. Here's how it works."
    >
      <section>
        <h2>Our promise</h2>
        <p>
          You can ask for a <b>refund within 7 days of your payment, or before your second class,
          whichever comes first</b>. We return your full fee <b>minus the payment-gateway charge (about 2.4%)</b>,
          which our payment provider keeps and doesn't return to us. For example, on a ₹1,500 fee you get back
          about ₹1,464. This applies to all our courses, including the Puja vidhi workshop.
        </p>
      </section>

      <section>
        <h2>How to ask</h2>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or WhatsApp {CONTACT_PHONE_DISPLAY} with
          your name, course and Payment ID (it's on your receipt email). No long explanation needed.
        </p>
      </section>

      <section>
        <h2>When you'll get it</h2>
        <p>
          We approve refunds within 2 working days. The money goes back to the same card, UPI or bank account
          you paid from, usually within 5–7 working days depending on your bank.
        </p>
      </section>

      <section>
        <h2>After the refund window</h2>
        <p>
          Fees are not refundable after 7 days or after your second class. You may ask to move to a later
          batch instead.
        </p>
      </section>

      <section>
        <h2>Monthly fees</h2>
        <p>
          For monthly courses, if you decide to stop, tell us before the next month starts and you won't be
          charged for it.
        </p>
      </section>

      <section>
        <h2>Double or failed payments</h2>
        <p>
          If money was deducted twice, or deducted without an enrollment confirmation, we refund the extra
          amount in full.
        </p>
      </section>

      <section>
        <h2>If we cancel</h2>
        <p>
          If we cancel a course or batch, you get a full refund, or a seat in the next batch if you prefer.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        See also our <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>
    </PolicyPage>
  );
}
