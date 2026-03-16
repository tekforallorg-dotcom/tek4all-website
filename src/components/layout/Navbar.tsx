"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  {
    href: "https://www.instagram.com/tekforallorg",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/company/tekforall",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex-shrink-0">
          <Image
            src="/images/tek4all-logo.jpg"
            alt="Tek4All — Skilling Lives, Uplifting Minds"
            width={160}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-inter)] text-[15px] font-medium transition-colors hover:opacity-70 ${
                isScrolled ? "text-near-black" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right: Social + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`transition-colors hover:opacity-70 ${
                isScrolled ? "text-near-black" : "text-white"
              }`}
            >
              <social.icon size={18} />
            </a>
          ))}
          <Link
            href="/partnerships"
            className={`ml-2 px-5 py-2.5 rounded-full text-sm font-medium font-[family-name:var(--font-inter)] transition-all ${
              isScrolled
                ? "bg-near-black text-white hover:bg-charcoal"
                : "bg-white text-near-black hover:bg-off-white"
            }`}
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden relative z-50 p-2 transition-colors ${
            isScrolled || isMobileOpen ? "text-near-black" : "text-white"
          }`}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-near-black py-3 border-b border-ash transition-colors hover:text-mid-gray"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 mt-8">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-near-black hover:text-mid-gray transition-colors"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>

            <Link
              href="/partnerships"
              onClick={() => setIsMobileOpen(false)}
              className="mt-6 inline-flex justify-center bg-near-black text-white px-6 py-3 rounded-full text-base font-medium font-[family-name:var(--font-inter)] hover:bg-charcoal transition-colors"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
