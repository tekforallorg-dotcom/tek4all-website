import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Tek4All's mission to bridge the digital divide in Nigeria through inclusive digital skills, AI literacy, and community empowerment.",
};

const VALUES = [
  { title: "Inclusivity", description: "Working towards creating a level playing field for all." },
  { title: "Equality", description: "Fostering equal access to technology education." },
  { title: "Sustainability", description: "Focusing on scalability and replicability for wider impact." },
  { title: "Transparency", description: "Building trust with stakeholders and communities." },
  { title: "Continuous Learning", description: "Building capacity for long-term self-sufficiency." },
  { title: "Social Impact", description: "Unlocking technological, educational, and economic opportunities." },
];

const AUDIENCES = [
  { title: "Women & Girls", description: "Bridging the gender gap in tech through digital skills and mentorship." },
  { title: "Children & Youth", description: "STEM education, digital skills, and mentorship for future tech leaders." },
  { title: "Teachers", description: "AI workflows and data skills to transform classroom delivery." },
  { title: "Secondary Schools", description: "Integrating STEM into curricula with resources and training." },
  { title: "Low-income Communities", description: "Tech hubs, mentorship, career pathways, and connectivity." },
  { title: "NGOs & Programme Teams", description: "Tools, training, and systems for operational excellence." },
];

export default async function AboutPage() {
  const supabase = await createServerSupabaseClient();
  const { data: team } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order");

  const teamMembers = (team ?? []) as TeamMember[];

  return (
    <>
      {/* Hero */}
      <section className="bg-deep-black pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-white/50 text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-4">
              About Tek4All
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
              Bridging the Digital Divide, One Community at a Time
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              We equip underserved communities with future-ready digital skills,
              empowering individuals and organisations to thrive in the digital economy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <p className="text-mid-gray text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-3">
                Our Mission
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-4">
                Equipping underserved communities with future-ready digital skills.
              </h2>
              <p className="text-mid-gray leading-relaxed text-lg">
                A dedication to fair and equitable access to technology, empowering
                all Nigerians to thrive through inclusive opportunities, digital
                education, and connectivity — unlocking the potential of
                marginalised populations and fostering inclusive socio-economic
                development.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-mid-gray text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-3">
                Our Vision
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-4">
                An inclusive digital economy where everyone can thrive.
              </h2>
              <p className="text-mid-gray leading-relaxed text-lg">
                To build a digitally empowered Nigeria, one community at a time,
                where every individual has equitable access to the tools, skills,
                and opportunities needed to realise their potential, secure
                meaningful livelihoods, and drive a culture of lifelong learning,
                innovation, and inclusive growth.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">
              Our Values
            </h2>
            <p className="text-mid-gray text-lg max-w-xl mx-auto">
              The DNA of our culture and the foundation of our impact.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full shadow-sm">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2">
                    {v.title}
                  </h3>
                  <p className="text-mid-gray text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="gradient-dark py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Focusing on the critical leverage points in the ecosystem to drive
              sustainable inclusion.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIENCES.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-2">
                    {a.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">
              Our Team
            </h2>
            <p className="text-mid-gray text-lg max-w-xl mx-auto">
              The dedicated people behind Tek4All&apos;s mission.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.06}>
                <div className="text-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-light-gray">
                    {member.image_url && (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-near-black text-sm">
                    {member.name}
                  </h3>
                  <p className="text-mid-gray text-xs mt-1">
                    {member.role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-mid-gray text-lg max-w-xl mx-auto mb-8">
              Partner with us, volunteer your skills, or support our programmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partnerships"
                className="bg-near-black text-white px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-charcoal transition-colors inline-flex items-center gap-2"
              >
                Partner With Us <ArrowRight size={16} />
              </Link>
              <Link
                href="/volunteer"
                className="border border-near-black text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-near-black hover:text-white transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
