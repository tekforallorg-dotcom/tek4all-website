import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./quest.css";

const questDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quest-display",
});
const questBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-quest-body",
});
const questMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-quest-mono",
});

// Formal register for anything institutional; the casual "Quest" lives in UI copy.
export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Find where AI actually helps your organisation first, without wasting money, exposing data, or chasing hype. A free 12-minute readiness diagnostic for African NGOs.",
};

export default function QuestLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        questDisplay.variable +
        " " +
        questBody.variable +
        " " +
        questMono.variable +
        " quest-root"
      }
    >
      {children}
    </div>
  );
}
