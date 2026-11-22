import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, GRIEVANCE_CONTACT } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mantra Academy",
  description: "The terms for joining Mantra Academy courses, workshops and personal classes.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      intro="mantracademy.in is run by Mantra Academy, Bengaluru, India. These terms explain how our classes work. Before you pay or send your details, we ask you to tick a box to agree to them."
    >
      <section>
        <h2>1. Who can join</h2>
        <ul>
          <li>You must be 18 or older to register and pay.</li>
          <li>
            Children (for example in Jijñāsā) can join only when a <b>parent or guardian</b> registers, gives consent,
            pays and stays responsible for the child during classes.
          </li>
          <li>Please give us your correct name, email and phone number, so we can reach you.</li>
        </ul>
      </section>

      <section>
        <h2>2. Our classes</h2>
        <p>We teach online in three ways. Each course page shows which ones it offers.</p>
        <ul>
          <li><b>Group courses</b> — live classes with a batch, usually paid monthly.</li>
          <li><b>Workshops</b> — such as Pūjā Vidhi and Sanskrit Orientation, with one total fee.</li>
          <li><b>Personal one-to-one classes</b> — live classes only for you, with a fixed time slot.</li>
        </ul>
        <p>
          What the course page and payment screen say about a course (fee, schedule, recordings, what's included)
          is part of these terms.
        </p>
      </section>

      <section>
        <h2>3. Fees and payment</h2>
        <ul>
          <li>
            For monthly group courses, the fee you pay on this website is your <b>registration fee and also your
            first month's fee</b>. We share how to pay for later months after you join.
          </li>
          <li>Workshops have one total fee, with nothing more to pay.</li>
          <li>
            Payments on this website are charged in Indian Rupees (₹). We also show US$ prices for students outside
            India; your bank's exchange rate decides the final amount in your currency.
          </li>
          <li>Payments are processed securely by Razorpay. Your seat is confirmed once the payment succeeds.</li>
          <li>If we change a price later, it doesn't change what you've already paid.</li>
        </ul>
      </section>

      <section>
        <h2>4. Personal one-to-one classes</h2>
        <ul>
          <li>2 classes a week, 1 hour each — 8 classes a month — in a time slot reserved for you.</li>
          <li>
            You first send a request. We agree the time slot with you on WhatsApp, then send a secure payment link
            (₹ or US$) for each month. It works like a monthly subscription.
          </li>
          <li>You can reschedule a class with prior notice, by mutual understanding.</li>
          <li>To stop, tell us before the next month begins, and you won't be charged for it.</li>
        </ul>
      </section>

      <section>
        <h2>5. Class links, recordings and materials</h2>
        <ul>
          <li>
            Class links, recordings, manuals and other materials are <b>for your own learning only</b>. Please don't
            share them, your login or class links with anyone else.
          </li>
          <li>Please don't record, download, copy or re-upload classes without our written permission.</li>
          <li>Where a course includes recordings, we tell you how long they stay available.</li>
        </ul>
      </section>

      <section>
        <h2>6. When classes are recorded</h2>
        <ul>
          <li>
            We may record live classes so students of that course can practise and catch up. If you speak, chant or
            turn on your camera, your voice or video may be in the recording.
          </li>
          <li>You can keep your camera off.</li>
          <li>
            We will <b>never</b> use a clip of you, or of your child, in public (for example on YouTube or Instagram)
            without asking you separately first.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Respect</h2>
        <p>
          We expect respectful behaviour in classes and in our WhatsApp groups: no abusive language, no spam or
          promotions, and no sharing other people's personal details. We may remove anyone who disrupts others,
          without a refund. When we reasonably can, we'll talk to you first.
        </p>
      </section>

      <section>
        <h2>8. Our content</h2>
        <p>
          All course content, recordings, manuals, text and images belong to Mantra Academy (or are used with
          permission). Joining a course gives you a personal right to use them for your own learning — not to
          teach, sell or publish them.
        </p>
      </section>

      <section>
        <h2>9. Spiritual learning, not medical advice</h2>
        <p>
          Our courses teach traditional practices for learning and spiritual growth. They are not medical,
          psychological, legal or financial advice, and we can't promise any particular result.
        </p>
      </section>

      <section>
        <h2>10. Changes to classes</h2>
        <p>
          Sometimes we may need to change a class time, date or teacher. We'll tell you in advance. If we cancel a
          course or batch, you get a refund or a seat in the next batch, as our{" "}
          <Link href="/refund-policy">Refund Policy</Link> explains.
        </p>
      </section>

      <section>
        <h2>11. Refunds</h2>
        <p>
          See our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>. In short: group courses and
          workshops — within 7 days of payment or before your second class; personal classes — before your second
          class of the first month.
        </p>
      </section>

      <section>
        <h2>12. Other services we use</h2>
        <p>
          We use trusted services to run classes: Razorpay (payments), an online meeting app such as Zoom or Google
          Meet (live classes), WhatsApp (messages and groups), email and YouTube. Their own terms also apply when you
          use them, and we can't control their outages.
        </p>
      </section>

      <section>
        <h2>13. Limits of our responsibility</h2>
        <p>
          As far as the law allows, we are not responsible for indirect losses caused by internet or device
          problems, outages of the services above, or misuse of your account by others. Nothing here removes your
          rights under Indian consumer law.
        </p>
      </section>

      <section>
        <h2>14. Your personal data</h2>
        <p>
          We use your details only with your consent and only to run your classes. Read our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>15. Questions and complaints</h2>
        <p>
          Write to {GRIEVANCE_CONTACT} at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or WhatsApp{" "}
          {CONTACT_PHONE_DISPLAY}, with your name, course and payment ID if you have one. We try to reply within 7
          days.
        </p>
      </section>

      <section>
        <h2>16. Changes to these terms</h2>
        <p>
          We may update these terms. The date at the top shows the latest version. Changes apply from that date and
          don't affect what you've already paid for.
        </p>
      </section>

      <section>
        <h2>17. Law</h2>
        <p>
          These terms follow the laws of India. Disputes are handled by the courts of Bengaluru, Karnataka, without
          affecting your consumer-protection rights. If one part of these terms can't be applied, the rest still
          applies.
        </p>
      </section>
    </PolicyPage>
  );
}
