import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Equal, Leaf, Eye, BookOpen, Zap, Heart, GraduationCap, School, Users, Building2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Tek4All's mission to bridge the digital divide in Nigeria through inclusive digital skills, AI literacy, and community empowerment.",
};

const VALUES = [
  { icon: Globe, title: "Inclusivity", description: "Working towards creating a level playing field for all." },
  { icon: Equal, title: "Equality", description: "Fostering equal access to technology education." },
  { icon: Leaf, title: "Sustainability", description: "Focusing on scalability and replicability for wider impact." },
  { icon: Eye, title: "Transparency", description: "Building trust with stakeholders and communities." },
  { icon: BookOpen, title: "Continuous Learning", description: "Building capacity for long-term self-sufficiency." },
  { icon: Zap, title: "Social Impact", description: "Unlocking technological, educational, and economic opportunities." },
];

const AUDIENCES = [
  { icon: Heart, title: "Women & Girls", description: "Bridging the gender gap in tech through digital skills and mentorship.", stat: "283+" },
  { icon: Users, title: "Children & Youth", description: "STEM education, digital skills, and mentorship for future tech leaders.", stat: "500+" },
  { icon: GraduationCap, title: "Teachers", description: "AI workflows and data skills to transform classroom delivery.", stat: "69+" },
  { icon: School, title: "Secondary Schools", description: "Integrating STEM into curricula with resources and training.", stat: "4" },
  { icon: Building2, title: "Low-income Communities", description: "Tech hubs, mentorship, career pathways, and connectivity.", stat: "1,850+" },
  { icon: Users, title: "NGOs & Programme Teams", description: "Tools, training, and systems for operational excellence.", stat: "—" },
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
      <PageHero
        eyebrow="About Tek4All"
        title="Bridging the Digital Divide, One Community at a Time"
        description="We equip underserved communities with future-ready digital skills, empowering individuals and organisations to thrive in the digital economy."
      />

      {/* Mission & Vision — editorial two-column */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 md:gap-0">
            {/* Mission */}
            <FadeIn>
              <div className="relative p-8 md:p-12 md:border-r border-b md:border-b-0 border-ash">
                <span className="inline-block text-[8rem] md:text-[10rem] font-bold font-[family-name:var(--font-heading)] text-light-gray leading-none select-none absolute top-4 left-6 md:left-10">
                  01
                </span>
                <div className="relative">
                  <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-4">
                    Our Mission
                  </p>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-4 leading-tight">
                    Equipping underserved communities with future-ready digital skills.
                  </h2>
                  <p className="text-mid-gray leading-relaxed">
                    A dedication to fair and equitable access to technology, empowering
                    all Nigerians to thrive through inclusive opportunities, digital
                    education, and connectivity, unlocking the potential of
                    marginalised populations and fostering inclusive socio-economic
                    development.
                  </p>
                </div>
              </div>
            </FadeIn>
            {/* Vision */}
            <FadeIn delay={0.15}>
              <div className="relative p-8 md:p-12">
                <span className="inline-block text-[8rem] md:text-[10rem] font-bold font-[family-name:var(--font-heading)] text-light-gray leading-none select-none absolute top-4 left-6 md:left-10">
                  02
                </span>
                <div className="relative">
                  <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-4">
                    Our Vision
                  </p>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-near-black mb-4 leading-tight">
                    An inclusive digital economy where everyone can thrive.
                  </h2>
                  <p className="text-mid-gray leading-relaxed">
                    To build a digitally empowered Nigeria, one community at a time,
                    where every individual has equitable access to the tools, skills,
                    and opportunities needed to realise their potential, secure
                    meaningful livelihoods, and drive inclusive growth.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Photo break */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/dWxBMoMroJirPV5w/d2153507-8151-4d70-9f30-306d831d9f67-m6LjXoZZ5xS54W87.jpg"
          alt="Tek4All community training session"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-black/20" />
      </section>

      {/* Values — with icons */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-3">
              Guiding Principles
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black">
              Our Values
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div className="bg-white rounded-2xl p-6 h-full border border-ash/50 hover:border-ash transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-near-black flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <v.icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-1.5">
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

      {/* Who We Serve — dark with stats */}
      <section className="relative bg-deep-black py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-charcoal/30 rounded-full blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-white/40 text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-3">
              Target Audience
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-3">
              Who We Serve
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Focusing on the critical leverage points in the ecosystem to drive
              sustainable inclusion.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIENCES.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.06}>
                <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 h-full hover:bg-white/[0.07] transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                      <a.icon size={18} className="text-white/70" />
                    </div>
                    <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white/20">
                      {a.stat}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-white mb-1.5">
                    {a.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-12">
            <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-[0.2em] mb-3">
              Leadership
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black">
              Our Team
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.04}>
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-light-gray">
                    {member.image_url && (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-near-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-near-black text-sm">
                    {member.name}
                  </h3>
                  <p className="text-mid-gray text-xs mt-0.5 font-[family-name:var(--font-inter)]">
                    {member.role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-deep-black py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-charcoal/40 rounded-full blur-[120px] translate-y-1/2 translate-x-1/4" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto mb-8">
              Partner with us, volunteer your skills, or support our programmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/partnerships"
                className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center justify-center gap-2"
              >
                Partner With Us <ArrowRight size={16} />
              </Link>
              <Link
                href="/volunteer"
                className="border border-white/20 text-white px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-white/5 transition-colors"
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
