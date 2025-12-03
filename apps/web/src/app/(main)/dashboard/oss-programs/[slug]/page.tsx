import { getProgramBySlug, getAllPrograms } from "@/data/oss-programs";
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

export async function generateStaticParams() {
  const programs = getAllPrograms();
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
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const renderMarkdown = (markdown: string) => {
    const html = marked.parse(markdown) as string;
    return sanitizeHtml(html, {
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
    });
  };

  return (
    <main className="min-h-screen w-full bg-dash-base text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        <ProgramHeader program={program} />
        <ProgramMetadata program={program} />

        <div className="space-y-10">
          {program.sections.map((section) => (
            <ProgramSection
              key={section.id}
              id={section.id}
              title={section.title}
              contentHtml={renderMarkdown(section.bodyMarkdown)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
