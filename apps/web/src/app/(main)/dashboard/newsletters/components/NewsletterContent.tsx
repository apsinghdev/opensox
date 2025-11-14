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
              <div key={index} className="my-8">
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  className="w-full rounded-lg"
                />
              </div>
            );

          case "list":
            const isRightAligned = item.align === "left";
            return (
              <div
                key={index}
                className={`my-4 ${
                  isRightAligned ? "flex justify-end" : ""
                }`}
              >
                <ul
                  className={`space-y-2 ${
                    isRightAligned
                      ? "list-none text-right"
                      : "list-disc list-inside"
                  }`}
                >
                  {item.items.map((listItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`text-foreground/90 ${
                        isRightAligned
                          ? "flex items-center justify-end gap-2"
                          : ""
                      }`}
                    >
                      <span>{listItem}</span>
                      {isRightAligned && (
                        <span className="text-foreground/60 flex-shrink-0">
                          •
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

