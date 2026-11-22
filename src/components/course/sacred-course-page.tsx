"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Course } from "@/lib/initial-data";
import { PayEnrollDialog } from "@/components/pay-enroll-dialog";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { feeLabel, feeNote, formatRupees, normalizeFeeType } from "@/lib/fees";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { DEFAULT_FACTS, TEACHERS, getCourseExperience, type JourneyStep } from "@/lib/course-experience";
import { Illus, IllustrationSprite, type IllusName } from "./illustrations";
import { batchStatus } from "@/lib/batch";
import "./sacred-course.css";

const STEP_ICONS: IllusName[] = ["palm", "sound", "kalasha", "flowers", "arati", "home", "lotus", "mala"];
const FACT_ICONS: IllusName[] = ["s-live", "s-cal", "s-lang", "s-rec", "s-book"];
const SUPPORT_ICONS: IllusName[] = ["s-live", "hand", "ear", "s-rec", "s-book", "lotus"];
const WHATSAPP = "https://wa.me/919108787550";
const DEFAULT_SUPPORT = [
  { title: "Live classes", text: "On Google Meet, with your āchārya.", live: true },
  { title: "Chanting correction", text: "Your pronunciation corrected, one by one, in class." },
  { title: "Recordings", text: "Missed a class? Watch it and bring doubts to the next one." },
  { title: "WhatsApp group", text: "Questions answered between classes, with your batch." },
];

/** "*word*" → highlighted */
function Emph({ text, em }: { text: string; em?: boolean }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? (em ? <em key={i}>{p}</em> : <b key={i}>{p}</b>) : <React.Fragment key={i}>{p}</React.Fragment>))}</>;
}

function imageUrl(img: any): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.secure_url || img.url || img.src || "";
}

