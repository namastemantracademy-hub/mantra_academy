"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Illus, IllustrationSprite } from "@/components/course/illustrations";
import { Mandala, useReveal } from "./sacred-home";
import type { Video } from "@/lib/youtube";
import "@/components/course/sacred-course.css";

export type PostCard = { slug: string; title: string; excerpt?: string; author?: string; date?: string; createdAt?: string; image?: any };

export function imageUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  return image.secure_url || image.secureUrl || image.url || image.src || image.image?.secure_url || undefined;
}

export function niceDate(d?: string) {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Shows only the thumbnail until tapped — the YouTube player loads on demand, so the page stays fast. */
function VideoCard({ v, big }: { v: Video; big?: boolean }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`vcard${big ? " big" : ""}`} data-rv>
      <div className="vframe">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play: ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="vplay" aria-hidden>▶</span>
          </button>
        )}
      </div>
      <h3>{v.title}</h3>
      <div className="vmeta">{niceDate(v.published)}</div>
    </div>
  );
}

export function SacredWisdom({ videos, posts, channelUrl }: { videos: Video[]; posts: PostCard[]; channelUrl: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  useReveal(rootRef);
  const [first, ...rest] = videos;
  const more = showAll ? rest : rest.slice(0, 6);

  return (
    <div className="sacred home wisdom" ref={rootRef}>
      <IllustrationSprite />

      <header className="hero lhero">
        <Mandala />
        <div className="wrap center hero-text">
          <div className="eyebrow">✦ Free teachings</div>
          <h1>Wisdom <em className="h1em">for every seeker</em></h1>
          <p className="lead narrow">Short teachings on mantras, svaras, pūjā and the Vedic way of life — from our āchāryas, free to watch and read.</p>
          <div className="ctas">
            <a className="btn" href={`${channelUrl}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">Subscribe on YouTube →</a>
            {posts.length > 0 && <a className="btn ghost" href="#articles">Read articles</a>}
          </div>
        </div>
      </header>

      {/* VIDEOS */}
      <section><div className="wrap">
        <div className="lhead"><div className="eyebrow" data-rv>Watch</div><h2 className="h" data-rv>Latest <em>videos</em></h2></div>
        {first ? (
          <>
            <VideoCard v={first} big />
            <div className="vgrid">{more.map((v) => <VideoCard key={v.id} v={v} />)}</div>
            <div className="center" style={{ marginTop: 30 }}>
              {!showAll && rest.length > 6
                ? <button type="button" className="btn ghost" onClick={() => setShowAll(true)}>Show more videos</button>
                : <a className="btn ghost" href={channelUrl} target="_blank" rel="noopener noreferrer">See all on YouTube →</a>}
            </div>
          </>
        ) : (
          <p className="lead center">Watch our teachings on <a className="linkish" href={channelUrl} target="_blank" rel="noopener noreferrer">our YouTube channel</a>.</p>
        )}
      </div></section>

      {/* ARTICLES */}
      {posts.length > 0 && (
        <section className="alt" id="articles"><div className="wrap">
          <div className="lhead"><div className="eyebrow" data-rv>Read</div><h2 className="h" data-rv>From the <em>scribe’s desk</em></h2></div>
          <div className="agrid">
            {posts.map((p) => {
              const img = imageUrl(p.image);
              return (
                <Link className="acard" href={`/blog/${p.slug}`} key={p.slug} data-rv>
                  {img && <div className="aimg"><img src={img} alt="" loading="lazy" /></div>}
                  <div className="abody">
                    <div className="vmeta">{niceDate(p.date || p.createdAt)}</div>
                    <h3>{p.title}</h3>
                    {p.excerpt && <p>{p.excerpt}</p>}
                    <span className="amore">Read article →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div></section>
      )}

      {/* CTA */}
      <section style={{ paddingTop: posts.length ? 64 : 10 }}><div className="wrap">
        <div className="final updates" data-rv>
          <Illus name="ear" />
          <h2 className="h">Learn it <em>properly, live</em></h2>
          <p className="lead">Videos inspire — but mantras are learned by listening, repeating and being corrected. Join a live batch with our āchāryas.</p>
          <div className="ctas"><Link className="btn" href="/courses">Explore courses →</Link></div>
        </div>
      </div></section>
    </div>
  );
}
