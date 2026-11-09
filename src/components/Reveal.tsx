import { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const style: CSSProperties = delay
    ? ({ "--delay": `${delay}ms` } as CSSProperties)
    : {};

  return (
    <div data-reveal className={className} style={style}>
      {children}
    </div>
  );
}
