import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { createAuthenticatedClient } from "@/lib/trpc-server";

// Cache newsletters in memory for faster subsequent loads
let cachedNewsletters: any[] | null = null;
let lastCacheTime = 0;
// cache longer in production since newsletter content changes infrequently
const CACHE_DURATION =
  process.env.NODE_ENV === "production"
    ? 3600000 // 1 hour in production
    : 60000; // 1 minute in dev

export async function GET() {
  // Authenticate user
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized - Please sign in" },
      { status: 401 }
    );
  }

  // Verify paid subscription
  try {
    const trpc = createAuthenticatedClient(session);
    const subscriptionStatus = await (
      trpc.user as any
    ).subscriptionStatus.query();

    if (!subscriptionStatus.isPaidUser) {
      return NextResponse.json(
        { error: "Forbidden - Premium subscription required" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { error: "Failed to verify subscription status" },
      { status: 500 }
    );
  }

  const now = Date.now();

  // Return cached data if available and fresh
  if (cachedNewsletters && now - lastCacheTime < CACHE_DURATION) {
    return NextResponse.json(cachedNewsletters);
  }

  // read from premium directory for paid users
  const newslettersDir = path.join(
    process.cwd(),
    "src/content/newsletters-premium"
  );

  try {
    if (!fs.existsSync(newslettersDir)) {
      fs.mkdirSync(newslettersDir, { recursive: true });
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(newslettersDir);

    const newsletters = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(newslettersDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          id: file.replace(".md", ""),
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          readTime: data.readTime || "5 min read",
          description: data.description || data.excerpt || "",
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Update cache
    cachedNewsletters = newsletters;
    lastCacheTime = now;

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Error reading newsletters:", error);
    return NextResponse.json(
      { error: "Failed to read newsletters" },
      { status: 500 }
    );
  }
}
