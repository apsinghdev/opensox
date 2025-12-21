"use client";
import React, { useState } from "react";
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
    { name: "Features", href: "/#features" },
    { name: "Demo", href: "/#demo" },
    { name: "How it works", href: "/#HIW" },
    { name: "Stats", href: "/#Stats" },
    { name: "Contact", href: "/#Contact" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={showNavbar ? { opacity: 1 } : { opacity: 0, display: "none" }}
      transition={{ duration: 0.3 }}
      className={cn(
        " z-40  flex items-center justify-between px-4 py-3  bg-neutral-900/5 backdrop-blur-xl  border-white/10",
        isPricingPage
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
        <div className="text-xl md:text-2xl font-medium tracking-tighter flex items-center gap-2">
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
          href="https://github.com/apsinghdev/opensox"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContributeClick("navbar")}
          className="hidden min-[1115px]:flex items-center gap-2 px-4 py-2.5 bg-github-bg hover:bg-github-hover transition-colors rounded-lg border border-github-border text-white"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">Contribute</span>
        </Link>
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
          <Link
            href="https://github.com/apsinghdev/opensox"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsOpen(false);
              handleContributeClick("mobile_menu");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-github-bg hover:bg-github-hover rounded-lg border border-github-border text-white transition-colors"
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
