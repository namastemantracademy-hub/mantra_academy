// Latest videos from the Mantra Academy YouTube channel, via YouTube's public RSS feed
// (no API key). Cached for 1 hour, so new uploads appear on the site automatically.

export const YT_CHANNEL_ID = "UCFKLrCxqq-4QL_GrVlY46wQ";
export const YT_CHANNEL_URL = "https://www.youtube.com/@MantrAcademy24";

export type Video = { id: string; title: string; published: string };

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** Remove hashtags and "(my pick)"-style notes from a title. */
function cleanTitle(t: string) {
  return decode(t)
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/\(\s*my pick\s*\)/gi, "")
    .replace(/\s*\|\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function getLatestVideos(limit = 12): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const videos: Video[] = [];
    for (const e of entries) {
      const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = cleanTitle(e.match(/<title>([^<]*)<\/title>/)?.[1] || "");
      const published = e.match(/<published>([^<]+)<\/published>/)?.[1] || "";
      // skip very short promo clips like "Register now"
      if (!id || title.split(/\s+/).length < 3) continue;
      videos.push({ id, title, published });
    }
    return videos.slice(0, limit);
  } catch {
    return [];
  }
}
