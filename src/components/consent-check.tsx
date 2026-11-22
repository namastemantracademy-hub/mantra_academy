"use client";

import React from "react";
import { isChildCourse } from "@/lib/consent";

type Props = {
  idPrefix: string;
  slug: string;
  /** Plain words: why we need these details. */
  purpose: string;
  /** "pay" shows Terms + Refund + Privacy; "contact" shows Privacy and contact consent. */
  kind: "pay" | "contact";
  agree: boolean;
  onAgree: (v: boolean) => void;
  guardian: boolean;
  onGuardian: (v: boolean) => void;
};

const link = "underline underline-offset-2 font-medium";

/** Unticked consent boxes, as India's DPDP Act asks. The form stays locked until they're ticked. */
export function ConsentCheck({ idPrefix, slug, purpose, kind, agree, onAgree, guardian, onGuardian }: Props) {
  const child = isChildCourse(slug);
  return (
    <div className="space-y-2.5 rounded-md border border-primary/25 bg-primary/5 p-3 text-sm">
      <p className="text-xs text-muted-foreground">
        {purpose} We never sell your details.{" "}
        <a href="/privacy" target="_blank" rel="noopener" className={link}>How we use your data</a>
      </p>
      <label htmlFor={`${idPrefix}-agree`} className="flex items-start gap-2.5 cursor-pointer leading-snug">
        <input
          id={`${idPrefix}-agree`}
          type="checkbox"
          checked={agree}
          onChange={(e) => onAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
        />
        {kind === "pay" ? (
          <span>
            I agree to the{" "}
            <a href="/terms" target="_blank" rel="noopener" className={link}>Terms &amp; Conditions</a>,{" "}
            <a href="/refund-policy" target="_blank" rel="noopener" className={link}>Refund Policy</a> and{" "}
            <a href="/privacy" target="_blank" rel="noopener" className={link}>Privacy Policy</a>.
          </span>
        ) : (
          <span>
            I agree to the <a href="/privacy" target="_blank" rel="noopener" className={link}>Privacy Policy</a> and
            to be contacted by email and WhatsApp about this course.
          </span>
        )}
      </label>
      {child && (
        <label htmlFor={`${idPrefix}-guardian`} className="flex items-start gap-2.5 cursor-pointer leading-snug">
          <input
            id={`${idPrefix}-guardian`}
            type="checkbox"
            checked={guardian}
            onChange={(e) => onGuardian(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
          />
          <span>I am the child's parent or guardian, and I give consent for my child to join and for their details to be used for these classes.</span>
        </label>
      )}
    </div>
  );
}

/** True when every box needed for this course is ticked. */
export const consentReady = (slug: string, agree: boolean, guardian: boolean) =>
  agree && (!isChildCourse(slug) || guardian);
