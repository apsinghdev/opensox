import Link from "next/link";
import { ChevronLeft, Globe } from "lucide-react";
import { Program } from "@/data/oss-programs/types";

interface ProgramHeaderProps {
  program: Program;
}

export default function ProgramHeader({ program }: ProgramHeaderProps) {
  return (
    <>
      <Link
        href="/dashboard/oss-programs"
        className="inline-flex items-center text-sm text-gray-400 hover:text-[#9455f4] transition-colors group mb-10"
      >
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Programs</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 break-words">
          {program.name}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-5 leading-relaxed font-light max-w-2xl">
          {program.tagline}
        </p>

        {program.websiteUrl && (
          <a
            href={program.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <Globe className="w-4 h-4 flex-shrink-0 group-hover:text-[#9455f4] transition-colors" />
            <span className="border-b border-gray-700 group-hover:border-[#9455f4] transition-colors truncate">
              Visit Website
            </span>
          </a>
        )}
      </div>
    </>
  );
}
