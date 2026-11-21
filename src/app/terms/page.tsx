import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mantra Academy",
  description: "The terms for enrolling in Mantra Academy courses.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      intro="mantracademy.in is run by Mantra Academy, Bengaluru, India. By enrolling in a course, you agree to these terms."
    >
      <section>
        <h2>Fees</h2>
        <ul>
          <li>
            For monthly courses, the fee you pay on this website is your <b>registration fee and also counts as
            your first month's fee</b>. Fees from the second month are collected separately; we share the details
            after you join.
          </li>
          <li>
            Some courses, such as the Puja vidhi workshop, have <b>one total fee</b> with nothing more to pay.
          </li>
          <li>All prices are in Indian Rupees (₹) and are shown on each course page.</li>
          <li>Payments are processed securely by Razorpay.</li>
        </ul>
      </section>

      <section>
        <h2>Classes</h2>
        <ul>
          <li>Class links, recordings and materials are for your personal use only. Please don't share or resell them.</li>
          <li>We may sometimes change timings or teachers, and we'll tell you in advance.</li>
        </ul>
      </section>

      <section>
        <h2>Respect</h2>
        <p>
          We expect respectful conduct in classes and groups. We may remove anyone who disrupts others, without
          a refund.
        </p>
      </section>

      <section>
        <h2>Our content</h2>
        <p>
          All course content, recordings, text and images belong to Mantra Academy and may not be copied or
          published without permission.
        </p>
      </section>

      <section>
        <h2>Spiritual learning, not medical advice</h2>
        <p>
          Our courses teach traditional practices for learning and spiritual growth. They are not a substitute
          for medical, psychological or other professional advice.
        </p>
      </section>

      <section>
        <h2>Refunds</h2>
        <p>
          See our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>We may update these terms. The latest version is always on this page.</p>
      </section>

      <section>
        <h2>Law</h2>
        <p>
          These terms follow the laws of India. Any disputes are handled by the courts of Bengaluru, Karnataka.
        </p>
      </section>
    </PolicyPage>
  );
}
