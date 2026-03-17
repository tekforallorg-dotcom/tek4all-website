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

  const showWhite = !isScrolled && !isMobileOpen;

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
          transition: "background-color 0.3s, box-shadow 0.3s",
          backgroundColor: isScrolled || isMobileOpen ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: isScrolled ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          backdropFilter: isScrolled || isMobileOpen ? "blur(12px)" : "none",
        }}
      >
        <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between" style={{ height: "64px" }}>
          {/* Logo */}
          <Link href="/" onClick={closeMobile} className="flex-shrink-0">
            <Image
              src={showWhite ? "/images/tek4all-logo-white.png" : "/images/tek4all-logo-dark.png"}
              alt="Tek4All"
              width={140}
              height={42}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: isScrolled ? "#111" : "#fff",
                  transition: "opacity 0.2s",
                }}
                className="hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{ color: isScrolled ? "#111" : "#fff", transition: "opacity 0.2s" }}
                className="hover:opacity-70"
              >
                <social.icon size={18} />
              </a>
            ))}
            <Link
              href="/partnerships"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                padding: "10px 20px",
                borderRadius: "9999px",
                transition: "all 0.2s",
                backgroundColor: isScrolled ? "#111" : "#fff",
                color: isScrolled ? "#fff" : "#111",
                marginLeft: "8px",
              }}
            >
              Join Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            className="lg:hidden p-2"
            style={{ color: isScrolled || isMobileOpen ? "#111" : "#fff" }}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu — completely separate portal-like overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden site-mobile-menu"
          style={{
            position: "fixed",
            top: "64px",
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
                  color: "#111",
                  padding: "14px 0",
                  borderBottom: "1px solid #e5e5e5",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{ color: "#111" }}
                >
                  <social.icon size={22} />
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
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                padding: "14px 24px",
                borderRadius: "9999px",
                backgroundColor: "#111",
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
