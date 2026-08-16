import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import BlogList from "./blog-list";

export const metadata: Metadata = {
  title: "Opensox Blog",
  description:
    "How to get started with open source, how to contribute, and notes on building in public.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogList posts={posts} />;
}
