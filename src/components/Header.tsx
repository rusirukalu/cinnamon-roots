"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ArrowIcon } from "./ArrowIcon";
import { NAV_LINKS } from "@/lib/data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll offset to style compact header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu keyboard trap, escape key, and scroll locking
  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first interactive link in menu
    const firstLink = menuContainerRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
      }

      if (e.key === "Tab") {
        const focusableElements = [
          toggleButtonRef.current,
          ...(menuContainerRef.current?.querySelectorAll<HTMLAnchorElement>("a") || []),
        ].filter(Boolean) as HTMLElement[];

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`site-header ${isScrolled ? "is-scrolled" : ""} ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <Wordmark />

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link href="#booking" className="nav-book">
          Book your experience <ArrowIcon diagonal size={16} />
        </Link>

        <button
          ref={toggleButtonRef}
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
          <span className="menu-lines">
            <i />
            <i />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          ref={menuContainerRef}
          id="mobile-navigation"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <p className="eyebrow">A little closer to Ceylon</p>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map(([label, href], index) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                <span className="eyebrow">0{index + 1}</span>
                {label}
                <ArrowIcon diagonal size={24} />
              </Link>
            ))}
          </nav>
          <Link
            href="#booking"
            className="mobile-book"
            onClick={() => setMenuOpen(false)}
          >
            Book your experience <ArrowIcon diagonal />
          </Link>
          <p className="eyebrow mobile-menu-note">
            Sri Lanka · Plantation to quill
          </p>
        </div>
      )}
    </>
  );
}
