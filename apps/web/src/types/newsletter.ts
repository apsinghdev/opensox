import { StaticImageData } from "next/image";

export type NewsletterContentItem =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: string;
    }
  | {
      type: "bold";
      content: string;
    }
  | {
      type: "link";
      text: string;
      url: string;
    }
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "list";
      items: string[];
      align?: "left" | "right";
    }
  | {
      type: "code";
      language?: string;
      content: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export interface Newsletter {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: StaticImageData | string;
  author?: string;
  readTime?: string;
  content: NewsletterContentItem[];
}

