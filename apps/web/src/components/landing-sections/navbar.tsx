"use client";
import React, { useState } from "react";
import PrimaryButton from "../ui/custom-button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Terminal, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";

const Navbar = () => {
    // Scroll to top of hero section
    const handleLogoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const isPinnedNav = pathname === "/pricing" || pathname === "/newsletter";
  const [showNavbar, setShowNavbar] = useState(isPinnedNav ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const { trackButtonClick } = useAnalytics();

  const handleGetStartedClick = (location: "navbar" | "mobile_menu") => {
    trackButtonClick("Get Started", location);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  React.useEffect(() => {
    setShowNavbar(isPinnedNav || scrollYProgress.get() > 0);
  }, [isPinnedNav, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isPinnedNav) {
      setShowNavbar(latest > 0);
    }
  });

  const links = [
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blogs", href: "/blog" },
    { name: "Newsletter", href: "/newsletter" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={showNavbar ? { opacity: 1 } : { opacity: 0, display: "none" }}
      transition={{ duration: 0.3 }}
      className={cn(
        " z-40  flex items-center justify-between px-4 py-3  bg-neutral-900/5 backdrop-blur-xl  border-white/10",
        isPinnedNav
          ? "relative h-max md:w-full top-0 border-b"
          : "fixed rounded-3xl top-4 border w-[94%] md:w-[80%] mx-auto left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          className="min-[1115px]:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div
          className="text-xl md:text-2xl font-medium tracking-tighter flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
          aria-label="Scroll to top"
          style={{ userSelect: 'none' }}
        >
          <div className="w-8 md:w-10 aspect-square overflow-hidden relative">
            <Image
              src="/assets/logo.svg"
              alt="background"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <span>Opensox AI</span>
        </div>
      </div>
      <div className="hidden min-[1115px]:flex items-center gap-5 max-[1270px]:gap-4 max-[1173px]:gap-3 tracking-tight text-lg max-[1270px]:text-base max-[1173px]:text-sm font-light max-[1173px]:font-normal text-[#d1d1d1]">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "cursor-pointer hover:text-white",
                isActive && "text-white"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/home"
          className="cursor-pointer z-30"
          onClick={() => handleGetStartedClick("navbar")}
        >
          <PrimaryButton classname="px-3 py-2 text-sm whitespace-nowrap md:px-5 md:py-3 md:text-base">
            <Terminal className="w-4 h-4 md:w-5 md:h-5" />
            <span>Get Started</span>
          </PrimaryButton>
        </Link>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute top-full mt-2 left-0 w-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 min-[1115px]:hidden flex flex-col items-center py-5 space-y-4 z-50 rounded-3xl"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-lg"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
