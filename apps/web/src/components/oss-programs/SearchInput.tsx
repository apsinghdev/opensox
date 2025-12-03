"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Search programs..." }: SearchInputProps): JSX.Element {
  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-dash-surface border border-dash-border rounded-xl py-3 pl-12 pr-4 text-text-primary placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors"
        aria-label="Search programs"
      />
    </div>
  );
}
