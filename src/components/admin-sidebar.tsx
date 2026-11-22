"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, BookOpen, LogOut, FileText, Megaphone, Users, MessageSquare, BellRing, IndianRupee, Menu, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const groups: { title: string; links: { href: string; label: string; icon: React.ElementType }[] }[] = [
  { title: "", links: [{ href: "/admin/dashboard", label: "Today", icon: Home }] },
  {
    title: "Students",
    links: [
      { href: "/admin/payments", label: "Students & payments", icon: IndianRupee },
      { href: "/admin/waitlist", label: "Waitlist", icon: BellRing },
    ],
  },
  {
    title: "Website",
    links: [
      { href: "/admin/courses", label: "Courses & batches", icon: BookOpen },
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { href: "/admin/blog", label: "Wisdom articles", icon: FileText },
      { href: "/admin/testimonies", label: "Student reviews", icon: MessageSquare },
      { href: "/admin/instructors", label: "Teachers", icon: Users },
    ],
  },
];

function useSignOut() {
  const router = useRouter();
  return async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      router.push("/");
    }
  };
}

function Brand() {
  return (
    <div className="adm-brand">
      <span className="adm-om" aria-hidden>ॐ</span>
      <div><b>Mantra Academy</b><small>Admin</small></div>
    </div>
  );
}

function NavList({ onPick }: { onPick?: () => void }) {
  const pathname = usePathname();
  const signOut = useSignOut();
  return (
    <div className="adm-nav">
      <nav aria-label="Admin">
        {groups.map((g) => (
          <div key={g.title || "top"} className="adm-group">
            {g.title && <div className="adm-gt">{g.title}</div>}
            {g.links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={onPick}
                className={cn("adm-link", pathname.startsWith(href) && "on")}
                aria-current={pathname.startsWith(href) ? "page" : undefined}>
                <Icon className="h-[18px] w-[18px]" aria-hidden />{label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="adm-nav-foot">
        <a className="adm-link" href="/" target="_blank" rel="noopener noreferrer"><ExternalLink className="h-[18px] w-[18px]" aria-hidden />View website</a>
        <button type="button" className="adm-link out" onClick={signOut}><LogOut className="h-[18px] w-[18px]" aria-hidden />Sign out</button>
      </div>
    </div>
  );
}

/** Desktop: fixed left sidebar. */
export function AdminSidebar() {
  return (
    <aside className="adm-side hidden md:flex">
      <Brand />
      <NavList />
    </aside>
  );
}

/** Phone: top bar with a menu. */
export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = groups.flatMap((g) => g.links).find((l) => pathname.startsWith(l.href));
  return (
    <div className="adm-top md:hidden">
      <Brand />
      <span className="adm-top-title">{current?.label}</span>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button type="button" className="adm-burger" aria-label="Open admin menu"><Menu className="h-6 w-6" /></button>
        </SheetTrigger>
        <SheetContent side="left" className="adm-sheet w-[82vw] max-w-xs p-0">
          <SheetTitle className="sr-only">Admin menu</SheetTitle>
          <Brand />
          <NavList onPick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
