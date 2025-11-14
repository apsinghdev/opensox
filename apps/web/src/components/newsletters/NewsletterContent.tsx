"use client";

import { NewsletterContentType } from "@/data/newsletters";
import Image from "next/image";
import { useMemo } from "react";

interface NewsletterContentProps {
  content: NewsletterContentType[];
}

export default function NewsletterContent({ content }: NewsletterContentProps) {
  // Group content into blocks (paragraphs, headings, images)
  const blocks = useMemo(() => {
    const result: Array<{
      type: "paragraph" | "heading" | "image";
      items: NewsletterContentType[];
      headingLevel?: number;
      headingContent?: string;
      imageSrc?: string;
      imageAlt?: string;
    }> = [];

    let currentParagraph: NewsletterContentType[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        result.push({ type: "paragraph", items: [...currentParagraph] });
        currentParagraph = [];
      }
    };

    content.forEach((item) => {
      if (item.type === "heading") {
        flushParagraph();
        result.push({
          type: "heading",
          items: [],
          headingLevel: item.level,
          headingContent: item.content,
        });
      } else if (item.type === "image") {
        flushParagraph();
        result.push({
          type: "image",
          items: [],
          imageSrc: item.src,
          imageAlt: item.alt,
        });
      } else if (item.type === "paragraph" && item.content === "") {
        // Empty paragraph - flush current and start new
        flushParagraph();
      } else {
        // Inline content (text, bold, link) or paragraph with content
        if (item.type === "paragraph") {
          flushParagraph();
          result.push({ type: "paragraph", items: [{ ...item }] });
        } else {
          currentParagraph.push(item);
        }
      }
    });

    flushParagraph();

    return result;
  }, [content]);

  const renderInlineContent = (items: NewsletterContentType[]) => {
    return items.map((item, index) => {
      switch (item.type) {
        case "text":
          return <span key={index}>{item.content}</span>;
        case "bold":
          return (
            <strong key={index} className="font-semibold text-[#ebebeb]">
              {item.content}
            </strong>
          );
        case "link":
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9455f4] hover:text-[#b577ff] underline underline-offset-2 decoration-[#9455f4]/50 hover:decoration-[#9455f4] transition-all duration-200"
            >
              {item.text}
            </a>
          );
        case "paragraph":
          return <span key={index}>{item.content}</span>;
        default:
          return null;
      }
    });
  };

  return (
    <div className="max-w-none">
      {blocks.map((block, blockIndex) => {
        if (block.type === "heading") {
          const HeadingTag = `h${block.headingLevel}` as keyof JSX.IntrinsicElements;
          const headingClasses: Record<1 | 2 | 3, string> = {
            1: "text-3xl md:text-4xl font-bold mb-8 mt-12 text-[#ebebeb] tracking-tight first:mt-0 leading-[1.2]",
            2: "text-2xl md:text-3xl font-semibold mb-6 mt-10 text-[#ebebeb] tracking-tight leading-[1.3]",
            3: "text-xl md:text-2xl font-semibold mb-4 mt-8 text-[#ebebeb] tracking-tight leading-[1.4]",
          };
          return (
            <HeadingTag
              key={blockIndex}
              className={headingClasses[block.headingLevel! as 1 | 2 | 3]}
            >
              {block.headingContent}
            </HeadingTag>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={blockIndex} className="my-12 -mx-2 md:-mx-4 lg:-mx-8 group">
              {/* Premium image container with Notion-like styling */}
              <div className="relative overflow-hidden rounded-lg border border-[#2e2e2e] bg-[#1f1f1f] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#6032D9]/30">
                {/* Mild pixel accent corners - subtle but present */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#6032D9]/20 z-10 group-hover:bg-[#6032D9]/30 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#6032D9]/20 z-10 group-hover:bg-[#6032D9]/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#6032D9]/20 z-10 group-hover:bg-[#6032D9]/30 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#6032D9]/20 z-10 group-hover:bg-[#6032D9]/30 transition-colors" />
                
                {/* Image with smooth loading */}
                <div className="relative w-full aspect-video bg-[#2a2a2a] overflow-hidden">
                  <Image
                    src={block.imageSrc!}
                    alt={block.imageAlt || ""}
                    width={1600}
                    height={900}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={blockIndex < 2}
                    quality={90}
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6032D9]/0 via-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
              
              {/* Caption - Notion-like style */}
              {block.imageAlt && (
                <figcaption className="mt-3 text-sm text-[#9b9a97] text-center italic leading-relaxed">
                  {block.imageAlt}
                </figcaption>
              )}
            </figure>
          );
        }

        // Paragraph - Notion-like style: clean typography, proper spacing
        return (
          <p key={blockIndex} className="mb-6 text-base md:text-[16px] text-[#ebebeb] leading-[1.7] font-normal">
            {renderInlineContent(block.items)}
          </p>
        );
      })}
    </div>
  );
}