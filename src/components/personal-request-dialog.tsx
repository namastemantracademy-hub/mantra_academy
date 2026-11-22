"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConsentCheck, consentReady } from "@/components/consent-check";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; slug: string; title: string; priceLine: string };

export function PersonalRequestDialog({ open, onOpenChange, slug, title, priceLine }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [preferredTimes, setPreferredTimes] = useState("");
  const [note, setNote] = useState("");
  const [timezone, setTimezone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [agree, setAgree] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setTimezone(tz);
      if (/^Asia\/(Kolkata|Calcutta)$/.test(tz)) setCountry((c) => c || "India");
    } catch {}
  }, []);

  const validate = () => {
    if (name.trim().length < 2) return "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email";
    if (!/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())) return "Enter a valid WhatsApp number, with country code if outside India";
    if (preferredTimes.trim().length < 3) return "Tell us which days and times suit you";
    if (!consentReady(slug, agree, guardian)) return "Please tick the box to give your consent";
    return "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/personal-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), email: email.trim(), phone: phone.trim(), country: country.trim(), timezone, preferredTimes: preferredTimes.trim(), note: note.trim() || undefined, website, consent: agree, guardian }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send. Please try again.");
      setDone(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const clear = () => setError("");

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!busy) { onOpenChange(o); if (!o) setDone(false); } }}>
      <DialogContent className="sm:max-w-md max-h-[92vh] overflow-y-auto">
        {done ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" aria-hidden />
            <DialogTitle className="font-headline text-2xl text-primary">Request received</DialogTitle>
            <DialogDescription>
              We'll message you on WhatsApp within 24 hours to agree a time slot for your personal {title} classes. Once it's fixed, we'll send a secure payment link for the first month. A copy is in your email.
            </DialogDescription>
            <Button className="mt-2" onClick={() => { onOpenChange(false); setDone(false); }}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">Request your time slot</DialogTitle>
              <DialogDescription>
                Personal one-to-one classes for <b>{title}</b> · {priceLine}. No payment now — we confirm your slot first.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-3" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="pr-name">Full name</Label>
                <Input id="pr-name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); clear(); }} placeholder="Ananya Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-email">Email</Label>
                <Input id="pr-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); clear(); }} placeholder="ananya@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-phone">WhatsApp number</Label>
                <Input id="pr-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); clear(); }} placeholder="+1 415 555 0172" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-country">Country</Label>
                <Input id="pr-country" autoComplete="country-name" value={country} onChange={(e) => { setCountry(e.target.value); clear(); }} placeholder="United States" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-times">Days and times that suit you</Label>
                <Input id="pr-times" value={preferredTimes} onChange={(e) => { setPreferredTimes(e.target.value); clear(); }} placeholder="Weekday mornings, or Sat & Sun evenings" />
                {timezone && <p className="text-xs text-muted-foreground">Your time zone: {timezone}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-note">Anything we should know? (optional)</Label>
                <Textarea id="pr-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Your experience with chanting, goals, etc." />
              </div>
              <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <ConsentCheck idPrefix="pr" slug={slug} kind="contact" purpose="We use your details only to agree your class time and send your payment link."
                agree={agree} onAgree={(v) => { setAgree(v); clear(); }} guardian={guardian} onGuardian={(v) => { setGuardian(v); clear(); }} />
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button type="submit" size="lg" className="w-full text-lg" disabled={busy || !consentReady(slug, agree, guardian)}>
                {busy ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CalendarClock className="mr-2 h-4 w-4" />}
                {busy ? "Sending…" : "Request my time slot"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">We reply on WhatsApp within 24 hours</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
