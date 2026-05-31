"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../ui/custom-button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Terminal, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const isPricingPage = pathname === "/pricing";
  const [showNavbar, setShowNavbar] = useState(isPricingPage ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { trackButtonClick, trackLinkClick } = useAnalytics();

  const handleGetStartedClick = (location: "navbar" | "mobile_menu") => {
    trackButtonClick("Get Started", location);
  };

  const handleContributeClick = (location: "navbar" | "mobile_menu") => {
    trackLinkClick(
      "https://github.com/apsinghdev/opensox",
      "Contribute",
      location,
      true
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isPricingPage) {
      setShowNavbar(latest > 0);
    }
  });

  const links = [
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Features", href: "/#features" },
    { name: "Demo", href: "/#demo" },
    { name: "How it works", href: "/#HIW" },
    { name: "Stats", href: "/#Stats" },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: showNavbar ? 1 : 0,
        pointerEvents: showNavbar ? "auto" : "none"
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "z-40 flex items-center justify-between px-4 py-3 bg-neutral-900/5 backdrop-blur-xl border-white/10",
        isPricingPage
          ? "relative h-max w-full top-0 border-b"
          : "fixed rounded-3xl top-4 border w-[calc(100%-2rem)] lg:w-[90%] xl:w-[85%] 2xl:w-[80%] max-w-[1600px] mx-auto left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-2 lg:gap-3">
        <button
          className="lg:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/" className="text-lg lg:text-xl xl:text-2xl font-medium tracking-tighter flex items-center gap-2">
          <div className="w-8 lg:w-9 xl:w-10 aspect-square overflow-hidden relative flex-shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="Opensox AI logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="whitespace-nowrap">Opensox AI</span>
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 tracking-tight text-sm xl:text-base 2xl:text-lg font-light xl:font-normal text-text-tertiary">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "cursor-pointer hover:text-white transition-colors whitespace-nowrap",
                isActive && "text-white"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <Link
          href="https://github.com/apsinghdev/opensox"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContributeClick("navbar")}
          className="hidden lg:flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 bg-github-bg hover:bg-github-hover transition-colors rounded-lg border border-github-border text-white"
        >
          <Github className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0" />
          <span className="text-xs xl:text-sm font-medium whitespace-nowrap">Contribute</span>
        </Link>
        <Link
          href="/dashboard/home"
          className="cursor-pointer z-30"
          onClick={() => handleGetStartedClick("navbar")}
        >
          <PrimaryButton classname="px-3 py-2 text-xs lg:text-sm xl:text-base whitespace-nowrap lg:px-4 xl:px-5 lg:py-2.5 xl:py-3">
            <Terminal className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0" />
            <span>Get Started</span>
          </PrimaryButton>
        </Link>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute top-full mt-2 left-0 w-full max-h-[80vh] overflow-y-auto bg-neutral-900/95 backdrop-blur-xl border border-white/10 lg:hidden flex flex-col items-center py-5 space-y-4 z-50 rounded-3xl shadow-xl"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-base transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://github.com/apsinghdev/opensox"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsOpen(false);
              handleContributeClick("mobile_menu");
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-github-bg hover:bg-github-hover rounded-lg border border-github-border text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">Contribute</span>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;