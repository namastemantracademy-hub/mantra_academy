"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { getJSON, courseName, rupees, dateTime, waNumber, waText, WA_MESSAGES, type AdminEnrollment } from "@/lib/admin-data";

type Show = "paid" | "unfinished" | "all";
const STATUS_LABEL: Record<string, string> = { paid: "Paid", created: "Not finished", failed: "Failed" };

export default function PaymentsPage() {
  const [rows, setRows] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<Show>("paid");
  const [course, setCourse] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("show");
    if (s === "unfinished" || s === "all") setShow(s);
    getJSON<AdminEnrollment[]>("/api/admin/enrollments", []).then((r) => { setRows(r); setLoading(false); });
  }, []);

  const courses = useMemo(() => Array.from(new Set(rows.map((r) => r.courseSlug))), [rows]);
  const list = rows.filter((r) =>
    (show === "all" || (show === "paid" ? r.status === "paid" : r.status !== "paid")) &&
    (course === "all" || r.courseSlug === course) &&
    (!q.trim() || `${r.name} ${r.email} ${r.phone} ${r.razorpayPaymentId || ""}`.toLowerCase().includes(q.trim().toLowerCase())),
  );
  const total = list.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);

  const downloadCSV = () => {
    const head = ["Name", "Phone", "Email", "Course", "Amount (₹)", "Status", "Date", "Payment ID", "Order ID"];
    const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = list.map((r) => [
      r.name, r.phone, r.email, courseName(r.courseSlug, r.courseTitle), String(Math.round(r.amount / 100)),
      STATUS_LABEL[r.status] || r.status, dateTime(r.paidAt || r.createdAt), r.razorpayPaymentId || "", r.razorpayOrderId,
    ].map(esc).join(","));
    const blob = new Blob(["﻿" + [head.map(esc).join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `mantra-academy-students-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="adm-page">
      <h1 className="adm-h1">Students &amp; payments</h1>
      <p className="adm-sub">Everyone who enrolled through the website. Tap a number to call or WhatsApp, or “Confirm seat” to send a ready-made welcome message.</p>

      <div className="adm-toolbar">
        <div className="adm-seg" role="tablist" aria-label="Show">
          {(["paid", "unfinished", "all"] as Show[]).map((s) => (
            <button key={s} type="button" role="tab" aria-selected={show === s} className={show === s ? "on o" : ""} onClick={() => setShow(s)}>
              {s === "paid" ? "Paid" : s === "unfinished" ? "Not finished" : "All"}
            </button>
          ))}
        </div>
        <select value={course} onChange={(e) => setCourse(e.target.value)} aria-label="Course">
          <option value="all">All courses</option>
          {courses.map((s) => <option key={s} value={s}>{courseName(s, rows.find((r) => r.courseSlug === s)?.courseTitle)}</option>)}
        </select>
        <input type="search" placeholder="Search name, phone, email…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        <button type="button" className="adm-btn sec" onClick={downloadCSV} disabled={!list.length}><Download className="h-4 w-4" />Download Excel (CSV)</button>
      </div>

      <p className="adm-muted" style={{ marginBottom: 12 }}>
        {loading ? "Loading…" : `${list.length} ${list.length === 1 ? "entry" : "entries"}${total ? ` · ${rupees(total)} received` : ""}`}
        {show === "unfinished" && !loading && " · these people opened the payment window but didn’t pay"}
      </p>

      <div className="adm-plist">
        {!loading && list.length === 0 && <div className="adm-card adm-muted">Nothing here yet.</div>}
        {list.map((r) => (
          <div className="adm-pcard" key={r._id}>
            <div className="top"><b>{r.name}</b><span className="amt">{rupees(r.amount)}</span></div>
            <div className="adm-muted">
              {courseName(r.courseSlug, r.courseTitle)} · {dateTime(r.paidAt || r.createdAt)} ·{" "}
              <span className={`adm-pill ${r.status}`}>{STATUS_LABEL[r.status] || r.status}</span>
            </div>
            <div className="adm-muted" style={{ wordBreak: "break-all" }}>{r.email}{r.razorpayPaymentId ? ` · ${r.razorpayPaymentId}` : ""}</div>
            <div className="acts">
              <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}>📞 {r.phone}</a>
              <a href={`https://wa.me/${waNumber(r.phone)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              {r.status === "paid" && (
                <a href={waText(r.phone, WA_MESSAGES.seatConfirmed(r.name, courseName(r.courseSlug, r.courseTitle)))} target="_blank" rel="noopener noreferrer" title="Opens WhatsApp with a seat-confirmed message">💬 Confirm seat</a>
              )}
              <a href={`mailto:${r.email}`}>Email</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
