"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export function ProgressBar({ completed, total, className }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const circumference = 2 * Math.PI * 32; // radius = 32
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-dash-surface rounded-lg px-4 py-3 border border-dash-border",
        className
      )}
    >
      {/* Left side - Text and numbers */}
      <div className="flex flex-col gap-0.5">
        <p className="text-text-primary text-sm font-medium">Total Progress</p>
        <p className="text-text-primary text-xl font-bold">
          {completed} / {total}
        </p>
      </div>

      {/* Right side - Circular progress */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="transform -rotate-90 w-16 h-16">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-dash-base"
          />
          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out text-brand-purple"
          />
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-text-primary text-sm font-bold">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
