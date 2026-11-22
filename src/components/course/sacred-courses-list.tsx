"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Course } from "@/lib/initial-data";
import { PayEnrollDialog } from "@/components/pay-enroll-dialog";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { feeShortLabel, formatRupees } from "@/lib/fees";
import { batchStatus } from "@/lib/batch";
import { getCourseExperience } from "@/lib/course-experience";
import { Illus, IllustrationSprite } from "./illustrations";
import "./sacred-course.css";

type Group = "all" | "chanting" | "puja" | "sanskrit" | "children";
const FILTERS: [Group, string][] = [
  ["all", "All courses"],
  ["chanting", "Vedic chanting"],
  ["puja", "Pūjā & worship"],
  ["sanskrit", "Sanskrit"],
  ["children", "For children"],
];
const WHATSAPP_UPDATES = "https://wa.me/919108787550?text=" + encodeURIComponent("Namaste! Please send me updates about new batches at Mantra Academy.");

function imageUrl(img: any): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.secure_url || img.url || img.src || "";
}

function Mandala() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg className="mandala" viewBox="0 0 200 200" aria-hidden>
      <g fill="none" stroke="#D9A94E" strokeWidth=".6">
        {[96, 80, 60, 40].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
        {petals.map((d) => <path key={d} d="M100 4 C112 30 112 50 100 60 C88 50 88 30 100 4Z" transform={`rotate(${d} 100 100)`} />)}
      </g>
    </svg>
  );
}

const FAQS = [
  { q: "Are the classes live?", a: "Yes. Classes are taught live on Google Meet by our āchāryas, and every class is recorded so you can revise or catch up." },
  { q: "Do I need to know Sanskrit?", a: "No. Our courses start from the sounds and the script. Most of our students have no Sanskrit background." },
  { q: "How do the fees work?", a: "Most courses have a registration fee that also counts as your first month; fees from the second month are collected separately. Workshops such as Pūjā Vidhi have one total fee. Each course page shows exactly what you pay." },
  { q: "Can I get a refund?", a: "Yes — within 7 days of payment or before your second class, minus the small payment-gateway charge. See our refund policy." },
  { q: "A course says “Join the waitlist”. What does that mean?", a: "The next batch isn't open yet. Leave your details and we'll tell you first — by email and WhatsApp — when registrations open." },
];

