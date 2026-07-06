"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/funding", label: "Funding" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/tekforallorg", label: "Instagram", icon: Instagram },
  { href: "https://www.linkedin.com/company/tekforall", label: "LinkedIn", icon: Linkedin },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.inset = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
    };
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const solid = isScrolled || isMobileOpen;
  const showWhite = !solid;

  return (
    <>
      {/* Main header bar */}
      <header
        className="site-navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transition: "background-color 0.35s, border-color 0.35s, box-shadow 0.35s",
          backgroundColor: solid ? "rgba(255,255,255,0.85)" : "transparent",
          borderBottom: solid ? "1px solid #e5e5e5" : "1px solid transparent",
          boxShadow: isScrolled ? "0 1px 2px rgba(10,10,10,0.03)" : "none",
          backdropFilter: solid ? "blur(18px)" : "none",
          WebkitBackdropFilter: solid ? "blur(18px)" : "none",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" style={{ height: "72px" }}>
          {/* Logo */}
          <Link href="/" onClick={closeMobile} className="shrink-0" aria-label="Tek4All home">
            <Image
              src={showWhite ? "/images/tek4all-logo-white.png" : "/images/tek4all-logo-dark.png"}
              alt="Tek4All"
              width={140}
              height={42}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: solid ? (isActive ? "#0a0a0a" : "#525252") : isActive ? "#ffffff" : "rgba(255,255,255,0.8)",
                    transition: "color 0.2s",
                  }}
                  className={solid ? "hover:!text-matte-black" : "hover:!text-white"}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{ color: solid ? "#525252" : "rgba(255,255,255,0.85)", transition: "color 0.2s, opacity 0.2s" }}
                className="hover:opacity-70"
              >
                <social.icon size={17} strokeWidth={1.8} />
              </a>
            ))}
            <Link
              href="/partnerships"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                height: "42px",
                display: "inline-flex",
                alignItems: "center",
                padding: "0 22px",
                borderRadius: "9999px",
                transition: "all 0.25s",
                backgroundColor: solid ? "#0a0a0a" : "#fff",
                color: solid ? "#fff" : "#0a0a0a",
                marginLeft: "8px",
              }}
              className="hover:opacity-90"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            className="-mr-2 p-2 lg:hidden"
            style={{ color: solid ? "#0a0a0a" : "#fff" }}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu - completely separate portal-like overlay */}
      {isMobileOpen && (
        <div
          className="site-mobile-menu lg:hidden"
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            backgroundColor: "#fff",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex flex-col px-6 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                style={{
                  fontFamily: "var(--font-heading), sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "#1c1c1c",
                  padding: "15px 0",
                  borderBottom: "1px solid #e5e5e5",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-pale-silver text-graphite"
                >
                  <social.icon size={19} strokeWidth={1.8} />
                </a>
              ))}
            </div>

            <Link
              href="/partnerships"
              onClick={closeMobile}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                marginTop: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "54px",
                borderRadius: "9999px",
                backgroundColor: "#0a0a0a",
                color: "#fff",
              }}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
