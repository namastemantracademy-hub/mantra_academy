"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { TEACHERS } from "@/lib/course-experience";
import { Illus, IllustrationSprite } from "@/components/course/illustrations";
import { Mandala, GurukulaCycle, VisionMission, Shloka, useReveal, WHATSAPP_CHANNEL } from "./sacred-home";
import "@/components/course/sacred-course.css";

const BIOS: Record<"karthik" | "jyothi", string[]> = {
  karthik: [
    "Dr. Karthik Sharma is a scholar shaped by over 13 years of immersive learning in the traditional Gurukula system, with a firm grounding in the Indian Knowledge Systems (IKS). Introduced to the Vedic tradition at the age of 10, he studied the Kṛṣṇa Yajurveda along with the Upaniṣads, Bhagavad Gītā, Brahmasūtras, Yogasūtras, and śāstras such as Vyākaraṇa, Kāvya and Mīmāṃsā.",
    "Under the guidance of Ācārya Dr. Ramachandra Bhat Kotemane, he developed a deeply experiential and contemplative approach to Vedānta. He holds Vidwat (M.A.) in Advaita Vedānta and an M.Phil, and was awarded the Ph.D. (Vidyāvāridhi) by Karnataka Samskrit University, Bengaluru, in 2026 for his doctoral thesis — a critical study of Advaita Vedānta in the Vyāsa Gītā and Īśvara Gītā of the Kūrma Purāṇa. With a heartfelt commitment to preserving India’s sacred wisdom, he shares the Gurukula way of learning — bridging ancient heritage and modern seekers through teaching, reflection and practice.",
  ],
  jyothi: [
    "Dr. Jyothi Sharma is a scholar and teacher deeply grounded in the wisdom of the Indian Knowledge System (IKS). Trained in the traditional Gurukula way, she carries the living heritage of oral transmission, disciplined study and spiritual practice at the heart of Bhārata’s sacred teachings.",
    "Her understanding of Advaita Vedānta and the Sanskrit scriptures is enriched by immersive Gurukula education, where scholarship meets heartfelt experience. At Mantra Academy she guides learners — children and adults alike — gently but deeply, nurturing not just knowledge but transformation through sound, meaning and devotion.",
  ],
};

const VALUES = [
  { icon: "ear", t: "Authentic", d: "Taught as received from our Gurus — correct svara, pronunciation and meaning." },
  { icon: "s-live", t: "Live & personal", d: "Small live batches, where every voice is heard and corrected." },
  { icon: "lotus", t: "Lived, not just learned", d: "Practice that brings balance, clarity and purpose into everyday life." },
  { icon: "s-lang", t: "Open to all seekers", d: "Explained in clear English, for students in India and around the world." },
] as const;

