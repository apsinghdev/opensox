import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { SheetModule } from "./types";

// configure marked for rich markdown support
marked.setOptions({
  gfm: true, // github flavored markdown: tables, task lists, etc.
  breaks: true, // line breaks
});

// cache modules in memory
let cachedModules: SheetModule[] | null = null;

const contentDir = path.join(process.cwd(), "src/data/sheet/content");

function loadModules(): SheetModule[] {
  if (cachedModules) {
    return cachedModules;
  }

  try {
    if (!fs.existsSync(contentDir)) {
      console.warn(`content directory not found: ${contentDir}`);
      return [];
    }

    const files = fs.readdirSync(contentDir);
    const modules: SheetModule[] = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // render markdown to html
        const htmlContent = marked.parse(content) as string;

        return {
          id: data.id || file.replace(".md", ""),
          name: data.name || "Untitled",
          videoUrl: data.videoUrl || "",
          comingSoon: data.comingSoon ?? false,
          docContent: htmlContent,
        };
      })
      .sort((a, b) => {
        // sort by module number extracted from id
        const aNum = parseInt(a.id.replace("module-", "")) || 0;
        const bNum = parseInt(b.id.replace("module-", "")) || 0;
        return aNum - bNum;
      });

    cachedModules = modules;
    return modules;
  } catch (error) {
    console.error("error loading sheet modules:", error);
    return [];
  }
}

// server-side only function - do not export sheetModules directly
// use getSheetModules() instead for server components
export function getSheetModules(): SheetModule[] {
  return loadModules();
}

export type { SheetModule };
