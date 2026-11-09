import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  number?: string;
  className?: string;
}

export function Eyebrow({ children, number, className = "" }: EyebrowProps) {
  return (
    <p className={`eyebrow ${className}`}>
      {number && <span className="chapter-number">{number}</span>}
      {children}
    </p>
  );
}
