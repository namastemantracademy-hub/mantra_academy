"use client";

import Link from "next/link";
import type { Course } from "@/lib/initial-data";
import { feeShortLabel, formatRupees } from "@/lib/fees";
import { batchStatus } from "@/lib/batch";
import { getCourseExperience } from "@/lib/course-experience";
import { Illus } from "./illustrations";
import { smallCloudinary } from "@/lib/cloudinary-image";

function imageUrl(img: any): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.secure_url || img.url || img.src || "";
}

/** One course card (used on the courses list and the home page). Needs IllustrationSprite on the page. */
export function CourseCard({ c, onPay, onWait }: { c: Course; onPay: (c: Course) => void; onWait: (c: Course) => void }) {
  const x = getCourseExperience(c.slug);
  const title = x.displayTitle || c.title;
  const wait = c.registrationsOpen === false;
  const b = wait ? { short: "Opening soon" } : batchStatus(c.startDate);
  // The card shows the cover photo set in Admin; the built-in hero photo is only a fallback.
  const img = smallCloudinary(imageUrl(c.image)) || x.heroImage;
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
              <button type="button" className="btn" onClick={() => onWait(c)}>Join the waitlist</button>
            ) : (
              <button type="button" className="btn" onClick={() => onPay(c)}>Pay &amp; Enroll</button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
