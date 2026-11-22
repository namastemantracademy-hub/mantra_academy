"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Megaphone, FileText, MessageSquare } from "lucide-react";
import {
  getJSON, courseName, rupees, dateTime, shortDate,
  type AdminCourse, type AdminEnrollment, type AdminWait,
} from "@/lib/admin-data";

type Todo = { tone: "red" | "gold" | "green"; text: React.ReactNode; href?: string; cta?: string };

const DAY = 86400000;

export default function TodayPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [pays, setPays] = useState<AdminEnrollment[]>([]);
  const [wait, setWait] = useState<AdminWait[]>([]);

  useEffect(() => {
    (async () => {
      const [c, p, w] = await Promise.all([
        getJSON<AdminCourse[]>("/api/courses", []),
        getJSON<AdminEnrollment[]>("/api/admin/enrollments", []),
        getJSON<AdminWait[]>("/api/waitlist", []),
      ]);
      setCourses(c); setPays(p); setWait(w); setLoading(false);
    })();
  }, []);

  const paid = pays.filter((p) => p.status === "paid");
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const thisMonth = paid.filter((p) => new Date(p.paidAt || p.createdAt).getTime() >= monthStart);
  const waiting = wait.filter((w) => !w.notifiedAt);

  // ---- to-do list ----
  const todos: Todo[] = [];
  for (const c of courses) {
    const name = courseName(c.slug, c.title);
    const open = c.registrationsOpen !== false;
    const people = waiting.filter((w) => w.courseSlug === c.slug).length;
    const start = c.startDate ? new Date(c.startDate).getTime() : NaN;
    if (open && (isNaN(start) || start < Date.now() - 21 * DAY)) {
      todos.push({ tone: "gold", text: <><b>{name}</b> is open but has no upcoming start date. Visitors see “Starting soon”.</>, href: "/admin/courses", cta: "Set start date" });
    }
    if (open && people > 0) {
      todos.push({ tone: "red", text: <><b>{people} {people === 1 ? "person is" : "people are"}</b> on the waitlist for <b>{name}</b>, and registrations are now open — tell them!</>, href: "/admin/waitlist", cta: "Open waitlist" });
    } else if (!open && people > 0) {
      todos.push({ tone: "gold", text: <><b>{people} {people === 1 ? "person is" : "people are"}</b> waiting for <b>{name}</b>. When you open registrations, tell them first.</>, href: "/admin/waitlist", cta: "See who" });
    }
  }
  const pending = pays.filter((p) => p.status === "created" && Date.now() - new Date(p.createdAt).getTime() < 2 * DAY);
  if (pending.length) {
    todos.push({ tone: "gold", text: <><b>{pending.length}</b> {pending.length === 1 ? "person" : "people"} started paying in the last 2 days but didn’t finish. You could message them.</>, href: "/admin/payments?show=unfinished", cta: "See them" });
  }
  todos.sort((a, b) => (a.tone === "red" ? -1 : 0) - (b.tone === "red" ? -1 : 0));

  const hello = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="adm-page">
      <h1 className="adm-h1">{hello} 🙏</h1>
      <p className="adm-sub">{now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · here’s what’s happening at Mantra Academy</p>

      <div className="adm-stats">
        <Link className="adm-stat gold" href="/admin/payments"><small>Money received this month</small><b>{loading ? "…" : rupees(thisMonth.reduce((s, p) => s + p.amount, 0))}</b><span>{thisMonth.length} payment{thisMonth.length === 1 ? "" : "s"}</span></Link>
        <Link className="adm-stat" href="/admin/payments"><small>New students this month</small><b>{loading ? "…" : thisMonth.length}</b><span>paid enrollments</span></Link>
        <Link className="adm-stat" href="/admin/payments"><small>All paid enrollments</small><b>{loading ? "…" : paid.length}</b><span>since payments went live</span></Link>
        <Link className="adm-stat" href="/admin/waitlist"><small>Waiting on waitlist</small><b>{loading ? "…" : waiting.length}</b><span>not yet informed</span></Link>
      </div>

      <div className="adm-grid2">
        <div className="adm-card">
          <h2 className="adm-h2">To do</h2>
          {loading ? <p className="adm-muted">Loading…</p> : todos.length === 0 ? (
            <div className="adm-todo"><span className="adm-dot green" /><p>All set — nothing needs your attention right now.</p></div>
          ) : todos.map((t, i) => (
            <div className="adm-todo" key={i}>
              <span className={`adm-dot ${t.tone}`} />
              <div><p>{t.text}</p>{t.href && <Link href={t.href}>{t.cta} →</Link>}</div>
            </div>
          ))}
        </div>

        <div className="adm-card">
          <h2 className="adm-h2">Quick actions</h2>
          <div className="adm-quick">
            <Link className="adm-qbtn" href="/admin/courses"><CalendarDays className="h-5 w-5" />Set batch dates</Link>
            <Link className="adm-qbtn" href="/admin/announcements"><Megaphone className="h-5 w-5" />Add announcement</Link>
            <Link className="adm-qbtn" href="/admin/blog"><FileText className="h-5 w-5" />Write article</Link>
            <Link className="adm-qbtn" href="/admin/testimonies"><MessageSquare className="h-5 w-5" />Add review</Link>
          </div>
        </div>
      </div>

      <div className="adm-grid2">
        <div className="adm-card">
          <h2 className="adm-h2">Latest payments</h2>
          {loading ? <p className="adm-muted">Loading…</p> : paid.length === 0 ? <p className="adm-muted">No payments yet.</p> : paid.slice(0, 6).map((p) => (
            <div className="adm-row" key={p._id}>
              <div><b>{p.name}</b><div className="adm-muted">{courseName(p.courseSlug, p.courseTitle)} · {dateTime(p.paidAt || p.createdAt)}</div></div>
              <b style={{ color: "#5e1d14", whiteSpace: "nowrap" }}>{rupees(p.amount)}</b>
            </div>
          ))}
          {paid.length > 0 && <div style={{ marginTop: 10 }}><Link className="adm-btn sec" href="/admin/payments">See all students →</Link></div>}
        </div>

        <div className="adm-card">
          <h2 className="adm-h2">Courses</h2>
          {loading ? <p className="adm-muted">Loading…</p> : courses.map((c) => (
            <div className="adm-row" key={c.slug}>
              <div><b>{courseName(c.slug, c.title)}</b><div className="adm-muted">{c.startDate ? `Starts ${shortDate(c.startDate)}` : "No start date"}</div></div>
              <span className={`adm-pill ${c.registrationsOpen === false ? "wait" : "open"}`}>{c.registrationsOpen === false ? "Waitlist" : "Open"}</span>
            </div>
          ))}
          <div style={{ marginTop: 10 }}><Link className="adm-btn sec" href="/admin/courses">Manage courses →</Link></div>
        </div>
      </div>
    </div>
  );
}
