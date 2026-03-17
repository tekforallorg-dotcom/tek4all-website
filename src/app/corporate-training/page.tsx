import Link from "next/link";
import { ArrowRight, Brain, BarChart3, Sparkles, Shield, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Training",
  description: "Practical AI, data literacy, change enablement, and responsible AI training for organisations — from Tek4All.",
};

const TRACKS = [
  { icon: Brain, title: "AI for Work & Operations", description: "Streamlining workflows and automating routine tasks for operational efficiency. Teams learn practical AI tools they can apply immediately." },
  { icon: BarChart3, title: "Data Literacy & Dashboards", description: "Turning raw data into actionable insights and visual stories. Build a data-driven culture across your organisation." },
  { icon: Sparkles, title: "Change Enablement", description: "Strategies to drive adoption and manage the cultural shift to digital. Overcome resistance and build momentum." },
  { icon: Shield, title: "Responsible & Secure AI", description: "Navigating ethics, privacy, and security in the age of intelligence. Build trust with stakeholders and regulators." },
];

const WHY_IT_WORKS = [
  { title: "Competency Baselines & Tracking", description: "We measure where teams start and track real progress." },
  { title: "Post-Training Implementation", description: "Ongoing guidance to ensure skills stick and get applied." },
  { title: "Practical Outputs", description: "Real templates, workflows, and tools — not just theory." },
];

export default function CorporateTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="B2B Services"
        title="Corporate Training"
        description="Practical AI, data, and digital transformation training for teams in NGOs, corporates, public sector, and foundations."
      />

      {/* Training Tracks */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">Training Tracks</h2>
            <p className="text-mid-gray text-lg max-w-xl mx-auto">Four focused tracks designed for measurable workforce transformation.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8">
            {TRACKS.map((track, i) => (
              <FadeIn key={track.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-near-black rounded-xl flex items-center justify-center mb-6">
                    <track.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-3">{track.title}</h3>
                  <p className="text-mid-gray leading-relaxed">{track.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="gradient-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-8">Why It Works</h2>
              <div className="space-y-6">
                {WHY_IT_WORKS.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-white/40 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-4">Ready to Upskill Your Team?</h3>
                <p className="text-white/60 mb-6">Get a custom proposal tailored to your organisation&apos;s needs.</p>
                <Link href="/contact" className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
                  Book Training <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
