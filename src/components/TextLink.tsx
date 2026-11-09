import { ReactNode } from "react";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

interface TextLinkProps {
  children: ReactNode;
  href: string;
  light?: boolean;
  className?: string;
}

export function TextLink({
  children,
  href,
  light = false,
  className = "",
}: TextLinkProps) {
  return (
    <Link
      className={`text-link ${light ? "text-link-light" : ""} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowIcon diagonal />
    </Link>
  );
}
