import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import BlogList from "./blog-list";

const SITE_URL = "https://opensox.ai";
const BLOG_OG_IMAGE = {
  url: "/images/open-source-blogs.png",
  width: 1200,
  height: 630,
  alt: "Open Source Blogs by Opensox",
} as const;

const BLOG_TITLE = "Opensox Blog";
const BLOG_DESCRIPTION =
  "How to get started with open source, how to contribute, and notes on building in public.";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Opensox",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [BLOG_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@opensox",
    creator: "@jackedAJ",
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [BLOG_OG_IMAGE.url],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogList posts={posts} />;
}
