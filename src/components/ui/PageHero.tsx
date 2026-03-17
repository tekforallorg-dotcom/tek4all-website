"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative bg-deep-black pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-charcoal/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-charcoal/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")' }} />
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          {eyebrow && (
            <p className="text-white/40 text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-6">
              {eyebrow}
            </p>
          )}
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-[1.1] mb-6 max-w-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </FadeIn>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
