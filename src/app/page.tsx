import type { Metadata } from "next";
import { getPublicCourses } from "../services/courseService";
import { getAnnouncements } from "../services/announcementService";
import { getTestimonies } from "../services/testimonyService";
import { SacredHome } from "@/components/home/sacred-home";
import { cormorant, inter, tiro } from "./courses/[slug]/fonts";

// Always fetch live data from the DB (no static cache)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mantra Academy — Vedic Chanting, Pūjā & Sanskrit, Taught Live",
  description: "Learn Vedic chanting, Śrī Rudram, Pūjā Vidhi and Sanskrit live from Gurukula-trained āchāryas. Correct pronunciation, meaning and personal guidance — for students in 12 countries.",
};

export default async function Home() {
  const [coursesRaw, announcementsRaw, testimoniesRaw] = await Promise.all([
    getPublicCourses(),
    getAnnouncements(),
    getTestimonies().catch(() => []),
  ]);
  // Plain JSON-safe objects for the client component
  const courses = JSON.parse(JSON.stringify(coursesRaw || []));
  const announcements = JSON.parse(JSON.stringify(announcementsRaw || []));
  const testimonies = JSON.parse(JSON.stringify(testimoniesRaw || []));

  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredHome courses={courses} announcements={announcements} testimonies={testimonies} />
    </div>
  );
}
