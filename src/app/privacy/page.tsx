import type { Metadata } from "next";
import { PolicyPage, CONTACT_EMAIL } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Mantra Academy",
  description: "What information Mantra Academy collects and how we use it.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy" intro="We keep your information safe and use it only to run your classes.">
      <section>
        <h2>What we collect</h2>
        <p>
          When you enroll, we collect your name, email address and phone number, the course you chose and your
          payment reference.
        </p>
      </section>

      <section>
        <h2>What we don't collect</h2>
        <p>
          Your card, UPI or bank details go directly to Razorpay, our payment partner. We never see or store them.
        </p>
      </section>

      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>To confirm your enrollment and send your receipt.</li>
          <li>To share class links, timings and materials, including on WhatsApp.</li>
          <li>To answer your questions.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing</h2>
        <p>
          We never sell your information. We share it only with services that help us run the academy (Razorpay
          for payments, our secure database and our email provider) or when the law requires it.
        </p>
      </section>

      <section>
        <h2>Keeping it safe</h2>
        <p>Your data is stored on secure servers, and only our team can access it.</p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to see, correct or delete your information at any time. Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>We may update this policy. The latest version is always on this page.</p>
      </section>
    </PolicyPage>
  );
}
