"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Illus, IllustrationSprite } from "@/components/course/illustrations";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { useReveal } from "./sacred-home";
import { imageUrl, niceDate, type PostCard } from "./sacred-wisdom";
import "@/components/course/sacred-course.css";

const AUTHORS: Record<string, string> = { "karthik sharma": "Dr. Karthik Sharma", "jyothi sharma": "Vid. Jyothi Sharma" };

export function SacredArticle({ post }: { post: PostCard & { content?: string } }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const img = imageUrl(post.image);
  const author = post.author ? AUTHORS[post.author.trim().toLowerCase()] || post.author : "";

  return (
    <div className="sacred home article" ref={rootRef}>
      <IllustrationSprite />
      <header className="ahero">
        <div className="wrap">
          <Link className="aback" href="/blog">← Wisdom</Link>
          <h1>{post.title}</h1>
          <div className="vmeta">{[author, niceDate(post.date || post.createdAt)].filter(Boolean).join(" · ")}</div>
          {img && <div className="acover"><img src={img} alt="" /></div>}
        </div>
      </header>

      <section style={{ paddingTop: 20 }}><div className="wrap">
        <div className="prosa" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(post.content || "") }} />
      </div></section>

      <section style={{ paddingTop: 10 }}><div className="wrap">
        <div className="final updates" data-rv>
          <Illus name="ear" />
          <h2 className="h">Learn it <em>properly, live</em></h2>
          <p className="lead">Mantras are learned by listening, repeating and being corrected — join a live batch with our āchāryas.</p>
          <div className="ctas">
            <Link className="btn" href="/courses">Explore courses →</Link>
            <Link className="btn ghost" href="/blog">More teachings</Link>
          </div>
        </div>
      </div></section>
    </div>
  );
}
