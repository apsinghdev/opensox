export function getYoutubeEmbedUrl(inputUrl: string): string | null {
  try {
    const url = new URL(inputUrl);

    // already an embed url
    if (url.hostname.includes("youtube.com") && url.pathname.startsWith("/embed/")) {
      return url.toString();
    }

    let videoId: string | null = null;

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v");
    }

    // https://youtu.be/VIDEO_ID
    if (!videoId && url.hostname === "youtu.be") {
      const candidate = url.pathname.split("/").filter(Boolean)[0];
      videoId = candidate ?? null;
    }

    if (!videoId) return null;

    const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
    embed.searchParams.set("rel", "0");
    embed.searchParams.set("modestbranding", "1");
    embed.searchParams.set("playsinline", "1");

    return embed.toString();
  } catch {
    return null;
  }
}


