import { notFound } from "next/navigation";
import { SacredCoursePage } from "@/components/course/sacred-course-page";
import { getCourseBySlug } from "@/services/courseService";
import { cormorant, inter, tiro } from "./fonts";
import type { Metadata } from "next";
import { getCourseExperience } from "@/lib/course-experience";

// Ensure course detail is always rendered dynamically (fresh data)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = getCourseExperience(slug);
  const title = x.seo?.title || `${x.displayTitle || "Course"} | Mantra Academy`;
  const description = x.seo?.description || x.subtitle || "Learn the Vedic way — live, guided and personal — at Mantra Academy.";
  return { title, description, openGraph: { title, description, images: x.heroImage ? [x.heroImage] : undefined } };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const courseDoc = await getCourseBySlug(slug);

  if (!courseDoc) {
    notFound();
  }

  // Serialize Mongoose document to plain JSON before passing to client component
  const course = JSON.parse(JSON.stringify(courseDoc));

  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredCoursePage course={course} />
    </div>
  );
}
