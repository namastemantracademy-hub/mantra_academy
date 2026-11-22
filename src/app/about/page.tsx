import type { Metadata } from "next";
import { SacredAbout } from "@/components/home/sacred-about";
import { cormorant, inter, tiro } from "../courses/[slug]/fonts";

export const metadata: Metadata = {
  title: "About Us — Mantra Academy",
  description: "Mantra Academy is an online home for the Gurukula spirit — the Vedas, mantras, pūjā and Sanskrit taught live by Dr. Karthik Sharma and Dr. Jyothi Sharma.",
};

export default function AboutPage() {
  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredAbout />
    </div>
  );
}
