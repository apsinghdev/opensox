import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function hardenExternalLinkRel(attrs: string): string {
  if (!/\brel\s*=/i.test(attrs)) {
    return `${attrs} rel="noopener noreferrer"`;
  }

  return attrs.replace(/\brel="([^"]*)"/i, (_match, rel: string) => {
    const tokens = new Set(
      rel
        .trim()
        .split(/\s+/)
        .filter((token: string) => token.length > 0)
    );
    tokens.add("noopener");
    tokens.add("noreferrer");
    return `rel="${[...tokens].join(" ")}"`;
  });
}

function withExternalLinkTargets(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (full, attrs) => {
    const href = attrs.match(/\bhref="([^"]*)"/i)?.[1];
    if (!href) return full;

    let next = hardenExternalLinkRel(attrs.trim());
    if (!/\btarget\s*=/i.test(next)) {
      next += ' target="_blank"';
    }
    return `<a ${next}>`;
  });
}

export type BlogTag = "open-source" | "build-in-public" | "learning";

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  author: string;
  tag: BlogTag;
  tweetUrl?: string;
  draft?: boolean;
}

export interface BlogMeta extends BlogFrontmatter {
  slug: string;
}

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        author: data.author,
        tag: data.tag,
        tweetUrl: data.tweetUrl,
        draft: data.draft,
      } as BlogMeta;
    })
    .filter((post) => !post.draft);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): { frontmatter: BlogFrontmatter; html: string } | null {
  const sanitized = path.basename(slug);
  const filePath = path.join(BLOG_DIR, `${sanitized}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (data.draft) return null;
  const rawHtml = marked.parse(content) as string;
  const safeHtml = sanitizeHtml(rawHtml, {
    allowedTags: (sanitizeHtml as any).defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...(sanitizeHtml as any).defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
  });
  const html = withExternalLinkTargets(safeHtml);

  return {
    frontmatter: data as BlogFrontmatter,
    html,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const { data } = matter(raw);
      return !data.draft;
    })
    .map((f) => f.replace(/\.mdx$/, ""));
}
