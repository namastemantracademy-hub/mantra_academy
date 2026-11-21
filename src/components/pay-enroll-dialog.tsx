"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { feeLabel, feeNote, formatRupees, normalizeFeeType } from "@/lib/fees";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckoutScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    const script = existing || document.createElement("script");
    script.addEventListener("load", () => resolve(true));
    script.addEventListener("error", () => resolve(false));
    if (!existing) {
      script.src = CHECKOUT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  title: string;
  price?: number;
  feeType?: string;
};

export function PayEnrollDialog({ open, onOpenChange, slug, title, price, feeType }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (name.trim().length < 2) return "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email";
    if (!/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())) return "Enter a valid phone number, with country code if outside India";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setBusy(true);

    try {
      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection and try again.");

      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: name.trim(), email: email.trim(), phone: phone.trim() }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order?.error || "Could not start the payment");

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Mantra Academy",
        description: `${order.courseTitle} (${normalizeFeeType(order.feeType) === "full" ? "workshop fee" : "registration + 1st month"})`.slice(0, 255),
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        notes: { course_slug: slug },
        theme: { color: "#8A3B0F" },
        handler: async (response: any) => {
          try {
            const v = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const data = await v.json().catch(() => ({}));
            if (!v.ok) throw new Error(data?.error || "Payment verification failed");
          } catch (err) {
            // The webhook will still record a genuine payment; the thank-you
            // page shows the latest status either way.
            console.error(err);
          }
          onOpenChange(false);
          router.push(`/enroll/thank-you?order=${encodeURIComponent(response.razorpay_order_id)}`);
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });
      rzp.on("payment.failed", (resp: any) => {
        setError(resp?.error?.description || "Payment failed. You can try again.");
        setBusy(false);
      });
      // Close our dialog first: its focus trap would otherwise block clicks
      // inside Razorpay's payment window. The form keeps its values if reopened.
      onOpenChange(false);
      rzp.open();
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Try again.");
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !busy && onOpenChange(o)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Enroll in {title}</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2">
              <p>
                <span className="text-lg font-semibold text-foreground">{formatRupees(price)}</span>
                {" · "}{feeLabel(feeType)}
              </p>
              <p className="text-sm">{feeNote(feeType)}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-name">Full name</Label>
            <Input id="enroll-name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="Ananya Sharma" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-email">Email</Label>
            <Input id="enroll-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="ananya@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enroll-phone">Phone (WhatsApp)</Label>
            <Input id="enroll-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} placeholder="+91 98765 43210" />
          </div>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <Button type="submit" size="lg" className="w-full text-lg" disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
            {busy ? "Opening secure payment…" : `Pay ${formatRupees(price)} and enroll`}
          </Button>
          <p className="text-xs text-center text-muted-foreground">Secure payment by Razorpay · UPI, cards, net banking</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
