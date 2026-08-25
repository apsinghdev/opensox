import React from "react";

function ProgramCardSkeleton() {
  return (
    <div className="w-full bg-dash-surface border border-dash-border rounded-xl px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3 md:gap-4 animate-pulse">
      {/* Left Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="h-4 md:h-5 w-1/3 bg-gray-700/50 rounded mb-2" />

        {/* Description */}
        <div className="h-3 md:h-4 w-2/3 bg-gray-700/40 rounded" />
      </div>

      {/* Region (desktop only) */}
      <div className="hidden md:flex items-center gap-6 flex-shrink-0">
        <div className="text-right">
          <div className="h-3 w-10 bg-gray-700/40 rounded mb-1 ml-auto" />
          <div className="h-4 w-14 bg-gray-700/50 rounded ml-auto" />
        </div>
      </div>

      {/* Chevron */}
      <div className="flex-shrink-0">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-700/40 rounded-full" />
      </div>
    </div>
  );
}

export default React.memo(ProgramCardSkeleton);
