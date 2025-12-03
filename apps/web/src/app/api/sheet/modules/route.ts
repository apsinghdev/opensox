import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { SheetModule } from "@/data/sheet/types";

// cache modules metadata in memory
let cachedModules: Omit<SheetModule, "docContent">[] | null = null;

const contentDir = path.join(process.cwd(), "src/data/sheet/content");

function loadModulesMetadata(): Omit<SheetModule, "docContent">[] {
  if (cachedModules) {
    return cachedModules;
  }

  try {
    if (!fs.existsSync(contentDir)) {
      console.warn(`content directory not found: ${contentDir}`);
      return [];
    }

    const files = fs.readdirSync(contentDir);
    const modules = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          id: data.id || file.replace(".md", ""),
          name: data.name || "Untitled",
          videoUrl: data.videoUrl || "",
          comingSoon: data.comingSoon ?? false,
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

export async function GET() {
  const modules = loadModulesMetadata();
  return NextResponse.json(modules, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
