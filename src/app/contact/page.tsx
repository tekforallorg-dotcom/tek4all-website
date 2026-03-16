"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "contact",
        data: form,
      });
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="bg-deep-black pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Be part of the movement to bridge the digital divide. Contact us to
              volunteer, partner, or support Tek4All.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeIn>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-ash bg-off-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-ash bg-off-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-near-black mb-1.5 font-[family-name:var(--font-inter)]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Type your message here"
                    className="w-full px-4 py-3 rounded-xl border border-ash bg-off-white text-near-black placeholder:text-mid-gray/50 focus:outline-none focus:ring-2 focus:ring-near-black/10 focus:border-near-black/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-near-black text-white px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-charcoal transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && (
                  <p className="text-green-600 text-sm">Message sent! We&apos;ll be in touch soon.</p>
                )}
                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                )}
              </form>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.15}>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black mb-6">
                Contact Details
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-near-black" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm">Email</p>
                    <a href="mailto:impact@tekforall.org" className="text-mid-gray hover:text-near-black transition-colors">
                      impact@tekforall.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-near-black" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm">Phone</p>
                    <a href="tel:+2347031064144" className="text-mid-gray hover:text-near-black transition-colors">
                      +234-703-106-4144
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-near-black" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm">Location</p>
                    <p className="text-mid-gray">
                      Ventures Park, 5 Kwaji Close,<br />
                      Maitama, Abuja 904101, FCT, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-near-black" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm">Hours</p>
                    <p className="text-mid-gray">Monday – Friday, 9:00 AM – 5:00 PM (WAT)</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