function plain(md?: string) {
  return (md || "").replace(/[#*_`>\[\]]/g, "").replace(/\s+/g, " ").trim();
}

function Mandala() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg className="mandala" viewBox="0 0 200 200" aria-hidden>
      <g fill="none" stroke="#D9A94E" strokeWidth=".6">
        {[96, 80, 60, 40].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
        {petals.map((d) => (
          <path key={d} d="M100 4 C112 30 112 50 100 60 C88 50 88 30 100 4Z" transform={`rotate(${d} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

export function SacredCoursePage({ course }: { course: Course & { _id?: string } }) {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [waitOpen, setWaitOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const x = getCourseExperience(course.slug);
  const title = x.displayTitle || course.title;
  const full = normalizeFeeType(course.feeType) === "full";
  const price = typeof course.price === "number" ? course.price : undefined;

  // ---- content, with database fallbacks ----
  const subtitle = x.subtitle;
  const lead = x.lead || course.description || "";
  const heroImage = x.heroImage || imageUrl(course.image);
  const waitlist = course.registrationsOpen === false;
  const batch = waitlist
    ? { label: "Next batch", date: "Opening soon", pill: "Join the waitlist to hear first", short: "Waitlist open" }
    : batchStatus(course.startDate);
  const completed = course.studentsCompleted?.trim() || x.stats?.completed;
  const rating = course.studentRating?.trim() || x.stats?.rating;

  const facts: [string, string][] =
    x.facts ||
    ([
      course.lectures ? [`${course.lectures} live classes`, "on Google Meet"] : DEFAULT_FACTS[0],
      course.language ? [course.language.split(/[\\/,]/)[0].trim(), course.level || "All levels"] : null,
      DEFAULT_FACTS[1],
      price !== undefined ? [formatRupees(price), full ? "total fee" : "registration + 1st month"] : null,
    ].filter(Boolean) as [string, string][]);

  const forYou =
    x.forYou ||
    (course.whoCanAttend || []).map((w) => (w.description ? `${w.title} — ${plain(w.description)}` : w.title)).slice(0, 6);

  const journey: JourneyStep[] =
    x.journey ||
    (course.highlights || []).slice(0, 6).map((h, i) => ({
      icon: STEP_ICONS[i % STEP_ICONS.length],
      tag: `Step ${i + 1}`,
      title: h.title.trim(),
      text: plain(h.description).slice(0, 180),
    }));

  const teachers = (x.teachers || ["karthik", "jyothi"]).map((id) => TEACHERS[id]);
  const testimonials = x.testimonials || [];
  const faqs = x.faqs || course.faqs || [];
  const support = x.support || DEFAULT_SUPPORT;
  const navItems = ([
    x.about ? ["about", "About"] : null,
    journey.length ? ["learn", "How you'll learn"] : null,
    x.curriculum ? ["curriculum", "Curriculum"] : null,
    ["support", "Support"],
    ["acharya", "Āchārya"],
    testimonials.length ? ["reviews", "Reviews"] : null,
    faqs.length ? ["faq", "FAQ"] : null,
  ].filter(Boolean) as [string, string][]);

  // ---- motion: reveal on scroll + timeline progress ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rv]"));
    els.forEach((el) => {
      el.classList.add("rv");
      const sibs = Array.from(el.parentElement?.children || []).filter((c) => (c as HTMLElement).dataset.rv !== undefined);
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 6) * 0.09}s`);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    const journeys = Array.from(root.querySelectorAll<HTMLElement>(".journey"));
    const onScroll = () => journeys.forEach((j) => {
      const r = j.getBoundingClientRect();
      const p = (window.innerHeight * 0.7 - r.top) / r.height;
      j.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const enroll = () => (waitlist ? setWaitOpen(true) : setEnrollOpen(true));
  const cta = waitlist ? "Join the waitlist" : "Pay & Enroll";
  const amount = price !== undefined ? formatRupees(price) : "";

  return (
    <div className="sacred" ref={rootRef}>
      <IllustrationSprite />
      <WaitlistDialog open={waitOpen} onOpenChange={setWaitOpen} slug={course.slug} title={title} />
      <PayEnrollDialog open={enrollOpen} onOpenChange={setEnrollOpen} slug={course.slug} title={title} price={course.price} feeType={course.feeType} />

      {/* HERO */}
      <header className="hero">
        <Mandala />
        <div className="wrap grid">
          <div className="hero-text">
            <div className="eyebrow">✦ {waitlist ? `${(x.eyebrow || "Live online course").replace(/\s*·\s*Registrations open/i, "")} · Waitlist open` : x.eyebrow || "Live online course · Registrations open"}</div>
            <h1>{title}</h1>
            {subtitle ? <div className="sub">{subtitle}</div> : <div />}
            <p className="lead"><Emph text={lead} /></p>
            <div className="batch">
              <div className="bhead"><span className="blabel">{batch.label}</span>{batch.pill && <span className="bpill">{batch.pill}</span>}</div>
              <div className="bdate"><Illus name="s-cal" />{batch.date}</div>
              {course.batchInfo && <div className="binfo">{course.batchInfo}</div>}
              <div className="brow">
                {amount && <div className="amt">{amount}<small>{feeLabel(course.feeType)}</small></div>}
                <button type="button" className="btn" onClick={enroll}>{cta} →</button>
              </div>
            </div>
            <div className="assure"><span>Refund within 7 days</span><span>Recordings of every class</span><span>Secure payment</span></div>
            <div className="world"><b>220+ students</b> in <b>12 countries</b> · India · USA · UAE · Germany</div>
          </div>
          {heroImage && (
            <div className="photo">
              <div className="img"><img src={heroImage} alt={x.heroAlt || title} /></div>
              {rating ? (
                <div className="badge"><b>{rating} ★</b>rated by our students{completed && <span className="bstar">{completed} completed</span>}</div>
              ) : completed ? (
                <div className="badge"><b>{completed}</b>students completed</div>
              ) : null}
              {x.heroCard && (
                <div className="book"><Illus name={x.heroCard.icon} /><div><b>{x.heroCard.title}</b><small>{x.heroCard.text}</small></div></div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* FACTS */}
      {facts.length > 0 && (
        <div className="facts">
          <div className="wrap" style={{ ["--n" as any]: Math.min(facts.length, 5) }}>
            {facts.slice(0, 5).map(([b, s], i) => (
              <div className="f" key={i} data-rv><Illus name={FACT_ICONS[i % FACT_ICONS.length]} /><div><b>{b}</b><small>{s}</small></div></div>
            ))}
          </div>
        </div>
      )}

      {/* BADGES */}
      {x.badges && x.badges.length > 0 && (
        <div className="chips wrap" data-rv>{x.badges.map((b) => <span key={b}>✦ {b}</span>)}</div>
      )}

      {/* IN-PAGE MENU */}
      {navItems.length > 2 && (
        <nav className="pnav" aria-label="On this page">
          <div className="wrap">
            {navItems.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            <button type="button" className="btn sm" onClick={enroll}>{cta}</button>
          </div>
        </nav>
      )}

      {/* FOR YOU */}
      {forYou.length > 0 && (
        <section id="foryou"><div className="wrap center">
          <div className="eyebrow" data-rv>Is this for you?</div>
          <h2 className="h" data-rv>{x.forYouNote ? <>Does any of this <em>sound like you?</em></> : <>If you relate to any of these, <em>this course is for you</em></>}</h2>
          <div className="divider" data-rv>✦</div>
          <div className="foryou">
            {forYou.map((t, i) => <div className="fy" key={i} data-rv><span className="tick">✓</span><p>{t}</p></div>)}
          </div>
          {x.forYouNote && (
            <div className="fy-note" data-rv>
              <p>{x.forYouNote}</p>
              <div className="ctas"><a className="btn ghost" href="#learn">See how you will learn →</a><a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp →</a></div>
            </div>
          )}
        </div></section>
      )}

      {/* ABOUT */}
      {x.about && (
        <section id="about" className="alt"><div className="wrap center">
          <div className="eyebrow" data-rv>{x.about.eyebrow}</div>
          <h2 className="h" data-rv><Emph text={x.about.title} em /></h2>
          <p className="lead narrow" data-rv>{x.about.intro}</p>
          <div className="parts">
            {x.about.parts.map((p) => (
              <div className="part" key={p.name} data-rv>
                <Illus name={p.icon} />
                <div><h3>{p.name}</h3><div className="tag">{p.tag}</div><p>{p.text}</p></div>
              </div>
            ))}
          </div>
          {x.about.note && <p className="journey-note" data-rv>{x.about.note}</p>}
        </div></section>
      )}

      {/* GURUKULA (Rudra) */}
      {x.gurukula && (
        <section className={x.about ? "" : "alt"}><div className="wrap">
          <div className="rudra-head">
            <div>
              <div className="eyebrow" data-rv>Learning the Gurukula way</div>
              <h2 className="h" data-rv>From the Guru&apos;s voice <em>to yours</em></h2>
              <p className="lead" data-rv>The Veda passes from mouth to ear — <i>gurumukha-paramparā</i>. This is how every class works.</p>
            </div>
            {completed && <div className="rstat" data-rv><b>{completed}</b><span>students have completed<br />{title}</span></div>}
          </div>
          <div className="cycle">
            <div className="cy" data-rv><Illus name="ear" /><b>Guru-mukha uccāraṇa</b><small>Listen to the Guru</small></div>
            <div className="arr" aria-hidden>›</div>
            <div className="cy" data-rv><Illus name="sound" /><b>Anu-uccāraṇa</b><small>Repeat the sound precisely</small></div>
            <div className="arr" aria-hidden>›</div>
            <div className="cy" data-rv><Illus name="hand" /><b>Correction</b><small>Refine the voice</small></div>
            <div className="arr" aria-hidden>›</div>
            <div className="cy on" data-rv><Illus name="lotus" /><b>Realisation</b><small>Embody the mantra</small></div>
            <div className="loop">↺ and again</div>
          </div>
          <div className="guru-art" data-rv><Illus name="guru" /></div>
          <div className="center" style={{ marginTop: 40 }}><div className="eyebrow" data-rv>Preparing the vessel</div></div>
          <div className="vessel">
            <div className="g" data-rv><h4>Deha · Body</h4><p>Clean, steady posture (āsana) and calm breath, to support the resonance of the sound.</p></div>
            <div className="g" data-rv><h4>Manas · Mind</h4><p>Reverence, focused attention (ekāgratā) and humility before the text.</p></div>
            <div className="g" data-rv><h4>Vāstu · Place</h4><p>A clean, dedicated space that honours the sacredness of the vibration.</p></div>
          </div>
        </div></section>
      )}

      {/* JOURNEY */}
      {journey.length > 0 && (
        <section id="learn" className="alt"><div className="wrap">
          <div className="center">
            <div className="eyebrow" data-rv>Clear steps · Rooted guidance</div>
            <h2 className="h" data-rv>How you&apos;ll learn <em>{x.journeyTitle || title}</em></h2>
            {x.journeyIntro && <p className="lead" data-rv>{x.journeyIntro}</p>}
          </div>
          <div className="journey">
            {journey.map((s, i) => (
              <div className="stp" key={i} data-rv>
                <div className="card"><Illus name={s.icon} /><div className="tag">{s.tag}</div><h3>{s.title}</h3><p>{s.text}</p></div>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
          {x.journeyNote && <p className="journey-note" data-rv><Emph text={x.journeyNote} /></p>}
          {x.path && (
            <div className="path">
              <span className="pl" data-rv>Your learning path</span>
              {x.path.map((p, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="parr" aria-hidden>›</span>}
                  <div className={`pn${i === 0 ? " on" : ""}`} data-rv><b>{p.title}</b><small>{p.text}</small></div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div></section>
      )}

      {/* CURRICULUM */}
      {x.curriculum && (
        <section id="curriculum"><div className="wrap">
          <div className="center">
            <div className="eyebrow" data-rv>Curriculum</div>
            <h2 className="h" data-rv>The full curriculum, <em>nothing hidden</em></h2>
            <p className="lead narrow" data-rv>{x.curriculum.intro}</p>
          </div>
          <div className="modules">
            {x.curriculum.modules.map((m, i) => (
              <details key={i} className="mod" open={i < 2} data-rv>
                <summary><span className="mn">{String(i).padStart(2, "0")}</span><span className="mt">{m.title.replace(/^Module \d+ · /, "")}</span></summary>
                <p>{m.text}</p>
              </details>
            ))}
          </div>
        </div></section>
      )}

      {/* SUPPORT */}
      <section id="support" className={x.curriculum ? "alt" : ""}><div className="wrap center">
        <div className="eyebrow" data-rv>Live · Guided · Personal</div>
        <h2 className="h" data-rv><Emph text={x.supportTitle || "Learn live. *Never alone.*"} em /></h2>
        <div className={`guided${support.length > 4 ? " six" : ""}`}>
          {support.map((g, i) => (
            <div className="g" key={i} data-rv>
              {g.live && <div className="live">Live</div>}
              <div className="ic"><Illus name={SUPPORT_ICONS[i % SUPPORT_ICONS.length]} /></div>
              <h4>{g.title}</h4><p>{g.text}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* BENEFITS */}
      {x.benefits && (
        <section><div className="wrap center">
          <div className="eyebrow" data-rv>The fruit of practice</div>
          <h2 className="h" data-rv>What this sādhana can <em>bring into your life</em></h2>
          <div className="benefits">
            {x.benefits.map((b) => (
              <div className="bf" key={b.title} data-rv><Illus name={b.icon} /><h4>{b.title}</h4><p>{b.text}</p></div>
            ))}
          </div>
        </div></section>
      )}

      {/* ONBOARDING */}
      {x.onboarding && (
        <section className="alt"><div className="wrap center">
          <div className="eyebrow" data-rv>A gentle beginning</div>
          <h2 className="h" data-rv><Emph text={x.onboarding.title} em /></h2>
          <ol className="onboard">
            {x.onboarding.steps.map((s, i) => <li key={i} data-rv><span>{i + 1}</span><p>{s}</p></li>)}
          </ol>
        </div></section>
      )}

      {/* PRICING */}
      {x.includes && amount && (
        <section id="pricing"><div className="wrap center">
          <div className="eyebrow" data-rv>Fees</div>
          <h2 className="h" data-rv>Begin your <em>{x.journeyTitle || title}</em> sādhana</h2>
          <div className="price-card" data-rv>
            <div className="pc-head"><div className="amt">{amount}<small>{feeLabel(course.feeType)}</small></div><div className="pc-date"><span className="blabel">{batch.label}</span><b>{batch.date}</b>{course.batchInfo && <small>{course.batchInfo}</small>}</div></div>
            <ul>{x.includes.map((t) => <li key={t}>{t}</li>)}</ul>
            <button type="button" className="btn wide" onClick={enroll}>{cta} →</button>
            <p className="fee-note">{feeNote(course.feeType)}</p>
            <div className="assure"><span>Refund within 7 days or before your 2nd class</span><span>Secure payment by Razorpay</span></div>
          </div>
        </div></section>
      )}

      {/* TEACHERS */}
      <section id="acharya" className="alt"><div className="wrap center">
        <div className="eyebrow" data-rv>{teachers.length > 1 ? "Your teachers" : "Meet your Āchārya"}</div>
        <h2 className="h" data-rv>Taught in the <em>Gurukula</em> tradition</h2>
        <div className={`teachers${teachers.length === 1 ? " one" : ""}`} style={{ ["--n" as any]: teachers.length }}>
          {teachers.map((t) => (
            <div className="t" key={t.name} data-rv>
              <div className="ph"><img src={t.image} alt={t.name} /></div>
              <div><h4>{t.name}</h4><div className="role">{t.role}</div><p>{t.bio}</p></div>
            </div>
          ))}
        </div>
        {x.teacherStats && <div className="tstats" data-rv>{x.teacherStats.split(" · ").map((s) => <span key={s}>{s}</span>)}</div>}
      </div></section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section id="reviews"><div className="wrap center">
          <div className="eyebrow" data-rv>Words from students</div>
          <h2 className="h" data-rv>What students say</h2>
          {(rating || completed) && (
            <div className="rating" data-rv>
              {rating && <><b>{rating}</b><span className="stars">★★★★★</span><span>rated by our students</span></>}
              {rating && completed && <span className="sep">·</span>}
              {completed && <><b>{completed}</b><span>completed {title}</span></>}
            </div>
          )}
          <div className={`tgrid${testimonials.length === 2 ? " two" : ""}`}>
            {testimonials.slice(0, 3).map((t, i) => (
              <div className={`tq${i === 0 ? " big" : ""}`} key={i} data-rv>
                <div className="mark">“</div>
                <p className="q">{t.quote}</p>
                <div className="w">{t.stars && <><span className="stars">★★★★★</span><br /></>}<b>{t.name}</b>{t.place ? ` · ${t.place}` : ""}</div>
              </div>
            ))}
          </div>
        </div></section>
      )}

      {/* FOUNDERS' NOTE */}
      {x.foundersNote && (
        <section className="alt"><div className="wrap">
          <div className="letter" data-rv>
            <div className="eyebrow">A note from the founders</div>
            <p className="greet">{x.foundersNote.greeting}</p>
            {x.foundersNote.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <p className="sign">{x.foundersNote.signoff}</p>
          </div>
        </div></section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq"><div className="wrap">
          <div className="center"><div className="eyebrow" data-rv>Questions</div><h2 className="h" data-rv>Frequently asked</h2></div>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={i} open={i === 0} data-rv>
                <summary>{f.question}</summary>
                <div className="ans" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(f.answer || "") }} />
              </details>
            ))}
            {!x.faqs && (
              <details data-rv>
                <summary>Can I get a refund?</summary>
                <div className="ans"><p>Yes — within 7 days of payment or before your second class, minus the small payment-gateway charge. <a href="/refund-policy" style={{ color: "var(--gold-soft)" }}>Read the refund policy</a>.</p></div>
              </details>
            )}
          </div>
        </div></section>
      )}

      {/* FINAL */}
      <section style={{ paddingTop: 20 }}><div className="wrap">
        <div className="final" data-rv>
          <Illus name="diya" />
          <h2 className="h">{x.finalTitle ? <Emph text={x.finalTitle} em /> : <>Begin your <em>{title}</em></>}</h2>
          <p className="lead">{x.finalLine || "Learn it the traditional way — live, guided and personal."}</p>
          <div className="fdate"><span className="blabel">{batch.label}</span> <b>{batch.date}</b>{course.batchInfo ? <> · {course.batchInfo}</> : null}</div>
          {amount && <div className="amt">{amount}<small>{feeLabel(course.feeType)}</small></div>}
          <button type="button" className="btn" onClick={enroll}>{cta} →</button>
          <p className="fee-note" style={{ margin: "16px auto 0" }}>{feeNote(course.feeType)}</p>
          <div className="assure"><span>Refund within 7 days</span><span>Secure payment by Razorpay</span></div>
        </div>
        <div className="final-pad" />
      </div></section>

      {amount && (
        <div className="mobilebar"><div className="amt">{amount}<small>{batch.short}</small></div><button type="button" className="btn" onClick={enroll}>{cta}</button></div>
      )}
    </div>
  );
}
