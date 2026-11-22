"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getJSON, courseName, dateTime, waNumber } from "@/lib/admin-data";
import { DEFAULT_PERSONAL_PRICING, type PersonalPricing } from "@/lib/personal-pricing";

type Req = {
  _id: string; courseSlug: string; courseTitle: string; name: string; email: string; phone: string;
  country?: string; timezone?: string; preferredTimes?: string; note?: string;
  status: "new" | "contacted" | "confirmed" | "closed"; createdAt: string;
};
const STATUS: { id: Req["status"]; label: string }[] = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "confirmed", label: "Slot confirmed" },
  { id: "closed", label: "Closed" },
];

export default function PersonalRequestsPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<"open" | "all">("open");
  const [price, setPrice] = useState<PersonalPricing>(DEFAULT_PERSONAL_PRICING);
  const [savingPrice, setSavingPrice] = useState(false);

  useEffect(() => {
    getJSON<Req[]>("/api/personal-requests", []).then((r) => { setRows(r); setLoading(false); });
    getJSON<PersonalPricing>("/api/settings/personal", DEFAULT_PERSONAL_PRICING).then(setPrice);
  }, []);

  const setStatus = async (id: string, status: Req["status"]) => {
    const prev = rows;
    setRows((r) => r.map((x) => (x._id === id ? { ...x, status } : x)));
    const res = await fetch(`/api/personal-requests/${id}`, { method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).catch(() => null);
    if (!res?.ok) { setRows(prev); toast({ variant: "destructive", title: "Could not save", description: "Try again." }); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this request? This can't be undone.")) return;
    const res = await fetch(`/api/personal-requests/${id}`, { method: "DELETE", credentials: "same-origin" }).catch(() => null);
    if (res?.ok) setRows((r) => r.filter((x) => x._id !== id));
    else toast({ variant: "destructive", title: "Could not delete", description: "Try again." });
  };

  const savePrice = async () => {
    setSavingPrice(true);
    const res = await fetch("/api/settings/personal", { method: "PUT", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(price) }).catch(() => null);
    setSavingPrice(false);
    if (res?.ok) { setPrice(await res.json()); toast({ title: "Saved", description: "Personal class price updated on all course pages" }); }
    else toast({ variant: "destructive", title: "Could not save", description: "Try again." });
  };

  const list = rows.filter((r) => show === "all" || r.status === "new" || r.status === "contacted");
  const waMsg = (r: Req) =>
    `https://wa.me/${waNumber(r.phone)}?text=${encodeURIComponent(`Namaste ${r.name.split(" ")[0]}! This is Mantra Academy, about your request for personal ${courseName(r.courseSlug, r.courseTitle)} classes. Which of these times would suit you?`)}`;

  return (
    <div className="adm-page">
      <h1 className="adm-h1">Personal 1:1 requests</h1>
      <p className="adm-sub">People asking for one-to-one classes. Message them, agree a slot, then send a Razorpay payment link.</p>

      <div className="adm-card" style={{ marginTop: 18 }}>
        <h2 className="adm-h2" style={{ marginBottom: 6 }}>Monthly guru dakṣiṇā (all courses)</h2>
        <div className="adm-toolbar" style={{ margin: "8px 0 0" }}>
          <label className="adm-muted" style={{ display: "flex", alignItems: "center", gap: 8 }}>US$
            <input type="number" min={1} value={price.usd} onChange={(e) => setPrice({ ...price, usd: Number(e.target.value) })} style={{ width: 110, flex: "none" }} aria-label="Price in US dollars" />
          </label>
          <label className="adm-muted" style={{ display: "flex", alignItems: "center", gap: 8 }}>₹
            <input type="number" min={1} value={price.inr} onChange={(e) => setPrice({ ...price, inr: Number(e.target.value) })} style={{ width: 130, flex: "none" }} aria-label="Price in rupees" />
          </label>
          <button type="button" className="adm-btn pri" onClick={savePrice} disabled={savingPrice}>{savingPrice ? "Saving…" : "Save price"}</button>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-seg" role="tablist" aria-label="Show">
          <button type="button" role="tab" aria-selected={show === "open"} className={show === "open" ? "on o" : ""} onClick={() => setShow("open")}>To follow up</button>
          <button type="button" role="tab" aria-selected={show === "all"} className={show === "all" ? "on o" : ""} onClick={() => setShow("all")}>All</button>
        </div>
        <span className="adm-muted">{loading ? "Loading…" : `${list.length} request${list.length === 1 ? "" : "s"}`}</span>
      </div>

      <div className="adm-plist">
        {!loading && list.length === 0 && <div className="adm-card adm-muted">No requests to follow up right now.</div>}
        {list.map((r) => (
          <div className="adm-pcard" key={r._id}>
            <div className="top"><b>{r.name}</b><span className="adm-muted">{dateTime(r.createdAt)}</span></div>
            <div className="adm-muted"><b style={{ fontSize: 14 }}>{courseName(r.courseSlug, r.courseTitle)}</b>{r.country ? ` · ${r.country}` : ""}{r.timezone ? ` · ${r.timezone}` : ""}</div>
            {r.preferredTimes && <div>🕒 {r.preferredTimes}</div>}
            {r.note && <div className="adm-muted">“{r.note}”</div>}
            <div className="adm-muted" style={{ wordBreak: "break-all" }}>{r.email} · {r.phone}</div>
            <div className="acts">
              <a href={waMsg(r)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}>Call</a>
              <a href={`mailto:${r.email}`}>Email</a>
              <a href="https://dashboard.razorpay.com/app/paymentlinks" target="_blank" rel="noopener noreferrer">Make payment link ↗</a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 8 }}>
              <div className="adm-seg" role="group" aria-label="Status">
                {STATUS.map((st) => (
                  <button key={st.id} type="button" className={r.status === st.id ? "on o" : ""} onClick={() => r.status !== st.id && setStatus(r._id, st.id)}>{st.label}</button>
                ))}
              </div>
              <button type="button" className="adm-btn sec" style={{ height: 36 }} onClick={() => remove(r._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
