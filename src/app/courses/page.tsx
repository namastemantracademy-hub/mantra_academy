import type { Metadata } from "next";
import { getAllCourses } from "../../services/courseService";
import { SacredCoursesList } from "@/components/course/sacred-courses-list";
import { cormorant, inter, tiro } from "./[slug]/fonts";

// Force dynamic rendering so courses list always reflects DB state
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses — Vedic Chanting, Pūjā & Sanskrit | Mantra Academy",
  description: "Live, guided courses in Vedic chanting, Śrī Rudram, Pūjā Vidhi and Sanskrit — taught in the Gurukula tradition with correct svara, meaning and personal correction.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();
  // Convert Mongoose documents to plain JSON-safe objects before passing to client components
  const coursesData = JSON.parse(JSON.stringify(courses || []));
  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredCoursesList courses={coursesData} />
    </div>
  );
}
