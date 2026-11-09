import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Wordmark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(24px, 5vw, 88px)",
        background: "var(--ivory, #F5F0E7)",
        color: "var(--ink, #24231F)",
      }}
    >
      <header>
        <Wordmark />
      </header>

      <main
        style={{
          maxWidth: "600px",
          margin: "4rem 0",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          Page Not Found · 404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Lost in the <em>grove.</em>
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.8, marginBottom: "2rem" }}>
          The page you are looking for does not exist or has moved. Return to the
          plantation experience to discover authentic Ceylon cinnamon.
        </p>
        <Link
          href="/"
          className="booking-submit"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "var(--cinnamon, #713B2F)",
            color: "var(--ivory, #F5F0E7)",
            padding: "1rem 1.5rem",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          Return to Ceylon Cinnamon Roots <ArrowIcon diagonal size={18} />
        </Link>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--rule, #CCC4B7)",
          paddingTop: "1.5rem",
          fontSize: "11px",
          color: "var(--muted, #605B52)",
        }}
      >
        © {new Date().getFullYear()} Ceylon Cinnamon Roots · Ahangama, Galle, Sri Lanka
      </footer>
    </div>
  );
}
