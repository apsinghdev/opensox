"use client";

import { NewsletterContentItem } from "@/types/newsletter";
import Link from "next/link";
import Image from "next/image";

interface NewsletterContentProps {
  content: NewsletterContentItem[];
}

export default function NewsletterContent({ content }: NewsletterContentProps) {
  return (
    <div className="space-y-6 font-sans">
      {content.map((item, index) => {
        switch (item.type) {
          case "paragraph":
            return (
              <p key={index} className="text-foreground/90 leading-relaxed">
                {item.content}
              </p>
            );

          case "heading":
            const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
            const headingClasses = {
              1: "text-4xl font-bold mb-4 mt-8",
              2: "text-3xl font-bold mb-4 mt-8",
              3: "text-2xl font-semibold mb-3 mt-6",
            };
            return (
              <HeadingTag
                key={index}
                className={headingClasses[item.level]}
              >
                {item.content}
              </HeadingTag>
            );

          case "bold":
            return (
              <p key={index} className="font-semibold text-foreground mb-2">
                {item.content}
              </p>
            );

          case "link":
            return (
              <div key={index} className="my-4">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {item.text}
                </Link>
              </div>
            );

          case "image":
            return (
              <div key={index} className="my-8 relative w-full aspect-video">
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  fill
                  className="object-contain rounded-lg"
                  unoptimized={typeof item.src === "string" && item.src.startsWith("http")}
                />
              </div>
            );

          case "list":
            const isRightAligned = item.align === "left";
            
            if (isRightAligned) {
              return (
                <ul key={index} className="my-4 space-y-2 list-none text-right">
                  {item.items.map((listItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-foreground/90 flex items-center justify-end gap-2"
                    >
                      <span>{listItem}</span>
                      <span className="text-foreground/60">•</span>
                    </li>
                  ))}
                </ul>
              );
            }
            
            return (
              <ul key={index} className="my-4 space-y-2 list-disc list-inside">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="text-foreground/90">
                    {listItem}
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <pre
                key={index}
                className="my-4 p-4 bg-muted rounded-lg overflow-x-auto"
              >
                <code className="text-sm font-mono text-foreground">
                  {item.content}
                </code>
              </pre>
            );

          case "table":
            return (
              <div key={index} className="my-4 overflow-x-auto">
                <table className="min-w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      {item.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="border border-border px-4 py-2 text-left font-semibold text-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/50"}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-border px-4 py-2 text-foreground/90"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

