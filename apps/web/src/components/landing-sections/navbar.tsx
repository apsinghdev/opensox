"use client";
import React, { useState } from "react";
import PrimaryButton from "../ui/custom-button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Terminal, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const isPricingPage = pathname === "/pricing";
  const [showNavbar, setShowNavbar] = useState(isPricingPage ? true : false);
  const [isOpen, setIsOpen] = useState(false);

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
        " z-40  flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3  bg-neutral-900/5 backdrop-blur-xl  border-white/10",
        isPricingPage
          ? "relative h-max md:w-full top-0 border-b"
          : "fixed rounded-3xl top-4 border w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="text-lg sm:text-xl lg:text-2xl sm:rounded-3xl font-medium tracking-tighter flex items-center gap-2 min-w-0">
          <div className="w-7 sm:w-8 lg:w-10 aspect-square overflow-hidden relative shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="background"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <span className="truncate">Opensox AI</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-3 xl:gap-5 tracking-tight text-base xl:text-lg font-light text-text-tertiary">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "cursor-pointer hover:text-white whitespace-nowrap transition-colors",
                isActive && "text-white"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="https://github.com/apsinghdev/opensox"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:flex items-center gap-2 px-3 py-2 bg-[#0d1117] hover:bg-[#161b22] transition-colors rounded-lg border border-[#30363d] text-white"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">Contribute</span>
        </Link>
        <Link href="/dashboard/home" className="cursor-pointer z-30">
          <PrimaryButton classname=" whitespace-nowrap px-2.5 py-2 text-xs sm:text-sm lg:text-base sm:px-4 lg:px-5 sm:py-2.5 lg:py-3">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span>Get Started</span>
          </PrimaryButton>
        </Link>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute top-full mt-2 left-0 w-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 lg:hidden flex flex-col items-center py-5 space-y-4 z-50 rounded-3xl"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-base sm:text-lg"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://github.com/apsinghdev/opensox"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] hover:bg-[#161b22] rounded-lg border border-[#30363d] text-white transition-colors"
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
