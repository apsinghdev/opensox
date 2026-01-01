import { getProgramBySlug, loadAllPrograms } from "@/data/oss-programs";
import { notFound } from "next/navigation";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  ProgramHeader,
  ProgramMetadata,
  ProgramSection,
} from "@/components/oss-programs";
import "./program-styles.css";

export const revalidate = 3600;

// Pre-configure marked options once, not on every render
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Sanitizer config - defined once to avoid recomputation
const SANITIZE_CONFIG = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "code",
    "pre",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "hr",
    "div",
    "span",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["class"],
    pre: ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

// Fast markdown renderer - memoized config
function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown) as string;
  return sanitizeHtml(html, SANITIZE_CONFIG);
}

export async function generateStaticParams() {
  // Load all programs for static generation
  const programs = await loadAllPrograms();
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Lazy load only the program we need
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  // Pre-render all markdown sections at build time (server-side)
  const sectionsWithHtml = program.sections.map((section) => ({
    ...section,
    contentHtml: renderMarkdown(section.bodyMarkdown),
  }));

  return (
    <main className="min-h-screen w-full bg-dash-base text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        <ProgramHeader program={program} />
        <ProgramMetadata program={program} />

        <div className="space-y-10">
          {sectionsWithHtml.map((section) => (
            <ProgramSection
              key={section.id}
              id={section.id}
              title={section.title}
              contentHtml={section.contentHtml}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
