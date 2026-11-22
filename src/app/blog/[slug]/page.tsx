import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services/blogService";
import { SacredArticle } from "@/components/home/sacred-article";
import { cormorant, inter, tiro } from "../../courses/[slug]/fonts";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: any = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | Mantra Academy" };
  return { title: `${post.title} | Mantra Academy`, description: post.excerpt || undefined };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const postDoc = await getPostBySlug(slug);
  if (!postDoc) notFound();
  const post = JSON.parse(JSON.stringify(postDoc));
  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredArticle post={post} />
    </div>
  );
}
