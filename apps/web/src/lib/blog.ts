import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

type ImageSize = { width: number; height: number };

function readWebpSize(buffer: Buffer): ImageSize | null {
  if (buffer.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buffer.toString("ascii", 8, 12) !== "WEBP") return null;

  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: 1 + (bits & 0x3fff),
      height: 1 + ((bits >> 14) & 0x3fff),
    };
  }
  return null;
}

function readPngSize(buffer: Buffer): ImageSize | null {
  if (buffer.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const imageSizeCache = new Map<string, ImageSize | null>();

function getLocalImageSize(src: string): ImageSize | null {
  if (imageSizeCache.has(src)) return imageSizeCache.get(src) ?? null;

  let size: ImageSize | null = null;
  const filePath = path.join(PUBLIC_DIR, path.normalize(src));
  if (filePath.startsWith(PUBLIC_DIR) && fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length >= 30) {
      size = readWebpSize(buffer) ?? readPngSize(buffer);
    }
  }

  imageSizeCache.set(src, size);
  return size;
}

// width/height let the browser reserve space before the image loads, and
// post images sit below the heading, so they can load lazily
function withImageLoadingHints(html: string): string {
  return html.replace(/<img\b([^>]*?)\s*\/?>/gi, (_full, attrs: string) => {
    let next = attrs.trim();
    const src = next.match(/\bsrc="([^"]*)"/i)?.[1];

    const hasSize = /\bwidth\s*=/i.test(next) && /\bheight\s*=/i.test(next);
    if (src?.startsWith("/") && !hasSize) {
      const size = getLocalImageSize(src);
      if (size) next += ` width="${size.width}" height="${size.height}"`;
    }
    if (!/\bloading\s*=/i.test(next)) next += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(next)) next += ' decoding="async"';

    return `<img ${next} />`;
  });
}

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

export type BlogTag = "open-source" | "build-in-public" | "indie-hacking";

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  author: string;
  tag: BlogTag;
  tweetUrl?: string;
  draft?: boolean;
  pinned?: boolean;
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
        pinned: data.pinned === true,
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
      img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
      span: ["class"],
    },
    allowedClasses: {
      span: ["blog-highlight"],
    },
  });
  const html = withImageLoadingHints(withExternalLinkTargets(safeHtml));

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
