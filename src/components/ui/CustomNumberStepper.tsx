"use client";

import { Minus, Plus, Users } from "lucide-react";

export interface CustomNumberStepperProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  error?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function CustomNumberStepper({
  id,
  name,
  value,
  onChange,
  min = 1,
  max = 100,
  error,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: CustomNumberStepperProps) {
  const currentVal = Number(value) || min;

  const handleDecrement = () => {
    if (currentVal > min) {
      onChange(String(currentVal - 1));
    }
  };

  const handleIncrement = () => {
    if (currentVal < max) {
      onChange(String(currentVal + 1));
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full min-h-[50px] bg-[#FAF7F2] border transition-all duration-200 ${
        error
          ? "border-[var(--cinnamon,#713B2F)] bg-[#F5ECE8]"
          : "border-[#C9BEAD] focus-within:border-[var(--cinnamon,#713B2F)] focus-within:ring-1 focus-within:ring-[var(--cinnamon,#713B2F)]/25"
      }`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={currentVal <= min}
        aria-label="Remove one guest"
        className="w-11 h-full min-h-[48px] flex items-center justify-center text-[var(--ink,#24231F)] hover:bg-[#EDE4D5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={14} />
      </button>

      <div className="flex items-center justify-center gap-2 flex-1 px-2">
        <Users size={15} className="text-[var(--terracotta,#9B5540)]" />
        <input
          id={id}
          name={name}
          type="number"
          min={min}
          max={max}
          step="1"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className="w-12 text-center bg-transparent border-none text-sm font-semibold text-[var(--ink,#24231F)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-xs text-[var(--muted,#605B52)] font-medium">
          {currentVal === 1 ? "Guest" : "Guests"}
        </span>
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={currentVal >= max}
        aria-label="Add one guest"
        className="w-11 h-full min-h-[48px] flex items-center justify-center text-[var(--ink,#24231F)] hover:bg-[#EDE4D5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
