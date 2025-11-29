import React from "react";
import { cn } from "@/lib/utils";

interface LegalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlighted";
}

export function LegalCard({
  children,
  className = "",
  variant = "default",
}: LegalCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6",
        variant === "default"
          ? "bg-surface-tertiary border"
          : "bg-surface-tertiary border border-brand-purple",
        className
      )}
    >
      {children}
    </div>
  );
}
