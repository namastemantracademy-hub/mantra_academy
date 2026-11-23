"use client";

import React from "react";
import { Tiro_Devanagari_Sanskrit } from "next/font/google";
import type { VedaExtras } from "@/lib/course-experience";

/** Devanagari with Vedic svara marks. Loaded only on pages that use these sections. */
const deva = Tiro_Devanagari_Sanskrit({ weight: "400", subsets: ["devanagari", "latin", "latin-ext"], display: "swap" });

/** "*words*" → italic */
const It = ({ text }: { text: string }) => (
  <>{text.split(/\*([^*]+)\*/g).map((p, i) => (i % 2 ? <i key={i}>{p}</i> : <React.Fragment key={i}>{p}</React.Fragment>))}</>
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

/** Why these five: the Pañcāyatana. */
export function Pancayatana({ v }: { v: VedaExtras }) {
  const p = v.pancayatana;
  return (
    <section><div className="wrap">
      <div className="vx-split">
        <figure className="vx-diagram" data-rv>
          <img src={p.image} alt={p.alt} width={900} height={755} loading="lazy" />
          <figcaption>{p.note}</figcaption>
        </figure>
        <div>
          <div className="eyebrow" data-rv>Pañcāyatana pūjā</div>
          <h2 className="h" data-rv>Why <em>these five?</em></h2>
          <p className="lead" data-rv>{p.text}</p>
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
          <div className="vx-guard" data-rv>
            <h4>How the Veda was guarded</h4>
            <p>{v.guarded}</p>
            <figure className="vx-diagram"><img src={v.pathaImage} alt={v.pathaAlt} width={1000} height={450} loading="lazy" /></figure>
          </div>
        </div>
        <p className="journey-note" data-rv>{v.svaraClose}</p>
        <div className="center" data-rv><a className="btn" href="#pricing">See fees &amp; join →</a></div>
      </div></section>
    </>
  );
}

/** Course manual: small tilted page previews (not readable, not downloadable). */
export function ManualPreview({ v }: { v: VedaExtras }) {
  return (
    <section id="manual" className="alt"><div className="wrap center">
      <div className="eyebrow" data-rv>Included with the course</div>
      <h2 className="h" data-rv>A 68-page illustrated <em>course manual.</em></h2>
      <p className="lead narrow" data-rv>{v.manual.text}</p>
      <div className="vx-pages" data-rv>
        {v.manual.pages.map((p, i) => (
          <img key={p.src} src={p.src} alt={p.alt} width={220} height={311} loading="lazy" style={{ ["--r" as any]: `${(i - 2) * 3}deg` }} />
        ))}
      </div>
    </div></section>
  );
}
