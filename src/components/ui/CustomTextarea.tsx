"use client";

import { TextareaHTMLAttributes, ReactNode } from "react";

export interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  icon?: ReactNode;
  error?: string;
  showCharCount?: boolean;
}

export function CustomTextarea({
  id,
  name,
  icon,
  error,
  showCharCount = true,
  maxLength = 1200,
  value,
  className = "",
  ...props
}: CustomTextareaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-start gap-2.5 w-full p-3 bg-[#FAF7F2] border transition-all duration-200 ${
          error
            ? "border-[var(--cinnamon,#713B2F)] bg-[#F5ECE8]"
            : "border-[#C9BEAD] focus-within:border-[var(--cinnamon,#713B2F)] focus-within:ring-1 focus-within:ring-[var(--cinnamon,#713B2F)]/25 hover:border-[#8E7E6B] hover:bg-[#FDFBF7]"
        } ${className}`}
      >
        {icon && (
          <span className="text-[var(--terracotta,#9B5540)] flex-shrink-0 mt-0.5">
            {icon}
          </span>
        )}
        <textarea
          id={id}
          name={name}
          maxLength={maxLength}
          value={value}
          className="w-full bg-transparent border-none text-sm text-[var(--ink,#24231F)] placeholder:text-[#8E8474] focus:outline-none resize-y min-h-[72px] leading-relaxed"
          {...props}
        />
      </div>

      {showCharCount && (
        <div className="flex justify-end mt-1">
          <span className="text-[10px] text-[var(--muted,#605B52)] tracking-tight">
            {currentLength} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
