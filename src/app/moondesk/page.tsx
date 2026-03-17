import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, ListChecks, Paperclip, LayoutDashboard, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoonDesk",
  description: "AI-powered programme management built for NGOs, programme teams, and mission-driven organisations.",
};

const FEATURES = [
  { icon: Layers, title: "Programmes & Workstreams", description: "Organize complex interventions into structured, manageable hierarchies to maintain clarity across distributed teams." },
  { icon: ListChecks, title: "Task Management", description: "Assign owners, set timelines, and track real-time status. Keep every team member accountable and informed." },
  { icon: Paperclip, title: "Evidence & Attachments", description: "Directly link proof of impact, photos, and activity reports to specific tasks for verification and reporting." },
  { icon: LayoutDashboard, title: "Reporting Dashboards", description: "Simple, high-visibility views across all projects to ensure accountability and progress at a glance." },
  { icon: ShieldCheck, title: "Roles & Permissions", description: "Granular access control for system admins, programme managers, and field staff. Secure and appropriate." },
];

export default function MoonDeskPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="MoonDesk"
        description="AI-powered programme management built for NGOs, programme teams, and mission-driven organisations."
      >
        <Link href="/contact" className="mt-6 bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
          Get Early Access <ArrowRight size={16} />
        </Link>
      </PageHero>

      {/* Dashboard Preview */}
      <section style={{ backgroundColor: "#0d141a" }} className="pb-16 md:pb-24 -mt-1">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <Image
                src="/images/moondesk-preview.png"
                alt="MoonDesk dashboard — programme management interface"
                width={1200}
                height={750}
                className="w-full h-auto"
                style={{ opacity: 0.9 }}
                priority
              />
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(to bottom, rgba(13,20,26,0.2) 0%, transparent 10%, transparent 85%, rgba(13,20,26,0.5) 100%)",
              }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">
              Built for Impact
            </h2>
            <p className="text-mid-gray text-lg max-w-xl mx-auto">
              Everything your programme team needs to deliver, track, and report — in one place.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-near-black rounded-xl flex items-center justify-center mb-6">
                    <feature.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-mid-gray text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Programme Operations?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              MoonDesk brings structure, accountability, and evidence-based reporting to your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
                Request a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/partnerships" className="border border-white/30 text-white px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-white/10 transition-colors">
                Partner With Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
