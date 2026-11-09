"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface CustomDatePickerProps {
  id: string;
  name: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: string; // YYYY-MM-DD
  error?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CustomDatePicker({
  id,
  name,
  value,
  onChange,
  minDate,
  error,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial view year and month from value or minDate or today
  const getInitialYearMonth = () => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m] = value.split("-").map(Number);
      return { year: y, month: m - 1 };
    }
    if (minDate && /^\d{4}-\d{2}-\d{2}$/.test(minDate)) {
      const [y, m] = minDate.split("-").map(Number);
      return { year: y, month: m - 1 };
    }
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() };
  };

  const [viewDate, setViewDate] = useState(getInitialYearMonth);

  // Close calendar popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplayDate = (val: string) => {
    if (!val || !/^\d{4}-\d{2}-\d{2}$/.test(val)) return "Select a date…";
    const [y, m, d] = val.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // Build calendar matrix
  const firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1).getDay();
  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();

  const handleDaySelect = (day: number) => {
    const formattedMonth = String(viewDate.month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const selectedString = `${viewDate.year}-${formattedMonth}-${formattedDay}`;
    onChange(selectedString);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Native date input for full RTL test compatibility & mobile accessibility */}
      <input
        id={id}
        name={name}
        type="date"
        min={minDate}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Custom styled trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Choose visit date"
        className={`w-full min-h-[50px] px-3.5 py-2.5 bg-[#FAF7F2] border transition-all duration-200 flex items-center justify-between text-left rounded-none ${
          error
            ? "border-[var(--cinnamon,#713B2F)] bg-[#F5ECE8]"
            : isOpen
            ? "border-[var(--cinnamon,#713B2F)] ring-1 ring-[var(--cinnamon,#713B2F)]/25"
            : "border-[#C9BEAD] hover:border-[#8E7E6B] hover:bg-[#FDFBF7]"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CalendarIcon size={16} className="text-[var(--cinnamon,#713B2F)] flex-shrink-0" />
          <span
            className={`text-sm ${
              value ? "font-medium text-[var(--ink,#24231F)]" : "text-[#8E8474]"
            }`}
          >
            {formatDisplayDate(value)}
          </span>
        </div>

        {value && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="p-1 text-[var(--muted,#605B52)] hover:text-[var(--cinnamon,#713B2F)] cursor-pointer"
            aria-label="Clear date"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Custom calendar popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 mt-1.5 w-72 bg-[#FAF7F2] border border-[#C9BEAD] shadow-xl p-3 animate-in fade-in-50 duration-150">
          {/* Month & year navigation header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EAE2D5]">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1 text-[var(--ink,#24231F)] hover:bg-[#EDE4D5] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-bold tracking-wide uppercase text-[var(--ink,#24231F)]">
              {MONTH_NAMES[viewDate.month]} {viewDate.year}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1 text-[var(--ink,#24231F)] hover:bg-[#EDE4D5] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAY_NAMES.map((d) => (
              <span key={d} className="text-[10px] font-semibold text-[var(--muted,#605B52)]">
                {d}
              </span>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formattedMonth = String(viewDate.month + 1).padStart(2, "0");
              const formattedDay = String(day).padStart(2, "0");
              const dateString = `${viewDate.year}-${formattedMonth}-${formattedDay}`;

              const isPast = minDate ? dateString < minDate : false;
              const isSelected = value === dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDaySelect(day)}
                  className={`h-8 w-8 text-xs flex items-center justify-center transition-colors mx-auto ${
                    isSelected
                      ? "bg-[var(--cinnamon,#713B2F)] text-[#FAF7F2] font-bold"
                      : isPast
                      ? "text-[#CCC4B7] cursor-not-allowed"
                      : "text-[var(--ink,#24231F)] hover:bg-[#EDE4D5] font-medium"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Jump to Today button */}
          <div className="pt-2.5 mt-2 border-t border-[#EAE2D5] flex justify-between items-center text-[10px]">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const y = today.getFullYear();
                const m = String(today.getMonth() + 1).padStart(2, "0");
                const d = String(today.getDate()).padStart(2, "0");
                const todayString = `${y}-${m}-${d}`;
                if (!minDate || todayString >= minDate) {
                  onChange(todayString);
                  setIsOpen(false);
                }
              }}
              className="text-[var(--cinnamon,#713B2F)] font-semibold hover:underline"
            >
              Today
            </button>
            <span className="text-[var(--muted,#605B52)]">Palassa, Sri Lanka</span>
          </div>
        </div>
      )}
    </div>
  );
}
