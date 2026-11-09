import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";

interface ArrowIconProps {
  diagonal?: boolean;
  down?: boolean;
  size?: number;
  className?: string;
}

export function ArrowIcon({
  diagonal = false,
  down = false,
  size = 18,
  className,
}: ArrowIconProps) {
  if (down) {
    return <ArrowDown size={size} strokeWidth={1.35} aria-hidden="true" className={className} />;
  }
  if (diagonal) {
    return <ArrowUpRight size={size} strokeWidth={1.35} aria-hidden="true" className={className} />;
  }
  return <ArrowRight size={size} strokeWidth={1.35} aria-hidden="true" className={className} />;
}
