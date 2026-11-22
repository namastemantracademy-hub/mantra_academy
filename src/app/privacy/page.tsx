import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, GRIEVANCE_CONTACT } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Mantra Academy",
  description: "What personal details Mantra Academy collects, why, and your rights under India's DPDP Act.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="We collect only the details we need to run your classes, we use them only with your consent, and we never sell them. This policy follows India's Digital Personal Data Protection Act, 2023."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          Mantra Academy, Bengaluru, India, runs mantracademy.in and decides how your details are used. For any
          privacy question, contact {GRIEVANCE_CONTACT} at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
          or WhatsApp {CONTACT_PHONE_DISPLAY}.
        </p>
      </section>

      <section>
        <h2>What we collect, and why</h2>
        <ul>
          <li>
            <b>When you enroll and pay:</b> name, email, phone (WhatsApp), the course, and your payment reference —
            to confirm your seat, send your receipt and share class links, timings and materials.
          </li>
          <li>
            <b>When you request personal classes:</b> the same, plus your country, time zone, preferred class times
            and any note you add — to agree your time slot and send your payment link.
          </li>
          <li>
            <b>When you join a waitlist:</b> name, email and phone — only to tell you when that course opens.
          </li>
          <li>
            <b>Your consent:</b> when you ticked the consent box and which version of our policies you agreed to — as
            proof of your consent.
          </li>
          <li>
            <b>In class:</b> your voice or video may appear in class recordings if you speak or turn your camera on
            (see our <Link href="/terms">Terms</Link>).
          </li>
        </ul>
        <p>We don't use your details for anything else, and we don't send advertising on behalf of others.</p>
      </section>

      <section>
        <h2>What we don't collect</h2>
        <p>
          Your card, UPI or bank details go directly to Razorpay, our payment partner. We never see or store them.
          We don't use advertising or tracking cookies.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          For children's courses (such as Jijñāsā), a parent or guardian must register and give consent for the
          child. We don't track children or show them advertising, and we use their details only for their
          classes.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>We never sell your details. We share them only with services that help us run the academy:</p>
        <ul>
          <li>Razorpay — to take payments.</li>
          <li>Our secure database and website hosting providers — to store and run the website.</li>
          <li>Gmail — to send your confirmations and replies.</li>
          <li>WhatsApp and our online meeting app — for class messages and live classes.</li>
        </ul>
        <p>
          Some of these services may store data on secure servers outside India. We also share details if the law
          requires it.
        </p>
      </section>

      <section>
        <h2>The chat assistant and videos</h2>
        <p>
          Questions typed into the chat assistant on our website may be processed by an AI service to answer them.
          Please don't type personal details there. Videos from our YouTube channel are shown using YouTube, which
          has its own privacy policy.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>Enrollment and payment records: as long as the law needs them for accounts and tax.</li>
          <li>
            Waitlist and personal-class requests: only as long as they are useful to you. You can ask us to delete
            them any time.
          </li>
        </ul>
      </section>

      <section>
        <h2>Keeping it safe</h2>
        <p>
          Your details are stored on secure servers. Only our team can see them, using a protected admin login. If
          a data breach ever affects you, we will tell you and the Data Protection Board of India, as the law
          requires.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <ul>
          <li><b>See</b> what details we hold about you.</li>
          <li><b>Correct</b> or update them.</li>
          <li>
            <b>Delete</b> them — except records the law asks us to keep, such as payment records.
          </li>
          <li>
            <b>Withdraw your consent</b> at any time — as easily as you gave it. Just message us. (It won't undo what
            we did before, and we may not be able to continue your classes without your contact details.)
          </li>
          <li><b>Name someone</b> who can use these rights for you if you are unable to.</li>
          <li>
            <b>Complain</b> to us first; if you're not satisfied, you can complain to the Data Protection Board of
            India.
          </li>
        </ul>
        <p>
          To use any of these, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or WhatsApp{" "}
          {CONTACT_PHONE_DISPLAY}. We try to reply within 7 days.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy. The date at the top shows the latest version. If a change affects how we use
          your details, we'll ask for your consent again where needed.
        </p>
      </section>
    </PolicyPage>
  );
}
