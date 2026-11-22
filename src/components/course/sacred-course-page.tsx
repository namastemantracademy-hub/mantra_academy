"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Course } from "@/lib/initial-data";
import { PayEnrollDialog } from "@/components/pay-enroll-dialog";
import { feeLabel, feeNote, formatRupees, normalizeFeeType } from "@/lib/fees";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { DEFAULT_FACTS, TEACHERS, getCourseExperience, type JourneyStep } from "@/lib/course-experience";
import { Illus, IllustrationSprite, type IllusName } from "./illustrations";
import "./sacred-course.css";

const STEP_ICONS: IllusName[] = ["palm", "sound", "kalasha", "flowers", "arati", "home", "lotus", "mala"];
const FACT_ICONS: IllusName[] = ["s-live", "s-cal", "s-lang", "s-rec", "s-book"];

/** "*word*" → highlighted */
function Emph({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <React.Fragment key={i}>{p}</React.Fragment>))}</>;
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
  const rootRef = useRef<HTMLDivElement>(null);
  const x = getCourseExperience(course.slug);
  const title = x.displayTitle || course.title;
  const full = normalizeFeeType(course.feeType) === "full";
  const price = typeof course.price === "number" ? course.price : undefined;

  // ---- content, with database fallbacks ----
  const subtitle = x.subtitle;
  const lead = x.lead || course.description || "";
  const heroImage = x.heroImage || imageUrl(course.image);
  const startDate = course.startDate ? new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(course.startDate)) : "";

  const facts: [string, string][] =
    x.facts ||
    ([
      startDate ? ["Starts", startDate] : null,
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
  const faqs = course.faqs || [];

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

  const enroll = () => setEnrollOpen(true);
  const amount = price !== undefined ? formatRupees(price) : "";

  return (
    <div className="sacred" ref={rootRef}>
      <IllustrationSprite />
      <PayEnrollDialog open={enrollOpen} onOpenChange={setEnrollOpen} slug={course.slug} title={title} price={course.price} feeType={course.feeType} />

      {/* HERO */}
      <header className="hero">
        <Mandala />
        <div className="wrap grid">
          <div className="hero-text">
            <div className="eyebrow">✦ {x.eyebrow || "Live online course · Registrations open"}</div>
            <h1>{title}</h1>
            {subtitle ? <div className="sub">{subtitle}</div> : <div />}
            <p className="lead"><Emph text={lead} /></p>
            <div className="pricebar">
              <button type="button" className="btn" onClick={enroll}>Pay &amp; Enroll →</button>
              {amount && <div className="amt">{amount}<small>{feeLabel(course.feeType)}</small></div>}
            </div>
            <div className="assure"><span>Refund within 7 days</span><span>Recordings of every class</span><span>Secure payment</span></div>
            <div className="world">Students from <b>India · USA · UAE · Germany</b></div>
          </div>
          {heroImage && (
            <div className="photo">
              <div className="img"><img src={heroImage} alt={x.heroAlt || title} /></div>
              {x.stats?.rating ? (
                <div className="badge"><b>{x.stats.rating} ★</b>rated by our students{x.stats.completed && <span className="bstar">{x.stats.completed} completed</span>}</div>
              ) : x.stats?.completed ? (
                <div className="badge"><b>{x.stats.completed}</b>students completed</div>
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

      {/* FOR YOU */}
      {forYou.length > 0 && (
        <section><div className="wrap center">
          <div className="eyebrow" data-rv>Is this for you?</div>
          <h2 className="h" data-rv>If you relate to any of these, <em>this course is for you</em></h2>
          <div className="divider" data-rv>✦</div>
          <div className="foryou">
            {forYou.map((t, i) => <div className="fy" key={i} data-rv><span className="tick">✓</span><p>{t}</p></div>)}
          </div>
        </div></section>
      )}

      {/* GURUKULA (Rudra) */}
      {x.gurukula && (
        <section className="alt"><div className="wrap">
          <div className="rudra-head">
            <div>
              <div className="eyebrow" data-rv>Learning the Gurukula way</div>
              <h2 className="h" data-rv>From the Guru&apos;s voice <em>to yours</em></h2>
              <p className="lead" data-rv>The Veda passes from mouth to ear — <i>gurumukha-paramparā</i>. This is how every class works.</p>
            </div>
            {x.stats?.completed && <div className="rstat" data-rv><b>{x.stats.completed}</b><span>students have completed<br />{title}</span></div>}
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
        <section className={x.gurukula ? "" : "alt"}><div className="wrap">
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

      {/* LIVE & GUIDED */}
      <section><div className="wrap center">
        <div className="eyebrow" data-rv>Live · Guided · Personal</div>
        <h2 className="h" data-rv>Learn live. <em>Never alone.</em></h2>
        <div className="guided">
          <div className="g" data-rv><div className="live">Live</div><div className="ic"><Illus name="s-live" /></div><h4>Live classes</h4><p>On Google Meet, with your āchārya.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="sound" /></div><h4>Chanting correction</h4><p>Your pronunciation corrected, one by one, in class.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="s-rec" /></div><h4>Recordings</h4><p>Missed a class? Watch it and bring doubts to the next one.</p></div>
          <div className="g" data-rv><div className="ic"><Illus name="s-book" /></div><h4>WhatsApp group</h4><p>Questions answered between classes, with your batch.</p></div>
        </div>
      </div></section>

      {/* TEACHERS */}
      <section className="alt"><div className="wrap center">
        <div className="eyebrow" data-rv>{teachers.length > 1 ? "Your teachers" : "Your teacher"}</div>
        <h2 className="h" data-rv>Taught in the <em>Gurukula</em> tradition</h2>
        <div className={`teachers${teachers.length === 1 ? " one" : ""}`} style={{ ["--n" as any]: teachers.length }}>
          {teachers.map((t) => (
            <div className="t" key={t.name} data-rv>
              <div className="ph"><img src={t.image} alt={t.name} /></div>
              <div><h4>{t.name}</h4><div className="role">{t.role}</div><p>{t.bio}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section><div className="wrap center">
          <div className="eyebrow" data-rv>Words from students</div>
          <h2 className="h" data-rv>What students say</h2>
          {(x.stats?.rating || x.stats?.completed) && (
            <div className="rating" data-rv>
              {x.stats?.rating && <><b>{x.stats.rating}</b><span className="stars">★★★★★</span><span>rated by our students</span></>}
              {x.stats?.rating && x.stats?.completed && <span className="sep">·</span>}
              {x.stats?.completed && <><b>{x.stats.completed}</b><span>completed {title}</span></>}
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className={testimonials.length ? "alt" : ""}><div className="wrap">
          <div className="center"><div className="eyebrow" data-rv>Questions</div><h2 className="h" data-rv>Frequently asked</h2></div>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={i} open={i === 0} data-rv>
                <summary>{f.question}</summary>
                <div className="ans" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(f.answer || "") }} />
              </details>
            ))}
            <details data-rv>
              <summary>Can I get a refund?</summary>
              <div className="ans"><p>Yes — within 7 days of payment or before your second class, minus the small payment-gateway charge. <a href="/refund-policy" style={{ color: "var(--gold-soft)" }}>Read the refund policy</a>.</p></div>
            </details>
          </div>
        </div></section>
      )}

      {/* FINAL */}
      <section style={{ paddingTop: 20 }}><div className="wrap">
        <div className="final" data-rv>
          <Illus name="diya" />
          <h2 className="h">Begin your <em>{title}</em></h2>
          <p className="lead">{x.finalLine || "Learn it the traditional way — live, guided and personal."}</p>
          {amount && <div className="amt">{amount}<small>{feeLabel(course.feeType)}</small></div>}
          <button type="button" className="btn" onClick={enroll}>Pay &amp; Enroll →</button>
          <p className="fee-note" style={{ margin: "16px auto 0" }}>{feeNote(course.feeType)}</p>
          <div className="assure"><span>Refund within 7 days</span><span>Secure payment by Razorpay</span></div>
        </div>
        <div className="final-pad" />
      </div></section>

      {amount && (
        <div className="mobilebar"><div className="amt">{amount}</div><button type="button" className="btn" onClick={enroll}>Pay &amp; Enroll</button></div>
      )}
    </div>
  );
}
