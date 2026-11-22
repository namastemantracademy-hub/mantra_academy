import { notFound } from "next/navigation";
import { SacredCoursePage } from "@/components/course/sacred-course-page";
import { getCourseBySlug } from "@/services/courseService";
import { cormorant, inter, tiro } from "./fonts";

// Ensure course detail is always rendered dynamically (fresh data)
export const dynamic = "force-dynamic";

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
