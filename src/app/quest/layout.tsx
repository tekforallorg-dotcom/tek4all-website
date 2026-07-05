import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./quest.css";

const questSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-quest-sans",
});

// Formal register for anything institutional; the casual "Quest" lives in UI copy.
export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "A premium AI readiness diagnostic that helps development organisations discover where AI and automation can improve work first, without wasting money, exposing data, or chasing hype.",
};

export default function QuestLayout({ children }: { children: ReactNode }) {
  return <div className={questSans.variable + " quest-root"}>{children}</div>;
}
