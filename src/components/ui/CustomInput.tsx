"use client";

import { InputHTMLAttributes, ReactNode } from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  icon?: ReactNode;
  error?: string;
}

export function CustomInput({
  id,
  name,
  icon,
  error,
  className = "",
  ...props
}: CustomInputProps) {
  return (
    <div
      className={`flex items-center gap-2.5 w-full min-h-[50px] px-3.5 py-2.5 bg-[#FAF7F2] border transition-all duration-200 ${
        error
          ? "border-[var(--cinnamon,#713B2F)] bg-[#F5ECE8]"
          : "border-[#C9BEAD] focus-within:border-[var(--cinnamon,#713B2F)] focus-within:ring-1 focus-within:ring-[var(--cinnamon,#713B2F)]/25 hover:border-[#8E7E6B] hover:bg-[#FDFBF7]"
      } ${className}`}
    >
      {icon && (
        <span className="text-[var(--terracotta,#9B5540)] flex-shrink-0">
          {icon}
        </span>
      )}
      <input
        id={id}
        name={name}
        className="w-full bg-transparent border-none text-sm text-[var(--ink,#24231F)] placeholder:text-[#8E8474] focus:outline-none"
        {...props}
      />
    </div>
  );
}
