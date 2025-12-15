"use client";
import { motion } from "framer-motion";
import React from "react";
import { FlickeringGrid } from "./flickering-grid";
import { colors } from "@/lib/design-tokens";

const Header = ({ title }: { title: string | React.ReactNode }) => {
  return (
    <div className="px-[30px] py-10 h-[160px] relative overflow-hidden border-b border w-full">
      <motion.h4
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          delay: 0.3,
        }}
        className="font-medium inset-0 flex items-center justify-center text-3xl lg:text-5xl tracking-tight absolute z-30 text-center text-balance"
      >
        {title}
      </motion.h4>
      <div
        style={{
          background:
            "radial-gradient(circle at center, #101010 30%, transparent 100%)",
        }}
        className="h-full w-[100%] right-0 top-0 z-20 absolute"
      />
      <div className="absolute right-0 w-[100%] h-full top-0 z-10 opacity-50">
        <FlickeringGrid
          className="absolute -z-0 top-0 right-0"
          squareSize={3}
          gridGap={6}
          color={colors.brand.purple.grid}
          maxOpacity={1}
          flickerChance={0.1}
          height={200}
          width={2000}
        />
      </div>
    </div>
  );
};

export default Header;
