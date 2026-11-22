import Link from "next/link";

export const CONTACT_EMAIL = "namaste.mantracademy@gmail.com";
export const CONTACT_PHONE_DISPLAY = "+91 91087 87550";
export const CONTACT_PHONE_TEL = "+919108787550";
export const POLICY_UPDATED = "22 November 2026";
/** Person who answers privacy questions and complaints (DPDP Act). */
export const GRIEVANCE_CONTACT = "Dr. Karthik Sharma";

export const policyLinks = [
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact Us" },
];

export function PolicyPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto py-12 md:py-16 px-1">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated: {POLICY_UPDATED}</p>
        {intro && <p className="text-lg text-foreground/80">{intro}</p>}
      </header>
      <div className="space-y-8 text-foreground/90 leading-relaxed [&_h2]:text-xl [&_h2]:font-headline [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
      <nav aria-label="Policies" className="mt-12 pt-6 border-t border-primary/20 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {policyLinks.map((l) => (
          <Link key={l.href} href={l.href} className="text-primary hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>
    </article>
  );
}
