"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const QUICK_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const PROGRAMME_LINKS = [
  { href: "/programmes/ai4all-school-tours", label: "AI4All School Tours" },
  { href: "/programmes/women-in-tek", label: "Women-in-Tek" },
  { href: "/programmes/tek4teachers", label: "Tek4Teachers" },
  { href: "/programmes/nextgen-innovators", label: "NextGen Innovators" },
  { href: "/funding", label: "Funding & Services" },
  { href: "https://sabitek.app", label: "Sabitek" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "newsletter",
        data: { email: email.trim() },
      });
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-matte-black text-white">
      {/* ===== JOIN THE MOVEMENT — matte black statement band ===== */}
      <div className="gradient-cta border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
          <h2 className="mx-auto mb-6 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
            Join the Movement
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white/65">
            Partner with us to bridge the digital divide and empower communities
            with future-ready skills.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/partnerships"
              className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-white px-9 text-[15px] font-medium text-matte-black font-ui transition-all duration-300 hover:bg-soft-white hover:shadow-cta"
            >
              Partner With Us
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/25 px-9 text-[15px] font-medium text-white font-ui transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN FOOTER ===== */}
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Image
              src="/images/tek4all-logo-white.png"
              alt="Tek4All"
              width={140}
              height={42}
              className="mb-5 h-9 w-auto"
            />
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/60">
              Bridging the digital divide through practical skills, inclusive
              access, and future-ready systems.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/tekforallorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-white/50 hover:bg-white/5 hover:text-white"
              >
                <Instagram size={16} strokeWidth={1.8} />
              </a>
              <a
                href="https://www.linkedin.com/company/tekforall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-white/50 hover:bg-white/5 hover:text-white"
              >
                <Linkedin size={16} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 font-ui">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 font-ui">
              Programmes
            </h3>
            <ul className="space-y-3">
              {PROGRAMME_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 font-ui">
              Contact
            </h3>
            <ul className="mb-10 space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/65">
                <Mail size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-white/40" />
                <a href="mailto:impact@tekforall.org" className="transition-colors duration-200 hover:text-white">
                  impact@tekforall.org
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/65">
                <Phone size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-white/40" />
                <a href="tel:+2347031064144" className="transition-colors duration-200 hover:text-white">
                  +234-703-106-4144
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                <MapPin size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-white/40" />
                <span>Ventures Park, 5 Kwaji Close, Maitama, Abuja, Nigeria</span>
              </li>
            </ul>

            {/* Newsletter */}
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 font-ui">
              Join Our Community
            </h3>
            <form onSubmit={handleNewsletter} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 transition-colors duration-300 focus-within:border-white/40">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="min-w-0 flex-1 bg-transparent px-3.5 text-sm text-white placeholder:text-white/45 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-matte-black transition-colors duration-300 hover:bg-soft-white disabled:opacity-50"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {status === "success" && (
              <p className="mt-3 text-xs text-white/80">Welcome to our community!</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-xs text-red-400">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/40">
            Tek4All &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-7 text-sm text-white/40">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
