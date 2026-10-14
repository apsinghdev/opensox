"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronDown } from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const availableTags = useMemo(() => {
    return tags.filter(
      (tag) =>
        !selectedTags.includes(tag) &&
        tag.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [tags, selectedTags, filterInput]);

  // Reset active suggestion on change
  useEffect(() => {
    setActiveIndex(0);
  }, [filterInput, availableTags.length]);

  const addTag = (tag: string) => {
    onTagsChange([...selectedTags, tag]);
    setFilterInput("");
    setIsDropdownOpen(true);
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || availableTags.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < availableTags.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : availableTags.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      addTag(availableTags[activeIndex]);
    }

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
      {/* Input Container */}
      <div
        className="flex items-center gap-2 bg-dash-surface border border-dash-border rounded-xl
        px-3 py-2.5 min-h-[52px]
        focus-within:border-brand-purple transition-colors cursor-text min-w-0"
        onClick={() => {
          inputRef.current?.focus();
          setIsDropdownOpen(true);
        }}
      >
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-brand-purple/20 text-brand-purple-light
              px-3 py-1.5 rounded-full text-sm flex-shrink-0"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                aria-label={`Remove ${tag}`}
                className="hover:text-white transition-colors"
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
            className="bg-transparent text-white placeholder-gray-500
            focus:outline-none flex-1 min-w-[120px]"
          />
        </div>

        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200" />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute z-20 top-full left-0 right-0 mt-2
          bg-dash-surface border border-dash-border rounded-xl shadow-xl
          max-h-60 overflow-y-auto
          animate-in fade-in slide-in-from-top-2 duration-150
          scroll-smooth overscroll-contain"
        >
          {availableTags.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              No matching tags found
            </div>
          ) : (
            availableTags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                aria-label={`Add tag ${tag}`}
                className={`w-full text-left px-4 py-2.5
                transition-colors flex items-center justify-between
                ${
                  index === activeIndex
                    ? "bg-dash-hover text-white"
                    : "text-gray-300 hover:bg-dash-hover hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
