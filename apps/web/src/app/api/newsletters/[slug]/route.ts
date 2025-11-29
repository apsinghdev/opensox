import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { createAuthenticatedClient } from "@/lib/trpc-server";

// Configure marked for rich markdown support
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown: tables, task lists, etc.
  breaks: true, // Line breaks
});

// Cache individual newsletters
const newsletterCache = new Map<string, { data: any; time: number }>();
// cache longer in production since newsletter content changes infrequently
const CACHE_DURATION = process.env.NODE_ENV === "production" ? 3600000 : 60000;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
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

  const { slug } = await params;
  const now = Date.now();
  const cached = newsletterCache.get(slug);

  if (cached && now - cached.time < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  // read from premium directory for paid users
  const newslettersDir = path.join(
    process.cwd(),
    "src/content/newsletters-premium"
  );
  const filePath = path.join(newslettersDir, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // Render markdown (supports headings, links, lists, code blocks, images, tables, etc.)
    const htmlContent = marked.parse(content);

    const result = {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      readTime: data.readTime || "5 min read",
      content: htmlContent,
    };

    newsletterCache.set(slug, { data: result, time: now });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error reading newsletter:", error);
    return NextResponse.json(
      { error: "Newsletter not found" },
      { status: 404 }
    );
  }
}
