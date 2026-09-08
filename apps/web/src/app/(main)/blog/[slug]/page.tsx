import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import BlogThemeSelector from "../blog-theme";
import BlogSocials from "../blog-socials";
import BlogBadge from "../blog-badge";

const SITE_URL = "https://opensox.ai";
const BLOG_OG_IMAGE = {
  url: "/images/open-source-blogs.png",
  width: 1200,
  height: 630,
  alt: "Open Source Blogs by Opensox",
} as const;

const SEO_POSTS: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "quality-contributions-in-open-source": {
    title:
      "Quality Contributions in Open Source | Beyond Counting PRs",
    description:
      "Stop measuring open source impact by PR count. Learn how using a project yourself leads to meaningful contributions, better context, and more valuable issues than AI-generated pull requests.",
    keywords: [
      "quality open source contributions",
      "meaningful open source contributions",
      "open source beyond pull requests",
      "how to contribute to open source",
      "open source contribution quality",
      "PR count vs quality",
      "open source issues vs PRs",
      "using open source projects",
    ],
  },
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const seo = SEO_POSTS[slug];
  const title = seo?.title ?? `${post.frontmatter.title} - Opensox Blog`;
  const description = seo?.description ?? post.frontmatter.description;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title,
    description,
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    authors: [{ name: post.frontmatter.author }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Opensox",
      title,
      description,
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: [post.frontmatter.tag],
      images: [BLOG_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@opensox",
      creator: "@jackedAJ",
      title,
      description,
      images: [BLOG_OG_IMAGE.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className="blog-page min-h-screen">
      <article className="blog-post max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm blog-link transition-colors"
            >
              &larr; Blog
            </Link>
            <Link
              href="/dashboard/home"
              className="text-sm blog-link transition-colors"
            >
              Dashboard
            </Link>
          </div>
          <BlogThemeSelector />
        </div>

        <header className="mt-10 mb-10">
          <h1 className="blog-heading">{post.frontmatter.title}</h1>
          <div className="mt-5">
            <BlogBadge
              tweetUrl={post.frontmatter.tweetUrl}
              tag={post.frontmatter.tag}
            />
          </div>
          <div className="flex items-center gap-3 mt-4 text-sm blog-text-muted">
            <span>{post.frontmatter.author}</span>
            <span>&middot;</span>
            <time>{date}</time>
          </div>
        </header>

        <hr className="blog-border mb-10" />

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <header className="mt-12 pt-8 border-t blog-border">
          <p className="blog-text-secondary text-lg leading-relaxed">
            be the favorite hire in the uncertain job market by being scary good
            at open source, check{" "}
            <Link
              href="https://opensox.ai/pro"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-cta-link"
            >
              opensox
            </Link>
          </p>
        </header>

        <hr className="blog-border mt-8 mb-10" />

        <div>
          <BlogSocials />
        </div>
      </article>
    </main>
  );
}
