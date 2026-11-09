import Link from "next/link";

interface WordmarkProps {
  footer?: boolean;
}

export function Wordmark({ footer = false }: WordmarkProps) {
  return (
    <Link
      href="#top"
      className={`wordmark ${footer ? "wordmark-footer" : ""}`}
      title="Back to the top"
    >
      <span className="wordmark-origin">CEYLON</span>
      <span>
        cinnamon roots
        <span className="wordmark-period">.</span>
      </span>
    </Link>
  );
}
