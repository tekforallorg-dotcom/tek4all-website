import type { Metadata } from "next";
import { DM_Sans, Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tek4All — Skilling Lives, Uplifting Minds",
    template: "%s | Tek4All",
  },
  description:
    "Tek4All bridges the digital divide by equipping underserved communities and organisations with future-ready digital skills, AI literacy, and inclusive technology access.",
  keywords: [
    "digital inclusion",
    "AI literacy",
    "technology education",
    "Nigeria",
    "workforce enablement",
    "digital skills",
  ],
  metadataBase: new URL("https://tekforall.org"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tekforall.org",
    siteName: "Tek4All",
    title: "Tek4All — Skilling Lives, Uplifting Minds",
    description:
      "Equipping underserved communities and organisations with future-ready digital skills and tools to thrive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tek4All — Skilling Lives, Uplifting Minds",
    description:
      "Equipping underserved communities and organisations with future-ready digital skills and tools to thrive.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${outfit.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
