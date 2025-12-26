"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { colors } from "@/lib/design-tokens";

const FlickeringGrid = dynamic(() => import("./flickering-grid").then((mod) => mod.FlickeringGrid), {
  ssr: false,
  loading: () => null,
});

const Header = ({ title }: { title: string | React.ReactNode }) => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-[30px] py-10 h-[160px] relative overflow-hidden border-b border w-full">
      <h4 className="font-medium inset-0 flex items-center justify-center text-3xl lg:text-5xl tracking-tight absolute z-30 text-center text-balance">
        {title}
      </h4>
      <div
        style={{
          background:
            "radial-gradient(circle at center, #101010 30%, transparent 100%)",
        }}
        className="h-full w-[100%] right-0 top-0 z-20 absolute"
      />
      {showGrid && (
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
      )}
    </div>
  );
};

export default Header;
