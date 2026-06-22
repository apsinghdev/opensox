"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const gradientColor = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

  return (
    <>
      <style>{`
        @keyframes shine-transform {
          0% { transform: translate(-33.33%, -33.33%); }
          50% { transform: translate(33.33%, 33.33%); }
          100% { transform: translate(-33.33%, -33.33%); }
        }
      `}</style>
      <div
        ref={containerRef}
        style={
          {
            "--border-width": `${borderWidth}px`,
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "var(--border-width)",
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 size-full rounded-[inherit] overflow-hidden",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 w-[300%] h-[300%] -left-[100%] -top-[100%] will-change-transform transform-gpu"
          style={{
            backgroundImage: `radial-gradient(transparent, transparent, ${gradientColor}, transparent, transparent)`,
            animation: `shine-transform ${duration}s infinite linear`,
            animationPlayState: isVisible ? "running" : "paused",
          }}
        />
      </div>
    </>
  );
}
