import { Cormorant_Garamond, Inter, Tiro_Devanagari_Sanskrit } from "next/font/google";

// Self-hosted at build time, so they always load (no external font request, CSP-safe).
// latin-ext covers IAST diacritics (ā ī ū ṛ ṣ ṇ ṃ ḥ ś).
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const tiro = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});
