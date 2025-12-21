"use client";
import { Terminal } from "lucide-react";
import Image from "next/image";
import React from "react";
import PrimaryButtom from "../ui/custom-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";

const Hero = () => {
  const { trackButtonClick } = useAnalytics();
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
  };
  return (
    <div className="w-full min-h-[50dvh] lg:h-[69dvh] relative overflow-hidden z-10 p-4 lg:p-[60px] flex flex-col items-center justify-center gap-6 ">
      <Image
        src="/assets/bgmain.svg"
        alt="background"
        fill
        className="object-cover max-md:object-top w-full h-full absolute -z-10 opacity-90"
        priority
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:max-w-3xl space-y-3 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-4 [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
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
          className="text-5xl text-[2.8rem] lg:text-7xl lg:text-[6rem] font-medium tracking-tighter [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
        >
          Only platform you need to get into Open Source
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
          className="w-full lg:text-2xl tracking-tight font-light sm:max-w-lg mx-auto lg:max-w-4xl lg:text-balance text-text-secondary"
        >
          Find suitabe OSS repos in seconds. learn the basics,
          get the mentorship for OSS opportunities, GSoC, etc, and start making progress from today itself.
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
        className="cursor-pointer z-30 [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
      >
        <Link
          href="/dashboard/home"
          className="block"
          onClick={handleGetStartedClick}
        >
          <PrimaryButtom>
            <Terminal />
            Get Started
          </PrimaryButtom>
        </Link>
      </motion.div>
      <div className="absolute h-[50%] w-full bg-gradient-to-t from-surface-primary via-transparent to-transparent bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Hero;
