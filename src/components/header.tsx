"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";

import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", sub: "Welcome" },
  { href: "/courses", label: "Courses", sub: "Live batches & waitlists" },
  { href: "/blog", label: "Wisdom", sub: "Free videos & articles" },
  { href: "/about", label: "About Us", sub: "Our story & āchāryas" },
];
const WHATSAPP = "https://wa.me/919108787550?text=" + encodeURIComponent("Namaste! I'd like to know more about the courses at Mantra Academy.");

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex-1 md:flex-none">
          <Link href="/" aria-label="Mantra Academy Home">
            <Logo className="[&>span]:text-2xl" />
          </Link>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-7" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn("text-[15px] font-medium tracking-wide transition-colors", isActive(pathname, l.href) ? "nav-on" : "opacity-75 hover:opacity-100")}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Phone */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" className="h-10 w-10 grid place-items-center rounded-full" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="ma-menu w-[86vw] max-w-sm p-0 border-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="ma-menu-in">
                <div className="ma-menu-logo"><Logo className="[&>span]:text-2xl" /></div>
                <nav className="ma-menu-links" aria-label="Main">
                  {navLinks.map((l) => (
                    <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                      className={isActive(pathname, l.href) ? "on" : ""} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                      <b>{l.label}</b><small>{l.sub}</small><span aria-hidden>›</span>
                    </Link>
                  ))}
                </nav>
                <div className="ma-menu-foot">
                  <Link className="ma-menu-cta" href="/courses" onClick={() => setOpen(false)}>Explore courses →</Link>
                  <a className="ma-menu-wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" aria-hidden /> Talk to us on WhatsApp
                  </a>
                  <p className="ma-menu-om">ॐ · Sacred sound, correctly learned</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