export function SacredAbout() {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div className="sacred home about" ref={rootRef}>
      <IllustrationSprite />

      {/* HERO */}
      <header className="hero">
        <Mandala />
        <div className="wrap grid">
          <div className="hero-text">
            <div className="eyebrow">✦ About Mantra Academy</div>
            <h1>An online home for the <em className="h1em">Gurukula spirit</em></h1>
            <p className="lead">Mantra Academy brings the ancient wisdom of Bhārata’s spiritual heritage to seekers everywhere — the Vedas, mantras, pūjā and Sanskrit, taught live and in the traditional way.</p>
            <div className="lstats left">
              <span><b>13</b> years of Gurukula study</span>
              <span><b>220+</b> students</span>
              <span><b>12</b> countries</span>
            </div>
          </div>
          <div className="photo">
            <div className="img"><img src="/images/home/acharya-smile.webp" alt="Dr. Karthik Sharma" /></div>
            <div className="book"><Illus name="palm" /><div><b>Gurukula trained</b><small>Veda · Vedānta · Sanskrit</small></div></div>
          </div>
        </div>
      </header>

      {/* STORY */}
      <section><div className="wrap split">
        <div className="split-img framed" data-rv><img src="/images/home/teaching.webp" alt="Dr. Karthik Sharma teaching a live online class" loading="lazy" /></div>
        <div data-rv>
          <div className="eyebrow">Our story</div>
          <h2 className="h">Ancient wisdom, <em>a living guide</em></h2>
          <p className="lead">At Mantra Academy, we bring the wisdom of the Vedas, Upaniṣads, Itihāsas and Purāṇas into everyday life — making these profound truths clear, relatable and practical.</p>
          <p className="lead">We see this wisdom not as something from the distant past, but as a living guide that brings balance, clarity and purpose to modern challenges. Through live classes, our āchāryas pass on what they received in the Gurukula — sound by sound, with care for both accuracy and meaning.</p>
        </div>
      </div></section>

      {/* VISION / MISSION */}
      <section className="alt"><div className="wrap center">
        <div className="eyebrow" data-rv>Why we exist</div>
        <h2 className="h" data-rv>Our vision <em>&amp; mission</em></h2>
        <VisionMission />
      </div></section>

      {/* INSPIRATION */}
      <section><div className="wrap split rev">
        <div className="split-img guru medal" data-rv><img src="/images/guru.jpg" alt="Ācārya Dr. Ramachandra Bhat Kotemane" loading="lazy" /></div>
        <div data-rv>
          <div className="eyebrow">Our inspiration</div>
          <h2 className="h">Ācārya Dr. Ramachandra <em>Bhat Kotemane</em></h2>
          <div className="role-line">Scholar · Mystic · Visionary guide</div>
          <p className="lead">At the heart of Mantra Academy stands our revered Ācārya — Pradhāna Ācārya of Veda Vijñāna Gurukulam, founder of Veda Vijñāna Śodha Saṃsthānam, and former Vice-Chancellor of S-VYASA Yoga University, Bengaluru.</p>
          <p className="lead">With decades of sādhanā, scholarship and compassion, he has guided countless seekers into the inner world of the Vedas and Upaniṣads. For us he is the root inspiration of every course, every chant and every student we serve — we walk this path holding his blessing close to our hearts.</p>
        </div>
      </div></section>

      {/* TEACHERS */}
      <section className="alt"><div className="wrap">
        <div className="center"><div className="eyebrow" data-rv>Your teachers</div><h2 className="h" data-rv>Meet the <em>āchāryas</em></h2></div>
        <div className="bios">
          {(["karthik", "jyothi"] as const).map((id) => {
            const t = TEACHERS[id];
            return (
              <div className="bio" key={id} data-rv>
                <div className="ph"><img src={t.image} alt={t.name} loading="lazy" /></div>
                <div>
                  <h3>{t.name}</h3>
                  <div className="role">{t.role}</div>
                  {BIOS[id].map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            );
          })}
        </div>
      </div></section>

      {/* GURUKULA + VALUES */}
      <section><div className="wrap center">
        <div className="eyebrow" data-rv>How we teach</div>
        <h2 className="h" data-rv>The <em>Gurukula</em> way, online</h2>
        <p className="lead narrow" data-rv>The Veda passes from mouth to ear — <i>gurumukha-paramparā</i>. Every class follows the same patient rhythm.</p>
        <GurukulaCycle />
        <div className="guided" style={{ marginTop: 48 }}>
          {VALUES.map((v) => (
            <div className="g" key={v.t} data-rv><div className="ic"><Illus name={v.icon} /></div><h4>{v.t}</h4><p>{v.d}</p></div>
          ))}
        </div>
        <Shloka />
      </div></section>

      {/* CTA */}
      <section style={{ paddingTop: 10 }}><div className="wrap">
        <div className="final updates" data-rv>
          <Illus name="lotus" />
          <h2 className="h">Begin <em>your sādhana</em></h2>
          <p className="lead">Join a live batch, or stay connected with our community for new courses and festival sādhanās.</p>
          <div className="ctas">
            <Link className="btn" href="/courses">Explore courses →</Link>
            <a className="btn ghost" href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer">Join the WhatsApp channel</a>
          </div>
        </div>
      </div></section>
    </div>
  );
}
