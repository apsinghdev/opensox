"use client";
import { Terminal } from "lucide-react";
import Image from "next/image";
import React from "react";
import PrimaryButtom from "../ui/custom-button";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
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
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", type: "spring" }}
          className="flex items-center justify-center gap-2 p-[1px] bg-gradient-to-r from-[#823ed6] via-[#411FC6] to-[#823ed6]  w-max rounded-full mx-auto relative overflow-hidden"
        >


          <div className="inline-flex items-center gap-2 px-16 justify-center py-1.5 rounded-full bg-[#131313] backdrop-blur-sm overflow-hidden relative ">
            <SvgLines className="absolute right-0 z-10" />
            <SvgLines className="absolute left-0 z-10 -scale-x-[1]" />

            <span className=" text-sm font-medium">Backed by</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-gradient-to-br from-[#f85446] to-[#ff8000] rounded-sm flex items-center justify-center">
                <span className=" text-xs font-bold">U</span>
              </div>
              <span className=" text-sm font-medium">sers</span>
            </div>
          </div>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-5xl text-[2.8rem] lg:text-7xl lg:text-[6rem] font-medium tracking-tighter [will-change:transform,opacity] motion-reduce:transition-none motion-reduce:transform-none"
        >
          Find your perfect Open-Source Repo
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
          Find top open-source repos in seconds. Filter by your language,
          framework, or niche. Start contributing in seconds, not hours.
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
        <Link href="/dashboard/home" className="block">
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

const SvgLines = ({ ...props }) => {
  return (
    <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
      <path d="M86.6328 11.2441H5.23281" stroke="url(#paint0_linear_621_3137)" stroke-width="0.733333" />
      <rect x="-0.366667" y="0.366667" width="5.13333" height="5.13333" rx="1.1" transform="matrix(-1 0 0 1 20.628 0)" stroke="url(#paint1_linear_621_3137)" stroke-width="0.733333" />
      <path d="M4.40039 8.67676H1.4668C0.859463 8.67697 0.367188 9.16996 0.367188 9.77734V12.7109C0.367398 13.3181 0.859593 13.8103 1.4668 13.8105H4.40039C5.00777 13.8105 5.50077 13.3183 5.50098 12.7109V9.77734C5.50098 9.16983 5.0079 8.67676 4.40039 8.67676Z" stroke="url(#paint2_linear_621_3137)" stroke-width="0.733333" />
      <path d="M14.7656 16.3662H11.832C11.2247 16.3664 10.7324 16.8594 10.7324 17.4668V20.4004C10.7326 21.0076 11.2248 21.4998 11.832 21.5H14.7656C15.373 21.5 15.866 21.0077 15.8662 20.4004V17.4668C15.8662 16.8593 15.3731 16.3662 14.7656 16.3662Z" stroke="url(#paint3_linear_621_3137)" stroke-width="0.733333" />
      <path d="M59.0078 11.2444C59.0078 11.2444 53.1411 3.17773 47.2745 3.17773C41.4078 3.17773 21.1189 3.17773 21.1189 3.17773" stroke="url(#paint4_linear_621_3137)" stroke-width="0.733333" />
      <path d="M42.877 11.2442C42.877 11.2442 38.6378 19.0664 34.3987 19.0664C30.1595 19.0664 15.4992 19.0664 15.4992 19.0664" stroke="url(#paint5_linear_621_3137)" stroke-width="0.733333" />
      <defs>
        <linearGradient id="paint0_linear_621_3137" x1="60.8652" y1="11" x2="5.23281" y2="11.7441" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8D49E2" />
          <stop offset="1" stop-color="#411FC6" />
        </linearGradient>
        <linearGradient id="paint1_linear_621_3137" x1="3.99609" y1="0.5" x2="-1.00391" y2="5.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#411FC6" />
          <stop offset="1" stop-color="#8D49E2" />
        </linearGradient>
        <linearGradient id="paint2_linear_621_3137" x1="4.86523" y1="10" x2="1.36523" y2="15" gradientUnits="userSpaceOnUse">
          <stop stop-color="#411FC6" />
          <stop offset="1" stop-color="#8D49E2" />
        </linearGradient>
        <linearGradient id="paint3_linear_621_3137" x1="15.2305" y1="17.6895" x2="16.3652" y2="19" gradientUnits="userSpaceOnUse">
          <stop stop-color="#411FC6" />
          <stop offset="1" stop-color="#8D49E2" />
        </linearGradient>
        <linearGradient id="paint4_linear_621_3137" x1="59.3672" y1="3" x2="21.1189" y2="7.21107" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8D49E2" />
          <stop offset="0.5" stop-color="#411FC6" />
          <stop offset="1" stop-color="#6734D4" />
        </linearGradient>
        <linearGradient id="paint5_linear_621_3137" x1="15.4992" y1="15.1553" x2="42.877" y2="15.1553" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8D49E2" />
          <stop offset="1" stop-color="#411FC6" />
        </linearGradient>
      </defs>
    </svg>
  )
}