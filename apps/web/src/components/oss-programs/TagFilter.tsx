"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagsChange,
}: TagFilterProps) {
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableTags = useMemo(() => {
    return tags.filter(
      (tag) =>
        !selectedTags.includes(tag) &&
        tag.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [tags, selectedTags, filterInput]);

  const addTag = (tag: string) => {
    onTagsChange([...selectedTags, tag]);
    setFilterInput("");
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      filterInput === "" &&
      selectedTags.length > 0
    ) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="relative flex-1 min-w-0" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 bg-dash-surface border border-dash-border rounded-xl p-2 min-h-[50px] focus-within:border-brand-purple transition-colors cursor-text min-w-0"
        onClick={() => {
          inputRef.current?.focus();
          setIsDropdownOpen(true);
        }}
      >
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-brand-purple/20 text-brand-purple-light px-3 py-1 rounded-full text-sm flex-shrink-0"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                aria-label={`Remove ${tag}`}
                className="hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            placeholder={selectedTags.length === 0 ? "Filter by tags..." : ""}
            value={filterInput}
            onChange={(e) => {
              setFilterInput(e.target.value);
              setIsDropdownOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsDropdownOpen(true)}
            className="bg-transparent text-white placeholder-gray-500 focus:outline-none flex-1 min-w-0"
          />
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 top-full left-0 right-0 mt-2 bg-dash-surface border border-dash-border rounded-xl shadow-xl max-h-60 overflow-y-auto"
          >
            {availableTags.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                No matching tags found
              </div>
            ) : (
              availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  aria-label={`Add tag ${tag}`}
                  className="w-full text-left px-4 py-3 hover:bg-dash-hover text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                >
                  {tag}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
