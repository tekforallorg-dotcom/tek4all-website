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
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "https://moondesk.tekforall.org", label: "MoonDesk" },
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
    <footer className="bg-deep-black text-white">
      {/* CTA Band */}
      <div className="gradient-cta">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
            Partner with us to bridge the digital divide and empower communities
            with future-ready skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partnerships"
              className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors"
            >
              Partner With Us
            </Link>
            <Link
              href="/volunteer"
              className="border border-white/30 text-white px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-white/10 transition-colors"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/tek4all-logo-white.png"
              alt="Tek4All"
              width={140}
              height={42}
              className="h-9 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Bridging the digital divide through practical skills, inclusive
              access, and future-ready systems.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/tekforallorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/tekforall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              Programmes
            </h3>
            <ul className="space-y-2.5">
              {PROGRAMME_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4 text-white/40">
              Contact
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Mail size={15} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:impact@tekforall.org" className="hover:text-white transition-colors">
                  impact@tekforall.org
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Phone size={15} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+2347031064144" className="hover:text-white transition-colors">
                  +234-703-106-4144
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>Ventures Park, 5 Kwaji Close, Maitama, Abuja, Nigeria</span>
              </li>
            </ul>

            {/* Newsletter */}
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-3 text-white/40">
              Join Our Community
            </h3>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-near-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-off-white transition-colors disabled:opacity-50 flex-shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {status === "success" && (
              <p className="text-green-400 text-xs mt-2">Welcome to our community!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            Tek4All &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
