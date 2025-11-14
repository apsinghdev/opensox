"use client";

import Link from "next/link";

export default function BlogHeader() {
  return (
    <header className="w-full border-b border-[#252525]/50 bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[2000px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/blogs"
          className="text-white hover:text-[#9455f4] transition-colors underline font-medium"
        >
          Opensox AI (Ajeet)
        </Link>
        <Link
          href="/"
          className="text-white hover:text-[#9455f4] transition-colors underline font-medium"
        >
          Home
        </Link>
      </div>
    </header>
  );
}

