"use client";

import React, { useState } from "react";
import { Tiro_Devanagari_Sanskrit } from "next/font/google";
import type { CourseExperience, VedaExtras } from "@/lib/course-experience";
import { Illus, type IllusName } from "./illustrations";

/** Devanagari with Vedic svara marks. Loaded only on pages that use these sections. */
const deva = Tiro_Devanagari_Sanskrit({ weight: "400", subsets: ["devanagari", "latin", "latin-ext"], display: "swap" });

/** "*words*" → italic */
const It = ({ text, em }: { text: string; em?: boolean }) => (
  <>{text.split(/\*([^*]+)\*/g).map((p, i) => (i % 2 ? (em ? <em key={i}>{p}</em> : <i key={i}>{p}</i>) : <React.Fragment key={i}>{p}</React.Fragment>))}</>
);

/** A single sample verse, shown large, with its meaning. */
export function SampleVerse({ v }: { v: VedaExtras }) {
  const s = v.sample;
  return (
    <div className="vx-verse" data-rv>
      <div className="eyebrow">A taste of the chant</div>
      <p className={`vx-deva ${deva.className}`} lang="sa">{s.deva}</p>
      <p className="vx-roman">{s.roman}</p>
      <p className="vx-mean">“{s.meaning}” <span>— {s.source}</span></p>
      <p className="vx-cap">{s.caption}</p>
    </div>
  );
}

type Deity = { id: string; name: string; icon: IllusName; sukta: string; form: string };
const DEITIES: Deity[] = [
  { id: "siva", name: "Śiva", icon: "linga", sukta: "Sadyojātādi Pañca Mantrāḥ", form: "Bāṇaliṅga · Narmadā" },
  { id: "vishnu", name: "Viṣṇu", icon: "lotus", sukta: "Puruṣa Sūktam", form: "Śālagrāma · Gaṇḍakī" },
  { id: "surya", name: "Sūrya", icon: "diya", sukta: "Saura Sūktam", form: "Sphaṭika" },
  { id: "ganapati", name: "Gaṇapati", icon: "kalasha", sukta: "Gaṇapati Sūktam", form: "Śoṇabhadra · Śoṇa" },
  { id: "devi", name: "Devī", icon: "trishula", sukta: "Śrī Sūktam", form: "Svarṇamukhī" },
];
/** Slot 0 is the centre; then north-east, south-east, south-west, north-west. */
const SLOTS = ["c", "ne", "se", "sw", "nw"];

/** Pañcāyatana: tap a deity to bring it to the centre. */
export function Pancayatana({ p }: { p: NonNullable<CourseExperience["pancayatana"]> }) {
  const [order, setOrder] = useState(DEITIES.map((d) => d.id));
  const centre = DEITIES.find((d) => d.id === order[0])!;
  const choose = (id: string) => {
    const k = order.indexOf(id);
    if (k <= 0) return;
    const next = [...order];
    [next[0], next[k]] = [next[k], next[0]];
    setOrder(next);
  };
  return (
    <section><div className="wrap">
      <div className="vx-split">
        <div className="pyx-wrap" data-rv>
          <div className="pyx" role="group" aria-label="Pañcāyatana arrangement">
            <span className="pyx-dir n">N · uttara</span><span className="pyx-dir e">E</span>
            <span className="pyx-dir s">S · dakṣiṇa</span><span className="pyx-dir w">W</span>
            <svg className="pyx-lines" viewBox="0 0 100 100" aria-hidden>
              <rect x="8" y="8" width="84" height="84" rx="3" />
              {[[20, 20], [80, 20], [80, 80], [20, 80]].map(([x, y]) => <line key={`${x}${y}`} x1="50" y1="50" x2={x} y2={y} />)}
            </svg>
            {DEITIES.map((d) => {
              const slot = SLOTS[order.indexOf(d.id)];
              const isC = slot === "c";
              return (
                <button key={d.id} type="button" className={`pyx-d ${slot}${isC ? " on" : ""}`} onClick={() => choose(d.id)}
                  aria-label={isC ? `${d.name}, in the centre` : `Place ${d.name} in the centre`} aria-pressed={isC}>
                  <span className="pyx-c"><Illus name={d.icon} /></span>
                  <span className="pyx-n">{d.name}</span>
                  <span className="pyx-s">{p.label === "sukta" ? d.sukta : d.form}</span>
                </button>
              );
            })}
          </div>
          <p className="pyx-tip" aria-live="polite"><b>{centre.name}</b> in the centre · tap any deity to make it yours</p>
        </div>
        <div>
          <div className="eyebrow" data-rv>{p.eyebrow}</div>
          <h2 className="h" data-rv><It text={p.title} em /></h2>
          <p className="lead" data-rv>{p.text}</p>
          <p className="about-small" data-rv style={{ textAlign: "left" }}>Corner positions differ between traditions; this follows a common arrangement.</p>
        </div>
      </div>
    </div></section>
  );
}

/** What is the Veda + the six lessons of Śikṣā + why every svara matters. */
export function VedaStory({ v }: { v: VedaExtras }) {
  return (
    <>
      <section><div className="wrap center">
        <div className="eyebrow" data-rv>Taittirīya Upaniṣad 1.2</div>
        <h2 className="h" data-rv>Six lessons. <em>Every syllable.</em></h2>
        <p className="lead narrow" data-rv>{v.sikshaIntro}</p>
        <div className="vx-six">
          {v.lessons.map((l) => (
            <div className="vx-l" key={l.name} data-rv>
              <span className={`vx-ld ${deva.className}`} lang="sa">{l.deva}</span>
              <b>{l.name}</b><small>{l.text}</small>
            </div>
          ))}
        </div>
      </div></section>

      <section><div className="wrap">
        <div className="center">
          <div className="eyebrow" data-rv>One svara, one destiny</div>
          <h2 className="h" data-rv>The same letters. <em>A different mantra.</em></h2>
        </div>
        <div className="vx-story">
          <blockquote data-rv><It text={v.svaraStory} /></blockquote>
        </div>
        <p className="journey-note" data-rv>{v.svaraClose}</p>
        <div className="center" data-rv><a className="btn" href="#pricing">See fees &amp; join →</a></div>
      </div></section>
    </>
  );
}

/** Course manual: small tilted page previews (not readable, not downloadable). */
export function ManualPreview({ m, inline }: { m: NonNullable<CourseExperience["manual"]>; inline?: boolean }) {
  const body = (
    <div className="center">
      <div className="eyebrow" data-rv>Included with the course</div>
      <h2 className="h" data-rv><It text={m.title} em /></h2>
      <p className="lead narrow" data-rv>{m.text}</p>
      <div className="vx-pages" data-rv>
        {m.pages.map((p, i) => (
          <img key={p.src} src={p.src} alt={p.alt} width={220} height={311} loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} style={{ ["--r" as any]: `${(i - 2) * 3}deg` }} />
        ))}
      </div>
      {m.langs && <div className="vx-langs" data-rv><span>Available in</span>{m.langs.split(" · ").map((l) => <b key={l}>{l}</b>)}</div>}
    </div>
  );
  if (inline) return <div id="manual" className="vx-manual-inline">{body}</div>;
  return <section id="manual"><div className="wrap">{body}</div></section>;
}
