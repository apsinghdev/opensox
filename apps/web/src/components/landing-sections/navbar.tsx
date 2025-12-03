"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Github, Menu, Terminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import PrimaryButton from "../ui/custom-button";

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
    { name: "working", href: "/#HIW" },
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
          : "fixed rounded-3xl top-4 border w-[96%] md:w-[80%] mx-auto left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-3 w-full justify-between">
        {/* opensox logo */}
        <div className="flex items-center gap-1 lg:gap-3">
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="text-base lg:text-2xl  font-medium tracking-tighter flex items-center gap-2">
            <div className="w-8 md:w-10 aspect-square overflow-hidden relative">
              <Image
                src="/assets/logo.svg"
                alt="background"
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-nowrap">Opensox AI</span>
          </div>
        </div>
        {/* links to be rendered */}
        <div className="hidden md:flex items-center gap-5 tracking-tight text-sm lg:text-base xl:text-lg font-light text-text-tertiary">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "cursor-pointer hover:text-white text-sm lg:text-base",
                  isActive && "text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* git link */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/apsinghdev/opensox"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] hover:bg-[#161b22] transition-colors rounded-lg border border-[#30363d] text-white"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">Contribute</span>
          </Link>
          <Link
            href="/dashboard/home"
            className="flex md:hidden lg:flex cursor-pointer z-30"
          >
            <PrimaryButton classname=" px-3 py-2 text-sm whitespace-nowrap md:px-5 md:py-3 md:text-base">
              <Terminal className="w-4 h-4 md:w-5 md:h-5" />
              <span>Get Started</span>
            </PrimaryButton>
          </Link>
        </div>
        {/* mobile nav dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full mt-2 left-0 w-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 md:hidden flex flex-col items-center py-5 space-y-4 z-50 rounded-3xl"
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
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] hover:bg-[#161b22] rounded-lg border border-[#30363d] text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">Contribute</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
