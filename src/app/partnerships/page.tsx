"use client";

import { useState } from "react";
import { ArrowRight, Handshake, Gift, Heart } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/client";

const PARTNERSHIP_TYPES = [
  {
    icon: Handshake,
    title: "Corporate Partnerships",
    description:
      "Collaborate on tech education, digital literacy, infrastructure, and mentorship programmes aligned with your CSR goals. We bring community reach, programme expertise, and measurable outcomes.",
  },
  {
    icon: Gift,
    title: "Donations & In-Kind Support",
    description:
      "Cash or in-kind contributions — laptops, tablets, internet devices, learning materials — from individuals, corporates, and institutions. Every contribution directly reaches communities.",
  },
  {
    icon: Heart,
    title: "Volunteer Your Skills",
    description:
      "Remote and flexible volunteer opportunities for educators, tech experts, writers, marketers, and community leaders. Share your expertise from anywhere in the world.",
  },
];

export default function PartnershipsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "partnership",
        data: form,
      });
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Partnerships"
        title="Partner With Us"
        description="Together we can bridge the digital divide, empower communities, and build an inclusive digital economy. Your partnership creates lasting impact."
      />

      {/* Partnership Types */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">
              Ways to Partner
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNERSHIP_TYPES.map((type, i) => (
              <FadeIn key={type.title} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm">
                  <div className="w-12 h-12 bg-near-black rounded-xl flex items-center justify-center mb-6">
                    <type.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-3">
                    {type.title}
                  </h3>
                  <p className="text-mid-gray leading-relaxed text-sm">
                    {type.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="gradient-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
                Why Partner with Tek4All?
              </h2>
              <ul className="space-y-4">
                {[
                  "Direct community reach across underserved populations in Nigeria",
                  "Transparent reporting and measurable impact metrics",
                  "Structured programmes with proven delivery track record",
                  "Alignment with SDGs and CSR frameworks",
                  "Flexible partnership models tailored to your goals",
                  "Dedicated partnership management and regular updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                    <ArrowRight size={14} className="mt-1 flex-shrink-0 text-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-6">
                  Programme Partnership
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your partnership interest"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-white text-near-black px-6 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Partnership Enquiry"}
                  </button>
                  {status === "success" && (
                    <p className="text-green-400 text-sm text-center">Thank you! We&apos;ll be in touch.</p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
