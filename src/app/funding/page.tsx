import Link from "next/link";
import { ArrowRight, GraduationCap, Globe, Smartphone, Brain, Server } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funding & Sustainability — Tek4All",
  description: "How Tek4All sustains its digital inclusion programmes through technical expertise and B2B services.",
};

const SERVICES = [
  {
    icon: Brain,
    title: "Corporate Training",
    description: "Practical AI, data literacy, and digital transformation training for teams across NGOs, corporates, public sector, and foundations. We design and deliver structured programmes that build real capability.",
    tags: ["AI Training", "Data Literacy", "Change Management"],
  },
  {
    icon: GraduationCap,
    title: "Learning Management Systems",
    description: "Custom LMS development for schools, training institutions, and government agencies. We build learning infrastructure that supports structured courses, cohort management, and verifiable credentials.",
    tags: ["EdTech", "Custom LMS", "Institutional Learning"],
  },
  {
    icon: Server,
    title: "Sabitek for Institutions",
    description: "Our own B2B learning platform — Sabitek — available for schools, NGOs, and training providers. A ready-made workspace with AI-powered tools, cohort management, smart quizzes, and QR-verifiable certificates.",
    tags: ["B2B Platform", "AI Learning Tools", "Certificates"],
    cta: { label: "Explore Sabitek", href: "https://sabitek.app" },
  },
  {
    icon: Globe,
    title: "Internet Solutions for Enterprise & SMEs",
    description: "Connectivity infrastructure, network implementation, and enterprise internet solutions. We help organisations establish reliable digital foundations for their operations.",
    tags: ["Connectivity", "Infrastructure", "Enterprise IT"],
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Development",
    description: "End-to-end product development — from concept to deployment. We build mobile apps, web platforms, dashboards, and digital tools for organisations that need technology solutions tailored to African contexts.",
    tags: ["Web Apps", "Mobile Apps", "Product Development"],
  },
];

export default function FundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="How We Fund Our Mission"
        description="Our programmes are sustained through the technical expertise of our team. Every service contract directly funds digital inclusion."
      />

      {/* Mission statement */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-6">
                Impact Through Expertise
              </h2>
              <p className="text-mid-gray text-lg leading-relaxed mb-4">
                Tek4All runs its digital inclusion programmes — school tours, community training, youth clubs, and teacher enablement — at no cost to beneficiaries. To keep this sustainable, we offer our technical skills as commercial services.
              </p>
              <p className="text-mid-gray text-lg leading-relaxed">
                Every corporate training delivered, every LMS built, every web product shipped — the revenue goes directly into funding the next cohort of students, the next community activation, the next school tour. When you work with us, you&apos;re investing in both a quality technical partner and a mission that matters.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#f7f7f7" }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-10">
            <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-2">Our Services</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">
              Technical Expertise That Funds Impact
            </h2>
            <p className="text-mid-gray text-lg max-w-2xl">
              Five service lines that power our sustainability layer.
            </p>
          </FadeIn>

          <div className="space-y-5">
            {SERVICES.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 md:p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#0d141a" }}>
                      <svc.icon size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-2">{svc.title}</h3>
                      <p className="text-mid-gray leading-relaxed mb-4">{svc.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {svc.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full font-[family-name:var(--font-inter)]" style={{ backgroundColor: "#f2f2f2", color: "#6b7280" }}>
                            {tag}
                          </span>
                        ))}
                        {svc.cta && (
                          <a href={svc.cta.href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium px-3 py-1 rounded-full font-[family-name:var(--font-inter)] inline-flex items-center gap-1 ml-auto" style={{ backgroundColor: "#0d141a", color: "#fff" }}>
                            {svc.cta.label} <ArrowRight size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0d141a" }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
              Work With Us
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Need a technical partner for your next project? Every engagement funds our digital inclusion programmes across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-near-black px-8 py-4 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center justify-center gap-2">
                Get in Touch <ArrowRight size={16} />
              </Link>
              <Link href="/partnerships" className="px-8 py-4 rounded-full font-medium font-[family-name:var(--font-inter)] inline-flex items-center justify-center gap-2 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
                Explore Partnerships
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
