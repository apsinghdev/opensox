"use client";
import { ArrowRight, ArrowUpRight, Terminal } from "lucide-react";
import Image from "next/image";
import React from "react";
import PrimaryButtom from "../ui/custom-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";

const Hero = () => {
  const { trackButtonClick } = useAnalytics();
  const router = useRouter();
  // Container variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  // Child item variants - only transform and opacity
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleGetStartedClick = () => {
    trackButtonClick("Get Started", "hero");
    router.push("/dashboard/home");
  };

  const handleCheckProClick = () => {
    trackButtonClick("Check Pro", "hero");
    router.push("/pricing");
  };
  return (
    <div className="w-full min-h-[50dvh] lg:min-h-[75dvh] relative overflow-hidden z-10 p-4 lg:p-[60px] flex flex-col items-center justify-center gap-6 ">
      <Image
        src="/assets/bgmain.svg"
        alt="background"
        fill
        className="object-cover max-md:object-top w-full h-full absolute -z-10 opacity-90"
        priority
      />
      <motion.div
        variants={containerVariants}
        animate="visible"
        className="relative z-20 w-full max-w-4xl space-y-5 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-2 [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
        >
          <Link
            href="/pitch"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 backdrop-blur-sm border border hover:bg-black/60 transition-colors cursor-pointer"
          >
            <span className="text-text-secondary text-sm font-medium">
              Backed by
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-gradient-to-br from-[#FF6154] to-[#FF8C00] rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">U</span>
              </div>
              <span className="text-white text-sm font-medium">sers</span>
            </div>
          </Link>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(1.9rem,7.2vw,5.25rem)] font-medium tracking-tighter leading-[1.08] [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
        >
          <span className="block whitespace-nowrap">Rock Open Source.</span>
          <span className="block whitespace-nowrap">Building in Public.</span>
          <span className="block whitespace-nowrap">Indie Hacking.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            delay: 0.1,
          }}
          className="w-full text-base sm:text-lg lg:text-xl tracking-tight font-light text-text-secondary flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1"
        >
          <span>my work in</span>
          <Link
            href="/blog/my-work-so-far"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 border-b border-text-secondary/60 hover:border-text-primary hover:text-text-primary transition-colors duration-300"
          >
            open source
            <ArrowUpRight className="w-3.5 h-3.5 -rotate-12" />
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/blog/my-work-in-building-in-public"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 border-b border-text-secondary/60 hover:border-text-primary hover:text-text-primary transition-colors duration-300"
          >
            building in public
            <ArrowUpRight className="w-3.5 h-3.5 -rotate-12" />
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/blog/my-work-in-indie-hacking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 border-b border-text-secondary/60 hover:border-text-primary hover:text-text-primary transition-colors duration-300"
          >
            indie hacking
            <ArrowUpRight className="w-3.5 h-3.5 -rotate-12" />
          </Link>
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.3,
        }}
        className="z-30 flex items-center gap-3 [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
      >
        <PrimaryButtom onClick={handleGetStartedClick}>
          <Terminal />
          Get Started
        </PrimaryButtom>
        <PrimaryButtom
          onClick={handleCheckProClick}
          classname="bg-surface-tertiary border border-border hover:bg-surface-hover"
        >
          <ArrowRight />
          Check Pro
        </PrimaryButtom>
      </motion.div>
      <div className="pointer-events-none absolute h-[50%] w-full bg-gradient-to-t from-surface-primary via-transparent to-transparent bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Hero;
