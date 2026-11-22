"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { courseName, dateTime, rupees } from "@/lib/admin-data";

type Row = {
  _id: string; courseSlug: string; courseTitle: string; name: string; email: string; phone: string;
  status?: string; createdAt: string; amount?: number; paidAt?: string; notifiedAt?: string;
  country?: string; timezone?: string; preferredTimes?: string; note?: string;
  consent?: { agreedAt?: string; version?: string; guardian?: boolean };
};
type Found = { enrollments: Row[]; waitlist: Row[]; requests: Row[] };

const consentText = (c?: Row["consent"]) =>
  c?.agreedAt ? `Consent ✓ ${dateTime(c.agreedAt)} · v${c.version}${c.guardian ? " · parent/guardian ✓" : ""}` : "Consent: before tickbox";

export default function PrivacyRequestsPage() {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [found, setFound] = useState<Found | null>(null);
  const [searched, setSearched] = useState("");

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    const res = await fetch(`/api/admin/person-data?q=${encodeURIComponent(q.trim())}`, { credentials: "same-origin", cache: "no-store" }).catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      const d = await res?.json().catch(() => ({}));
      toast({ variant: "destructive", title: "Could not search", description: d?.error || "Try again." });
      return;
    }
    setFound(await res.json());
    setSearched(q.trim());
  };

  const total = found ? found.enrollments.length + found.waitlist.length + found.requests.length : 0;
  const paid = found ? found.enrollments.filter((r) => r.status === "paid").length : 0;

  const removeAll = async () => {
    if (!window.confirm(`Delete this person's waitlist entries, personal-class requests and unpaid payment attempts for "${searched}"? Paid enrollments are kept for accounts. This can't be undone.`)) return;
    setBusy(true);
    const res = await fetch("/api/admin/person-data", { method: "DELETE", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q: searched }) }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return toast({ variant: "destructive", title: "Could not delete", description: "Try again." });
    const d = await res.json();
    toast({ title: "Deleted", description: `${d.deleted.waitlist} waitlist, ${d.deleted.requests} requests, ${d.deleted.unpaid} unpaid attempts deleted.${d.keptPaid ? ` ${d.keptPaid} paid enrollment(s) kept for accounts.` : ""}` });
    search();
  };

  const card = (r: Row, kind: string, extra?: string) => (
    <div className="adm-pcard" key={kind + r._id}>
      <div className="top"><b>{r.name}</b><span className="adm-muted">{dateTime(r.createdAt)}</span></div>
      <div className="adm-muted"><b style={{ fontSize: 14 }}>{kind}</b> · {courseName(r.courseSlug, r.courseTitle)}{extra ? ` · ${extra}` : ""}</div>
      <div className="adm-muted" style={{ wordBreak: "break-all" }}>{r.email} · {r.phone}</div>
      <div className="adm-muted">{consentText(r.consent)}</div>
    </div>
  );

  return (
    <div className="adm-page">
      <h1 className="adm-h1">Data requests</h1>
      <p className="adm-sub">
        When someone asks to see or delete their details (India's DPDP Act), search by their email or phone. Paid
        enrollments are kept, because payment records are needed for accounts and tax.
      </p>

      <form className="adm-toolbar" onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Email or phone number" aria-label="Email or phone number" />
        <button type="submit" className="adm-btn pri" disabled={busy}>{busy ? "Searching…" : "Find"}</button>
      </form>

      {found && (
        <>
          <div className="adm-toolbar">
            <span className="adm-muted">{total === 0 ? `Nothing found for "${searched}".` : `${total} record${total === 1 ? "" : "s"} for "${searched}"${paid ? ` · ${paid} paid (kept)` : ""}`}</span>
            {total > paid && <button type="button" className="adm-btn sec" disabled={busy} onClick={removeAll}>Delete their data</button>}
          </div>
          <div className="adm-plist">
            {found.enrollments.map((r) => card(r, r.status === "paid" ? "Paid enrollment" : "Unpaid attempt", r.amount ? rupees(r.amount) : ""))}
            {found.requests.map((r) => card(r, "Personal 1:1 request", [r.country, r.preferredTimes].filter(Boolean).join(" · ")))}
            {found.waitlist.map((r) => card(r, "Waitlist", r.notifiedAt ? "notified" : ""))}
          </div>
        </>
      )}
    </div>
  );
}
