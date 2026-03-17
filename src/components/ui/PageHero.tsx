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
    <section
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      style={{ backgroundColor: "#0d141a" }}
    >
      {/* Gradient blobs — inline styles because Tailwind v4 can't resolve custom color + opacity */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            top: "-200px",
            right: "-100px",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(50,55,65,0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-250px",
            left: "-150px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(40,45,55,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "30%",
            left: "60%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(60,65,75,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          {eyebrow && (
            <p
              className="text-xs font-medium uppercase mb-6"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-bold leading-[1.1] mb-6 max-w-4xl"
            style={{
              fontFamily: "var(--font-heading), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#ffffff",
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {description}
            </p>
          )}
          {children}
        </FadeIn>
      </div>

      {/* Bottom edge line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
