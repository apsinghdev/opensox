
"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Button only renders when isVisible is true */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "w-12 h-12 rounded-xl",
            "bg-[#1e1e1e] border-2 border-[#252525]",
            "hover:border-brand-purple hover:bg-[#252525]",
            "shadow-lg hover:shadow-xl hover:shadow-brand-purple/20",
            "transition-all duration-300 ease-in-out",
            "animate-in fade-in slide-in-from-bottom-4",
            "cursor-pointer",
            "active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-[#101010]"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp 
            className="w-6 h-6 text-brand-purple mx-auto transition-transform group-hover:translate-y-[-2px]" 
          />
        </button>
      )}
    </>
  );
}