export function SacredCoursesList({ courses }: { courses: Course[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Group>("all");
  const [payFor, setPayFor] = useState<Course | null>(null);
  const [waitFor, setWaitFor] = useState<Course | null>(null);

  const items = useMemo(
    () =>
      courses
        .map((c) => ({ c, x: getCourseExperience(c.slug) }))
        .sort((a, b) => (a.x.order ?? 99) - (b.x.order ?? 99)),
    [courses],
  );
  const shown = items.filter(({ x }) => filter === "all" || x.group === filter);
  const open = shown.filter(({ c }) => c.registrationsOpen !== false);
  const waiting = shown.filter(({ c }) => c.registrationsOpen === false);
  const groupsPresent = new Set(items.map(({ x }) => x.group).filter(Boolean));

  // reveal on scroll (same motion as course pages)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rv]:not(.rv)"));
    els.forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--d", `${Math.min(i % 4, 3) * 0.08}s`); });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  const Card = ({ c, x }: { c: Course; x: ReturnType<typeof getCourseExperience> }) => {
    const title = x.displayTitle || c.title;
    const wait = c.registrationsOpen === false;
    const b = wait ? { short: "Opening soon", pill: "" } : batchStatus(c.startDate);
    const img = x.heroImage || imageUrl(c.image);
    const rating = c.studentRating?.trim() || x.stats?.rating;
    const completed = c.studentsCompleted?.trim() || x.stats?.completed;
    const badges = [
      x.group === "children" ? "For children" : null,
      /beginner/i.test(c.level || "") || x.group === "children" ? "Beginner friendly" : null,
      "Live classes",
      "Recordings",
    ].filter(Boolean) as string[];
    const href = `/courses/${c.slug}`;
    return (
      <article className={`cc${wait ? " wait" : ""}`} data-rv>
        <Link href={href} className="cc-img" aria-label={title}>
          {img && <img src={img} alt="" loading="lazy" />}
          <span className={`cc-status${wait ? " w" : ""}`}>{wait ? "Waitlist" : "Open now"}</span>
          {x.heroCard && <span className="cc-ill"><Illus name={x.heroCard.icon} /></span>}
        </Link>
        <div className="cc-body">
          <div className="cc-badges">{badges.map((t) => <span key={t}>{t}</span>)}</div>
          <h3><Link href={href}>{title}</Link></h3>
          {x.subtitle && <div className="cc-sub">{x.subtitle}</div>}
          <p className="cc-line">{x.cardLine || c.description}</p>
          <div className="cc-meta">
            <span><Illus name="s-cal" />{b.short}</span>
            {c.language && <span><Illus name="s-lang" />{c.language.split(/[\\/,]/)[0].trim()}</span>}
            {rating && <span className="r">★ {rating}{completed ? ` · ${completed} completed` : ""}</span>}
          </div>
          <div className="cc-foot">
            {typeof c.price === "number" && (
              <div className="cc-price">{formatRupees(c.price)}<small>{feeShortLabel(c.feeType)}</small></div>
            )}
            <div className="cc-ctas">
              <Link href={href} className="btn ghost">Explore →</Link>
              {wait ? (
                <button type="button" className="btn" onClick={() => setWaitFor(c)}>Join the waitlist</button>
              ) : (
                <button type="button" className="btn" onClick={() => setPayFor(c)}>Pay &amp; Enroll</button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="sacred clist" ref={rootRef}>
      <IllustrationSprite />
      {payFor && (
        <PayEnrollDialog open={!!payFor} onOpenChange={(o) => !o && setPayFor(null)} slug={payFor.slug}
          title={getCourseExperience(payFor.slug).displayTitle || payFor.title} price={payFor.price} feeType={payFor.feeType} />
      )}
      {waitFor && (
        <WaitlistDialog open={!!waitFor} onOpenChange={(o) => !o && setWaitFor(null)} slug={waitFor.slug}
          title={getCourseExperience(waitFor.slug).displayTitle || waitFor.title} />
      )}

      {/* HERO */}
      <header className="hero lhero">
        <Mandala />
        <div className="wrap center hero-text">
          <div className="eyebrow">✦ Live &amp; guided sādhana courses</div>
          <h1>Learn the way it has <em>always been taught</em></h1>
          <p className="lead narrow">Vedic chanting, pūjā and Sanskrit — taught live by our āchāryas in the Gurukula tradition, with correct pronunciation, meaning and personal guidance.</p>
          <div className="lstats">
            <span><b>220+</b> students</span>
            <span><b>12</b> countries</span>
            <span><b>4.9 ★</b> rated by our students</span>
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <nav className="pnav lfilter" aria-label="Filter courses">
        <div className="wrap">
          {FILTERS.filter(([g]) => g === "all" || groupsPresent.has(g)).map(([g, label]) => (
            <button key={g} type="button" className={filter === g ? "on" : ""} onClick={() => setFilter(g)} aria-pressed={filter === g}>{label}</button>
          ))}
        </div>
      </nav>

      {/* OPEN */}
      {open.length > 0 && (
        <section><div className="wrap">
          <div className="lhead"><div className="eyebrow">Registrations open</div><h2 className="h">Begin <em>your sādhana</em></h2></div>
          <div className="cgrid">{open.map(({ c, x }) => <Card key={c.slug} c={c} x={x} />)}</div>
        </div></section>
      )}

      {/* WAITLIST */}
      {waiting.length > 0 && (
        <section className="alt"><div className="wrap">
          <div className="lhead"><div className="eyebrow">Opening soon</div><h2 className="h">Join the <em>waitlist</em></h2><p className="lead">Be the first to know when the next batch opens.</p></div>
          <div className="cgrid">{waiting.map(({ c, x }) => <Card key={c.slug} c={c} x={x} />)}</div>
        </div></section>
      )}

      {shown.length === 0 && (
        <section><div className="wrap center"><p className="lead">No courses in this group yet — <button type="button" className="linkish" onClick={() => setFilter("all")}>see all courses</button>.</p></div></section>
      )}

      {/* WHY */}
      <section className={waiting.length ? "" : "alt"}><div className="wrap center">
        <div className="eyebrow" data-rv>Every course</div>
        <h2 className="h" data-rv>Learn live. <em>Never alone.</em></h2>
        <div className="guided">
          <div className="g" data-rv><div className="ic"><Illus name="ear" /></div><h4>Gurukula method</h4><p>Listen, repeat, receive correction — sound by sound, from the teacher.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="s-live" /></div><h4>Live classes</h4><p>Small batches on Google Meet with your āchārya.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="s-rec" /></div><h4>Recordings</h4><p>Every class recorded, so you can revise anytime.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="s-book" /></div><h4>WhatsApp support</h4><p>Questions answered between classes, with your batch.</p></div>
        </div>
      </div></section>

      {/* FAQ */}
      <section className={waiting.length ? "alt" : ""}><div className="wrap">
        <div className="center"><div className="eyebrow" data-rv>Questions</div><h2 className="h" data-rv>Frequently asked</h2></div>
        <div className="faq">
          {FAQS.map((f, i) => (
            <details key={i} open={i === 0} data-rv><summary>{f.q}</summary><div className="ans"><p>{f.a}</p></div></details>
          ))}
        </div>
      </div></section>

      {/* WHATSAPP UPDATES */}
      <section style={{ paddingTop: 10 }}><div className="wrap">
        <div className="final updates" data-rv>
          <Illus name="palm" />
          <h2 className="h">Never miss <em>a new batch</em></h2>
          <p className="lead">New batches, festival sādhanās and special workshops — a few gentle updates a month on WhatsApp.</p>
          <a className="btn" href={WHATSAPP_UPDATES} target="_blank" rel="noopener noreferrer">Get updates on WhatsApp →</a>
        </div>
      </div></section>
    </div>
  );
}
