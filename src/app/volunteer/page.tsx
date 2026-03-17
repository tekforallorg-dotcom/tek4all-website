"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/client";

const ROLES = [
  "Tech Training Facilitator",
  "Content Writer / Storyteller",
  "Social Media & Marketing",
  "Graphic Designer",
  "Research & Data Analyst",
  "Community Outreach",
  "Programme Coordination",
  "Mentorship",
];

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", about: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "volunteer",
        data: form,
      });
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", phone: "", about: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer With Tek4All"
        description="Make an impact from anywhere. Your skills can help empower communities across Nigeria."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black mb-6">
                Why Volunteer?
              </h2>
              <p className="text-mid-gray leading-relaxed mb-8">
                Whether you are a tech expert, educator, writer, marketer, or community
                leader, there is a place for you at Tek4All. All volunteer roles are
                remote and flexible, allowing you to contribute from anywhere.
              </p>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-4">
                Volunteer Roles
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {ROLES.map((role) => (
                  <span
                    key={role}
                    className="bg-off-white text-near-black text-sm font-[family-name:var(--font-inter)] px-4 py-2 rounded-full border border-ash"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-3">
                What You&apos;ll Receive
              </h3>
              <ul className="space-y-2 text-mid-gray text-sm">
                {[
                  "A signed volunteer certificate and recommendation letter",
                  "Access to Tek4All's volunteer community and resources",
                  "Mentorship and professional development opportunities",
                  "The satisfaction of making a real impact",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-near-black mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-off-white rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-near-black mb-2">
                  Safeguarding Note
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed">
                  Tek4All is committed to safeguarding children and vulnerable adults.
                  All volunteers agree to our safeguarding policy and code of conduct.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-off-white rounded-2xl p-8">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black mb-6">
                  Apply to Volunteer
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="vol-name" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                      Your Name
                    </label>
                    <input id="vol-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-ash bg-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="vol-email" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                      Email Address
                    </label>
                    <input id="vol-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email address" className="w-full px-4 py-3 rounded-xl border border-ash bg-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="vol-phone" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                      Phone Number
                    </label>
                    <input id="vol-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number" className="w-full px-4 py-3 rounded-xl border border-ash bg-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="vol-about" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                      Tell Us About Yourself
                    </label>
                    <textarea id="vol-about" rows={4} required value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} placeholder="How do you plan to volunteer? What skills can you contribute?" className="w-full px-4 py-3 rounded-xl border border-ash bg-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={status === "loading"} className="w-full bg-near-black text-white px-6 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-charcoal transition-colors disabled:opacity-50">
                    {status === "loading" ? "Submitting..." : "Apply to Volunteer"}
                  </button>
                  {status === "success" && <p className="text-green-600 text-sm text-center">Application submitted! We&apos;ll review and get back to you.</p>}
                  {status === "error" && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
