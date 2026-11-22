"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Course } from "@/lib/initial-data";
import { PayEnrollDialog } from "@/components/pay-enroll-dialog";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { getCourseExperience, TEACHERS } from "@/lib/course-experience";
import { Illus, IllustrationSprite } from "@/components/course/illustrations";
import { CourseCard } from "@/components/course/course-card";
import "@/components/course/sacred-course.css";

export const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029Vb43WtE7T8bcZN2cyX1n";
export const WHATSAPP_CHAT = "https://wa.me/919108787550?text=" + encodeURIComponent("Namaste! I'd like to know more about the courses at Mantra Academy.");

type Announcement = { title: string; description?: string; link?: string };
type Testimony = { name: string; title?: string; feedback?: string; featured?: boolean };

export function useReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rv]"));
    els.forEach((el) => {
      el.classList.add("rv");
      const sibs = Array.from(el.parentElement?.children || []).filter((c) => (c as HTMLElement).dataset.rv !== undefined);
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 0.08}s`);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export function Mandala() {
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

export function GurukulaCycle() {
  return (
    <div className="cycle">
      <div className="cy" data-rv><Illus name="ear" /><b>Guru-mukha uccāraṇa</b><small>Listen to the Guru</small></div>
      <div className="arr" aria-hidden>›</div>
      <div className="cy" data-rv><Illus name="sound" /><b>Anu-uccāraṇa</b><small>Repeat the sound precisely</small></div>
      <div className="arr" aria-hidden>›</div>
      <div className="cy" data-rv><Illus name="hand" /><b>Correction</b><small>Refine the voice</small></div>
      <div className="arr" aria-hidden>›</div>
      <div className="cy on" data-rv><Illus name="lotus" /><b>Realisation</b><small>Embody the mantra</small></div>
    </div>
  );
}

export function VisionMission() {
  return (
    <div className="vm">
      <div className="vmc" data-rv>
        <div className="eyebrow">Our vision</div>
        <p>To revive Yogic and Vedic culture in every Bhāratīya by creating a global space for authentic learning rooted in the Gurukula tradition.</p>
      </div>
      <div className="vmc" data-rv>
        <div className="eyebrow">Our mission</div>
        <p>To preserve, live and pass on the authentic wisdom of the Vedas, Sanskrit and Indian Knowledge Systems — blending traditional Gurukula methods with modern learning, for seekers everywhere.</p>
      </div>
    </div>
  );
}

export function Shloka() {
  return (
    <div className="shloka" data-rv>
      <p className="dev">सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।<br />तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥</p>
      <p className="tr">saha nāvavatu · saha nau bhunaktu · saha vīryaṃ karavāvahai · tejasvi nāvadhītamastu mā vidviṣāvahai</p>
      <p className="mn">May we be protected together, nourished together, and grow strong together. May our learning shine, and may there be no discord between us.</p>
    </div>
  );
}

export function SacredHome({ courses, announcements, testimonies }: { courses: Course[]; announcements: Announcement[]; testimonies: Testimony[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [payFor, setPayFor] = useState<Course | null>(null);
  const [waitFor, setWaitFor] = useState<Course | null>(null);
  useReveal(rootRef);

  const sorted = [...courses].sort((a, b) => (getCourseExperience(a.slug).order ?? 99) - (getCourseExperience(b.slug).order ?? 99));
  const featured = [...sorted.filter((c) => c.registrationsOpen !== false), ...sorted.filter((c) => c.registrationsOpen === false)].slice(0, 4);
  const voices = testimonies.filter((t) => t.featured !== false && t.feedback).slice(0, 3);
  const news = announcements.filter((a) => a.title).slice(0, 3);

  return (
    <div className="sacred home" ref={rootRef}>
      <IllustrationSprite />
      {payFor && (
        <PayEnrollDialog open onOpenChange={(o) => !o && setPayFor(null)} slug={payFor.slug}
          title={getCourseExperience(payFor.slug).displayTitle || payFor.title} price={payFor.price} feeType={payFor.feeType} />
      )}
      {waitFor && (
        <WaitlistDialog open onOpenChange={(o) => !o && setWaitFor(null)} slug={waitFor.slug}
          title={getCourseExperience(waitFor.slug).displayTitle || waitFor.title} />
      )}

      {/* HERO */}
      <header className="hero">
        <Mandala />
        <div className="wrap grid">
          <div className="hero-text">
            <div className="eyebrow">✦ Mantra Academy · Gurukula learning, online</div>
            <h1>Sacred sound, <em className="h1em">correctly learned</em></h1>
            <div className="sub">The Vedas, mantras, pūjā and Sanskrit — taught the traditional way</div>
            <p className="lead">We bring the wisdom of Bhārata’s spiritual heritage into everyday life — as a living guide, not a relic of the past. Learn live from our āchāryas, sound by sound, with care for both accuracy and meaning.</p>
            <div className="ctas left">
              <Link className="btn" href="/courses">Explore courses →</Link>
              <a className="btn ghost" href={WHATSAPP_CHAT} target="_blank" rel="noopener noreferrer">Talk to us on WhatsApp</a>
            </div>
            <div className="lstats left">
              <span><b>220+</b> students</span>
              <span><b>12</b> countries</span>
              <span><b>4.9 ★</b> rated by our students</span>
            </div>
          </div>
          <div className="photo">
            <div className="img"><img src="/images/home/hero.webp" alt="Dr. Karthik Sharma teaching online" /></div>
            <div className="badge"><b>Live</b>classes on Google Meet<span className="bstar">every class recorded</span></div>
            <div className="book"><Illus name="palm" /><div><b>Gurukula way</b><small>listen · repeat · correct</small></div></div>
          </div>
        </div>
      </header>

      {/* LATEST */}
      {news.length > 0 && (
        <div className="news"><div className="wrap">
          <span className="nl">Latest</span>
          {news.map((n, i) => (
            n.link
              ? <a key={i} href={n.link} target={n.link.startsWith("http") && !n.link.includes("mantracademy.in") ? "_blank" : undefined} rel="noopener noreferrer">✦ {n.title} →</a>
              : <span key={i}>✦ {n.title}</span>
          ))}
        </div></div>
      )}

      {/* COURSES */}
      <section><div className="wrap">
        <div className="lhead"><div className="eyebrow" data-rv>Courses</div><h2 className="h" data-rv>Begin <em>your sādhana</em></h2></div>
        <div className="cgrid">{featured.map((c) => <CourseCard key={c.slug} c={c} onPay={setPayFor} onWait={setWaitFor} />)}</div>
        <div className="center" style={{ marginTop: 30 }}><Link className="btn ghost" href="/courses">See all courses →</Link></div>
      </div></section>

      {/* PHILOSOPHY */}
      <section className="alt"><div className="wrap split">
        <div className="split-img arch" data-rv><img src="/images/home/temple.webp" alt="Carved stone temple tower" loading="lazy" /></div>
        <div data-rv>
          <div className="eyebrow">Our philosophy</div>
          <h2 className="h">Ancient wisdom, <em>a living guide</em></h2>
          <p className="lead">Rooted in the Vedas, Upaniṣads, Itihāsas and Purāṇas, we make these profound truths clear, relatable and practical for modern life.</p>
          <p className="lead">We see this wisdom not as something from the distant past, but as a living guide that brings balance, clarity and purpose to everyday challenges — helping seekers reconnect with their roots.</p>
          <Link className="btn ghost" href="/about" style={{ marginTop: 18 }}>About Mantra Academy →</Link>
        </div>
      </div></section>

      {/* GURUKULA */}
      <section><div className="wrap center">
        <div className="eyebrow" data-rv>How we teach</div>
        <h2 className="h" data-rv>The <em>Gurukula</em> way, online</h2>
        <p className="lead narrow" data-rv>The Veda passes from mouth to ear — <i>gurumukha-paramparā</i>. Every class follows the same patient rhythm.</p>
        <GurukulaCycle />
      </div></section>

      {/* TEACHERS */}
      <section className="alt"><div className="wrap center">
        <div className="eyebrow" data-rv>Your teachers</div>
        <h2 className="h" data-rv>Taught in the <em>Gurukula</em> tradition</h2>
        <div className="teachers" style={{ ["--n" as any]: 2 }}>
          {(["karthik", "jyothi"] as const).map((id) => {
            const t = TEACHERS[id];
            return (
              <div className="t" key={id} data-rv>
                <div className="ph"><img src={t.image} alt={t.name} loading="lazy" /></div>
                <div><h4>{t.name}</h4><div className="role">{t.role}</div><p>{t.bio}</p></div>
              </div>
            );
          })}
        </div>
        <div className="tstats" data-rv><span>220+ students</span><span>12 countries</span><span>Live, small batches</span></div>
      </div></section>

      {/* TESTIMONIALS */}
      {voices.length > 0 && (
        <section><div className="wrap center">
          <div className="eyebrow" data-rv>Words from students</div>
          <h2 className="h" data-rv>What students say</h2>
          <div className="rating" data-rv><b>4.9</b><span className="stars">★★★★★</span><span>rated by our students</span><span className="sep">·</span><b>220+</b><span>students in 12 countries</span></div>
          <div className={`tgrid${voices.length === 2 ? " two" : ""}`}>
            {voices.map((t, i) => (
              <div className={`tq${i === 0 ? " big" : ""}`} key={i} data-rv>
                <div className="mark">“</div>
                <p className="q">{(t.feedback || "").length > 320 ? (t.feedback || "").slice(0, 300).replace(/\s+\S*$/, "") + "…" : t.feedback}</p>
                <div className="w"><b>{t.name.trim()}</b>{t.title ? ` · ${t.title.trim()}` : ""}</div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      {/* VISION / MISSION */}
      <section className="alt"><div className="wrap center">
        <div className="eyebrow" data-rv>Why we exist</div>
        <h2 className="h" data-rv>Our vision <em>&amp; mission</em></h2>
        <VisionMission />
        <Shloka />
      </div></section>

      {/* COMMUNITY */}
      <section style={{ paddingTop: 10 }}><div className="wrap">
        <div className="final updates" data-rv>
          <Illus name="lotus" />
          <h2 className="h">Join our <em>community</em></h2>
          <p className="lead">New batches, festival sādhanās, short teachings and live events — stay connected with seekers from 12 countries.</p>
          <div className="ctas">
            <a className="btn" href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer">Join the WhatsApp channel →</a>
            <a className="btn ghost" href="https://www.youtube.com/@MantrAcademy24" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a className="btn ghost" href="https://www.instagram.com/mantr.academy/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div></section>
    </div>
  );
}
