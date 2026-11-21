import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PolicyPage, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Contact Us | Mantra Academy",
  description: "Reach Mantra Academy by email, phone or WhatsApp.",
};

export default function ContactPage() {
  return (
    <PolicyPage title="Contact Us" intro="We usually reply within 24 hours, Monday to Saturday.">
      <section className="space-y-4">
        <h2>Mantra Academy</h2>
        <p className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden />
          <span>Bengaluru, Karnataka, India</span>
        </p>
        <p className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden />
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all">{CONTACT_EMAIL}</a>
        </p>
        <p className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden />
          <span>
            <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a> (call or WhatsApp)
          </span>
        </p>
      </section>

      <section>
        <h2>About a payment?</h2>
        <p>
          Include your name, course and Payment ID (it's on your receipt email) so we can help you quickly.
        </p>
      </section>
    </PolicyPage>
  );
}
