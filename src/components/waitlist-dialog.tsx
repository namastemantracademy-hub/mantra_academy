"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConsentCheck, consentReady } from "@/components/consent-check";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; slug: string; title: string };

export function WaitlistDialog({ open, onOpenChange, slug, title }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [agree, setAgree] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<"" | "new" | "already">("");

  const validate = () => {
    if (name.trim().length < 2) return "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email";
    if (!/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())) return "Enter a valid phone number, with country code if outside India";
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), email: email.trim(), phone: phone.trim(), website, consent: agree, guardian }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not save. Please try again.");
      setDone(data?.already ? "already" : "new");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!busy) { onOpenChange(o); if (!o) setDone(""); } }}>
      <DialogContent className="sm:max-w-md max-h-[92vh] overflow-y-auto">
        {done ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" aria-hidden />
            <DialogTitle className="font-headline text-2xl text-primary">
              {done === "already" ? "You're already on the list" : "You're on the waitlist"}
            </DialogTitle>
            <DialogDescription>
              We'll write to you{done === "new" ? " (check your email now)" : ""} and message you on WhatsApp as soon as the next batch of {title} opens — before we announce it publicly.
            </DialogDescription>
            <Button className="mt-2" onClick={() => { onOpenChange(false); setDone(""); }}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">Join the waitlist</DialogTitle>
              <DialogDescription>
                The next batch of <b>{title}</b> isn't open yet. Leave your details and you'll be the first to know when it opens.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="wl-name">Full name</Label>
                <Input id="wl-name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="Ananya Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wl-email">Email</Label>
                <Input id="wl-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="ananya@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wl-phone">Phone (WhatsApp)</Label>
                <Input id="wl-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} placeholder="+91 98765 43210" />
              </div>
              <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <ConsentCheck idPrefix="wl" slug={slug} kind="contact" purpose="We use your details only to tell you when this course opens."
                agree={agree} onAgree={(v) => { setAgree(v); setError(""); }} guardian={guardian} onGuardian={(v) => { setGuardian(v); setError(""); }} />
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button type="submit" size="lg" className="w-full text-lg" disabled={busy || !consentReady(slug, agree, guardian)}>
                {busy ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <BellRing className="mr-2 h-4 w-4" />}
                {busy ? "Saving…" : "Notify me when it opens"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">No payment now</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
