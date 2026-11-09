"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDown, Check, Sparkles } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
  guestLabel?: string;
  priceDisplay?: string;
  description?: string;
}

export interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  error?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  error,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const direction = e.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (highlightedIndex + direction + options.length) % options.length;
      setHighlightedIndex(nextIndex);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen) {
        handleSelect(options[highlightedIndex].value);
      } else {
        setIsOpen(true);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden native select for form accessibility, autofill & RTL tests */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-hidden="true"
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        tabIndex={-1}
        className="sr-only"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} — {opt.guestLabel} ({opt.priceDisplay})
          </option>
        ))}
      </select>

      {/* Bespoke luxury trigger */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-label="Choose tour package"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full min-h-[56px] text-left px-4 py-3 bg-[#FAF7F2] border transition-all duration-200 flex items-center justify-between gap-3 rounded-none ${
          error
            ? "border-[var(--cinnamon,#713B2F)] bg-[#F5ECE8]"
            : isOpen
            ? "border-[var(--cinnamon,#713B2F)] ring-1 ring-[var(--cinnamon,#713B2F)]/25 shadow-sm"
            : "border-[#C9BEAD] hover:border-[#8E7E6B] hover:bg-[#FDFBF7]"
        }`}
      >
        <div className="flex flex-col min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[var(--ink,#24231F)]">
              {selectedOption.label}
            </span>
            {selectedOption.guestLabel && (
              <span className="text-[10px] uppercase tracking-wider text-[var(--terracotta,#9B5540)] bg-[#EDE4D5] px-2 py-0.5 font-medium">
                {selectedOption.guestLabel}
              </span>
            )}
          </div>
          {selectedOption.priceDisplay && (
            <span className="text-xs text-[var(--cinnamon,#713B2F)] font-medium mt-0.5">
              {selectedOption.priceDisplay}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 text-[var(--muted,#605B52)]">
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 text-[var(--cinnamon,#713B2F)] ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Bespoke luxury dropdown menu */}
      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-1.5 bg-[#FAF7F2] border border-[#C9BEAD] shadow-xl py-1.5 max-h-80 overflow-y-auto focus:outline-none animate-in fade-in-50 duration-150"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`px-4 py-3 cursor-pointer border-b border-[#EAE2D5] last:border-b-0 transition-colors duration-150 flex items-start justify-between gap-3 ${
                  isSelected
                    ? "bg-[#EFE7D8] text-[var(--ink,#24231F)]"
                    : highlightedIndex === idx
                    ? "bg-[#F4ECE0]"
                    : "hover:bg-[#F4ECE0]"
                }`}
              >
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[var(--ink,#24231F)]">
                      {opt.label}
                    </span>
                    {opt.guestLabel && (
                      <span className="text-[9px] uppercase tracking-wider text-[var(--terracotta,#9B5540)] bg-[#E4D7C2] px-1.5 py-0.5 font-medium">
                        {opt.guestLabel}
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="text-xs text-[var(--muted,#605B52)] mt-1 line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  )}
                  {opt.priceDisplay && (
                    <span className="text-xs font-semibold text-[var(--cinnamon,#713B2F)] mt-1 flex items-center gap-1">
                      <Sparkles size={12} className="text-[var(--terracotta,#9B5540)]" />
                      {opt.priceDisplay}
                    </span>
                  )}
                </div>

                <div className="pt-0.5 flex-shrink-0">
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[var(--cinnamon,#713B2F)] text-[#FAF7F2] flex items-center justify-center">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
