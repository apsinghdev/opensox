"use client";

import { useState, useMemo } from "react";
import BlogHeader from "@/components/blogs/BlogHeader";
import { blogs, BlogTag } from "@/data/blogs";
import Link from "next/link";
import CTA from "@/components/landing-sections/CTA";
import Footer from "@/components/landing-sections/footer";
import Testimonials from "@/components/landing-sections/testimonials";
import { FaqSection } from "@/components/faq/FaqSection";
import Brands from "@/components/landing-sections/Brands";

const filterTags: BlogTag[] = [
  "all",
  "engineering",
  "startup",
  "distribution",
  "misc",
];

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<BlogTag>("all");
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    if (selectedTag !== "all") {
      result = result.filter((blog) => blog.tag === selectedTag);
    }

    if (search.trim() !== "") {
      result = result.filter((blog) =>
        blog.linkText.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result.sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(2000 + year, month - 1, day);
      };
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });
  }, [selectedTag, search]);

  return (
    <main className="min-h-screen w-full bg-[#101010] text-white">
      <BlogHeader />

    
      <div
        className="w-full border-b border-[#252525] py-10 relative"
        style={
          {
            "--pattern-fg": "#252525",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            backgroundAttachment: "fixed",
          } as React.CSSProperties
        }
      >
     
        <div
          className="w-[30px] lg:w-[50px] absolute left-0 top-0"
          style={{
            height: "100%",
            borderRight: "1px solid #252525",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />

       
        <div
          className="w-[30px] lg:w-[50px] absolute right-0 top-0"
          style={{
            height: "100%",
            borderLeft: "1px solid #252525",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />

        
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          
          <div className="w-full mb-8">
            <input
              type="text"
              placeholder="Search topics, contents or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#252525] rounded-xl text-white outline-none placeholder-gray-500"
            />
          </div>

         
          <div className="flex gap-4 mb-6  flex-wrap">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-xl transition-colors ${
                  selectedTag === tag
                    ? "bg-[#4a04b3] text-white"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

     
      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <p className="text-gray-400 text-xl text-center">
                No blog posts found, More blogs coming soon stay tuned.
              </p>
            </div>
          ) : (
            filteredBlogs.map((blog, index) => (
              <Link
                key={index}
                href={blog.link}
                target="_blank"
                className="border border-[#252525] rounded-xl p-6 bg-[#0f0f0f] hover:bg-[#151515] transition-colors block"
              >
                <h3 className="text-xl font-semibold mb-2">{blog.linkText}</h3>

                <p className="text-gray-400 text-sm mb-3">
                  {blog.tag} • {blog.date}
                </p>

                {blog.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                    {blog.description}
                  </p>
                )}

                <span className="text-[#9455f4] hover:text-white  text-sm">
                  Read more
                </span>
              </Link>
            ))
          )}
        </div>
      </div>

      
      <div className="max-w-[2000px] w-full mx-auto">
        <FaqSection />
        <Brands />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
