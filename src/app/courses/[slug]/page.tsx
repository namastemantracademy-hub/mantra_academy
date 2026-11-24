import { notFound } from "next/navigation";
import { SacredCoursePage } from "@/components/course/sacred-course-page";
import { getCourseBySlug } from "@/services/courseService";
import { cormorant, inter, tiro } from "./fonts";
import type { Metadata } from "next";
import { getCourseExperience, isHiddenCourse } from "@/lib/course-experience";
import { getPersonalPricing } from "@/services/settingsService";

// Ensure course detail is always rendered dynamically (fresh data)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = getCourseExperience(slug);
  const title = x.seo?.title || `${x.displayTitle || "Course"} | Mantra Academy`;
  const description = x.seo?.description || x.subtitle || "Learn the Vedic way — live, guided and personal — at Mantra Academy.";
  const shareTitle = x.share?.title || title;
  const shareText = x.share?.text || description;
  const images = x.share
    ? [{ url: `/images/share/${slug}.jpg?v=2`, width: 1200, height: 630, alt: x.displayTitle || "Mantra Academy course" }]
    : x.heroImage ? [x.heroImage] : undefined;
  return {
    metadataBase: new URL("https://www.mantracademy.in"),
    title,
    description,
    openGraph: { title: shareTitle, description: shareText, url: `/courses/${slug}`, siteName: "Mantra Academy", type: "website", images },
    twitter: { card: "summary_large_image", title: shareTitle, description: shareText, images },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isHiddenCourse(slug)) notFound();
  const courseDoc = await getCourseBySlug(slug);

  if (!courseDoc) {
    notFound();
  }

  // Serialize Mongoose document to plain JSON before passing to client component
  const course = JSON.parse(JSON.stringify(courseDoc));
  const personalPricing = await getPersonalPricing();

  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredCoursePage course={course} personalPricing={personalPricing} />
    </div>
  );
}
