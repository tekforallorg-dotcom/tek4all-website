import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Globe, Smartphone, Brain, Server, Code, Layers, Zap, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funding & Sustainability | Tek4All",
  description: "How Tek4All sustains its digital inclusion programmes through technical expertise and B2B services.",
};

const SERVICES = [
  {
    icon: Brain,
    title: "Corporate Training",
    description: "Practical AI, data literacy, and digital transformation training for teams across NGOs, corporates, public sector, and foundations.",
    capabilities: ["AI and automation workshops", "Data literacy bootcamps", "Digital transformation strategy", "Change management enablement"],
  },
  {
    icon: GraduationCap,
    title: "Learning Management Systems",
    description: "Custom LMS development for schools, training institutions, and government agencies. We build learning platforms that scale.",
    capabilities: ["Cohort and programme management", "Progress tracking and analytics", "Certificate generation", "Institutional dashboard design"],
  },
  {
    icon: Layers,
    title: "Sabitek for Institutions",
    description: "Our B2B learning platform for schools, NGOs, and training providers. AI-powered tools, smart quizzes, and QR-verifiable certificates, ready to deploy.",
    capabilities: ["Private institution workspace", "SabiBot multilingual AI assistant", "SabiQuiz auto-generated assessments", "Cohort invite and tracking tools"],
    cta: { label: "Explore Sabitek", href: "https://sabitek.app" },
  },
  {
    icon: Globe,
    title: "Internet Solutions for Enterprise and SMEs",
    description: "Connectivity infrastructure, network implementation, and enterprise internet solutions that keep organisations running.",
    capabilities: ["Network design and deployment", "ISP integration and optimisation", "Wi-Fi infrastructure for campuses", "Managed connectivity services"],
  },
  {
    icon: Code,
    title: "Mobile and Web Development",
    description: "End-to-end product development: mobile apps, web platforms, dashboards, and digital tools built for African contexts.",
    capabilities: ["React, Next.js, React Native", "Supabase and cloud infrastructure", "API design and integration", "UI/UX design and prototyping"],
  },
];

const TECH_STACK = [
  "Next.js", "React", "React Native", "TypeScript", "Tailwind CSS",
  "Supabase", "PostgreSQL", "Vercel", "Node.js", "Python",
  "Figma", "Git", "REST APIs", "AI/ML Integration",
];

export default function FundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="How We Fund Our Mission"
        description="Technical expertise that powers digital inclusion. Every service contract directly funds our programmes."
      />

      {/* How it works */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-wider mb-3 font-[family-name:var(--font-inter)]" style={{ color: "#6b7280" }}>The Model</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-6">
                Impact Through Expertise
              </h2>
              <p className="text-mid-gray text-lg leading-relaxed mb-4">
                Tek4All runs school tours, community training, youth clubs, and teacher programmes at no cost to beneficiaries. We fund this by offering our technical skills as commercial services.
              </p>
              <p className="text-mid-gray text-lg leading-relaxed">
                Every corporate training delivered, every LMS built, every product shipped. The revenue goes directly into funding the next cohort. When you work with us, you invest in a quality technical partner and a mission that matters.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "100%", label: "Revenue funds impact" },
                  { number: "5", label: "Service lines" },
                  { number: "1,850+", label: "Community members reached" },
                  { number: "545+", label: "People trained" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#f7f7f7" }}>
                    <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-near-black">{stat.number}</p>
                    <p className="text-xs text-mid-gray mt-1 font-[family-name:var(--font-inter)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#f7f7f7" }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]" style={{ color: "#6b7280" }}>Our Services</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-3">
              What We Build
            </h2>
            <p className="text-mid-gray text-lg max-w-2xl mx-auto">
              Five service lines that turn our technical expertise into sustainable impact.
            </p>
          </FadeIn>

          <div className="space-y-5">
            {SERVICES.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.06}>
                <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#0d141a" }}>
                        <svc.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black">{svc.title}</h3>
                          {svc.cta && (
                            <a href={svc.cta.href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium px-4 py-1.5 rounded-full font-[family-name:var(--font-inter)] inline-flex items-center gap-1 w-fit" style={{ backgroundColor: "#0d141a", color: "#fff" }}>
                              {svc.cta.label} <ArrowRight size={10} />
                            </a>
                          )}
                        </div>
                        <p className="text-mid-gray leading-relaxed mb-4">{svc.description}</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {svc.capabilities.map((cap) => (
                            <div key={cap} className="flex items-center gap-2 text-sm text-near-black/70">
                              <CheckCircle size={14} className="text-near-black/30 flex-shrink-0" />
                              {cap}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]" style={{ color: "#6b7280" }}>Technical Expertise</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-3">
              Our Stack
            </h2>
            <p className="text-mid-gray max-w-xl mx-auto">
              Production-grade tools and frameworks we use every day.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="px-5 py-2.5 rounded-full text-sm font-medium font-[family-name:var(--font-inter)] transition-colors hover:bg-near-black hover:text-white cursor-default" style={{ backgroundColor: "#f2f2f2", color: "#1d1e20" }}>
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
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
            <Link href="/contact" className="bg-white text-near-black px-8 py-4 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center justify-center gap-2">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
