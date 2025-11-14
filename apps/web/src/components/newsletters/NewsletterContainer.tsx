"use client";

import { useState, useMemo } from "react";
import NewsletterList from "./NewsletterList";
import { MagnifyingGlassIcon, CalendarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function NewsletterContainer() {
  const [q, setQ] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const monthFilters = useMemo(() => {
    const months = [
      { value: "all", label: "All months" },
      { value: "2025-11", label: "November 2025" },
      { value: "2025-10", label: "October 2025" },
      { value: "2025-09", label: "September 2025" },
    ];
    return months;
  }, []);

  const selectedFilterLabel = monthFilters.find(filter => filter.value === selectedMonth)?.label || "All months";

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="mb-4">
          <div className="inline-block mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-light">
              Pro Access
            </span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-light tracking-tight text-white mb-8 leading-[0.95]">
            Newsletters
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
            Curated insights and platform updates
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-3 mb-16">
          
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full pl-7 pr-4 py-3 bg-transparent border-b border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors text-sm font-light"
            />
          </div>

          {/* Filter */}
          <div className="relative lg:w-48">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between pl-7 pr-4 py-3 bg-transparent border-b border-zinc-800 text-white hover:border-zinc-600 transition-colors group"
            >
              <CalendarIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              <span className="text-sm font-light">{selectedFilterLabel}</span>
              <ChevronDownIcon 
                className={`w-3 h-3 text-zinc-600 transition-all duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                <div className="absolute top-full right-0 mt-3 w-64 bg-zinc-950 border border-zinc-800 z-20 overflow-hidden">
                  {monthFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setSelectedMonth(filter.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-4 text-sm transition-all font-light ${
                        selectedMonth === filter.value
                          ? 'text-white bg-zinc-900'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Active Filter */}
        {selectedMonth !== "all" && (
          <div className="flex items-center gap-4 mb-12 pb-12 border-b border-zinc-900">
            <span className="text-xs text-zinc-600 font-light tracking-wider">FILTERED BY</span>
            <button
              onClick={() => setSelectedMonth("all")}
              className="text-sm text-zinc-400 hover:text-white transition-colors font-light"
            >
              {selectedFilterLabel} ×
            </button>
          </div>
        )}

        {/* Newsletter List */}
        <NewsletterList query={q} monthFilter={selectedMonth} />

        {/* Footer */}
        <div className="text-center pt-12 mt-12 border-t border-zinc-900">
          <p className="text-sm text-zinc-600 font-light tracking-wide">
            More insights coming soon
          </p>
        </div>
      </div>
    </div>
  );
}