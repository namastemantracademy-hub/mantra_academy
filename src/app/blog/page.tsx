import type { Metadata } from "next";
import { getAllPosts } from "@/services/blogService";
import { getLatestVideos, YT_CHANNEL_URL } from "@/lib/youtube";
import { SacredWisdom } from "@/components/home/sacred-wisdom";
import { cormorant, inter, tiro } from "../courses/[slug]/fonts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wisdom — Free Videos & Articles | Mantra Academy",
  description: "Free teachings on Vedic chanting, svaras, Śrī Rudram, pūjā and Sanskrit — videos and articles from the āchāryas of Mantra Academy.",
};

export default async function WisdomPage() {
  const [postsRaw, videos] = await Promise.all([getAllPosts().catch(() => []), getLatestVideos(13)]);
  const posts = JSON.parse(JSON.stringify(postsRaw || []));
  return (
    <div className={`${cormorant.variable} ${inter.variable} ${tiro.variable}`}>
      <SacredWisdom videos={videos} posts={posts} channelUrl={YT_CHANNEL_URL} />
    </div>
  );
}
