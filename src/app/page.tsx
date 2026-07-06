import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Wifi, Users, ChevronRight, Instagram, Linkedin, ExternalLink, GraduationCap, BookOpen, Bot, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { StatCounter } from "@/components/ui/StatCounter";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ImpactStat, Programme, SocialPost, PartnerLogo, BlogPost } from "@/lib/types";

// Revalidate every 60s so admin changes appear quickly
export const revalidate = 60;

/* ============================================
   STRUCTURAL CONSTANTS (not CMS-managed)
   ============================================ */

const THREE_PILLARS = [
  { icon: Users, title: "Community Digital Inclusion", description: "Bridging the digital divide through targeted education and hands-on community engagement initiatives.", outcome: "Practical skills, confidence, real projects." },
  { icon: Wifi, title: "Systems & Infrastructure", description: "Establishing the physical connectivity and hardware foundations necessary for sustainable access.", outcome: "Connectivity, access, safe learning spaces." },
  { icon: Monitor, title: "Workforce Enablement", description: "Empowering organisations with the tools, training, and workflows to adopt digital systems.", outcome: "Adoption-focused training and tools." },
];

const PIPELINE_STEPS = [
  { step: "01", title: "AI4All School Tours", description: "Sparking interest through hands-on demos and introductory workshops at scale." },
  { step: "02", title: "NextGen AI Club", description: "Structured learning communities for students to deepen skills and practice regularly." },
  { step: "03", title: "Projects / Festival", description: "Applying skills to solve community problems and showcasing at the AI4Good Festival." },
  { step: "04", title: "Innovation Pathway", description: "Advanced mentorship, internships, and career readiness for top talent." },
];

const SABITEK_FEATURES = [
  { icon: GraduationCap, label: "Structured courses & cohorts" },
  { icon: Bot, label: "AI-powered learning tools" },
  { icon: Award, label: "Verifiable certificates" },
  { icon: BookOpen, label: "Smart quiz generation" },
];

const ZYRO_BASE = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/";
const GALLERY_FALLBACK = [
  "13947a-AMqlapqPxVI5D5aD.jpg",
  "d2153507-8151-4d70-9f30-306d831d9f67-m6LjXoZZ5xS54W87.jpg",
  "img_0169-AGB2RoRrZ8T5xn39.JPG",
  "img_6206-m7VDzDbQJgUjkMKr.jpg",
  "women-in-tek-YNqBgaVlb5hJW2gV.jpg",
  "img_6095-AVLxOx9ROXHxbl2N.jpg",
];

/* Shared header action: quiet bordered pill, lifts on hover */
function SectionAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-11 items-center gap-2 self-start rounded-full border border-pale-silver bg-white px-6 text-sm font-medium tracking-tight text-graphite font-ui transition-all duration-300 hover:border-steel hover:shadow-soft md:self-auto"
    >
      {children}
      <ArrowRight size={15} className="text-dark-steel transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ============================================
   PAGE - fetches all dynamic content
   ============================================ */

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  // Parallel fetches
  const [statsRes, programmesRes, socialRes, partnersRes, blogRes] = await Promise.all([
    supabase.from("impact_stats").select("*").eq("is_visible", true).order("sort_order"),
    supabase.from("programmes").select("*").eq("is_published", true).eq("is_featured", true).order("sort_order"),
    supabase.from("social_posts").select("*").eq("is_visible", true).order("sort_order").limit(8),
    supabase.from("partner_logos").select("*").eq("is_visible", true).order("sort_order"),
    supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(3),
  ]);

  const stats = (statsRes.data ?? []) as ImpactStat[];
  const programmes = (programmesRes.data ?? []) as Programme[];
  const socialPosts = (socialRes.data ?? []) as SocialPost[];
  const partners = (partnersRes.data ?? []) as PartnerLogo[];
  const blogPosts = (blogRes.data ?? []) as BlogPost[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-matte-black">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/dWxBMoMroJirPV5w/shutterstock_1237754227-scaled-copy-d957rrLebWFzK6g2.jpg"
          alt="Children learning with technology"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Layered overlay: quiet at the top, matte black where the type sits */}
        <div className="absolute inset-0 gradient-hero" aria-hidden="true" />
        <div className="absolute inset-0 bg-matte-black/20" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-44 md:pb-32">
          <h1 className="mb-6 max-w-4xl font-heading text-[clamp(2.9rem,7.5vw,5.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            Skilling Lives,<br />Uplifting Minds
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            Equipping underserved communities and organisations with the digital skills and tools to thrive in the AI era.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/programmes"
              className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-medium text-matte-black font-ui transition-all duration-300 hover:bg-soft-white hover:shadow-cta"
            >
              Our Programmes
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/partnerships"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/35 px-8 text-[15px] font-medium text-white font-ui backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
            >
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Scroll cue: hairline track with a falling dot */}
        <div className="absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 md:block" aria-hidden="true">
          <div className="relative h-12 w-px overflow-hidden bg-white/20">
            <div
              className="absolute left-0 top-0 h-4 w-px bg-white/90"
              style={{ animation: "scroll-cue 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS (from Supabase) ===== */}
      {stats.length > 0 && (
        <section className="border-b border-pale-silver bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0 lg:divide-x lg:divide-pale-silver">
              {stats.map((stat) => (
                <div key={stat.id} className="px-3">
                  <StatCounter value={stat.value} label={stat.label} tone="light" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== THREE PILLARS ===== */}
      <section className="bg-soft-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 max-w-2xl">
            <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-graphite md:text-[2.6rem]">What We Do</h2>
            <p className="text-lg leading-relaxed text-dark-steel">Three pillars driving sustainable digital inclusion for communities and organisations across Nigeria.</p>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {THREE_PILLARS.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.12} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] border border-pale-silver bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[14px] bg-graphite text-white">
                    <pillar.icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-graphite">{pillar.title}</h3>
                  <p className="mb-6 leading-relaxed text-dark-steel">{pillar.description}</p>
                  <p className="mt-auto flex gap-2 border-t border-pale-silver pt-5 text-sm font-medium text-dark-steel font-ui">
                    <span aria-hidden="true">{"→"}</span> {pillar.outcome}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMMES (from Supabase) ===== */}
      {programmes.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-graphite md:text-[2.6rem]">Our Programmes</h2>
                <p className="text-lg text-dark-steel">Targeted initiatives building skills at every level.</p>
              </div>
              <SectionAction href="/programmes">View All</SectionAction>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programmes.slice(0, 4).map((prog, i) => (
                <FadeIn key={prog.id} delay={i * 0.1} className="h-full">
                  <Link
                    href={`/programmes/${prog.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-pale-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-light-gray">
                      {prog.cover_image_url ? (
                        <Image
                          src={prog.cover_image_url}
                          alt={prog.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-pale-silver">
                          <span className="font-heading text-steel">{prog.title}</span>
                        </div>
                      )}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-graphite font-ui backdrop-blur-md">
                          {prog.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-heading text-lg font-semibold text-graphite">{prog.title}</h3>
                      <p className="text-sm leading-relaxed text-dark-steel line-clamp-2">{prog.short_description}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-graphite font-ui">
                        Learn more
                        <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SCHOOLS PIPELINE ===== */}
      <section className="gradient-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 flex flex-col items-center text-center">
            <p className="section-label mb-5 text-steel">Youth Journey</p>
            <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-white md:text-[2.6rem]">Schools to Innovation Pipeline</h2>
            <p className="max-w-2xl text-lg text-white/60">A structured pathway from first spark to career readiness.</p>
          </FadeIn>

          {/* Timeline: hairline runs behind the numbered beads on desktop */}
          <div className="relative">
            <div className="absolute left-[8%] right-[8%] top-[26px] hidden h-px bg-white/10 lg:block" aria-hidden="true" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {PIPELINE_STEPS.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="relative z-10 mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-graphite font-heading text-sm font-semibold tracking-widest text-steel">
                      {s.step}
                    </div>
                    <div className="flex-1 rounded-[22px] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]">
                      <h3 className="mb-2.5 font-heading text-lg font-semibold text-white">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{s.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn className="mt-14 text-center">
            <Link
              href="/partnerships"
              className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-medium text-matte-black font-ui transition-all duration-300 hover:bg-soft-white hover:shadow-cta"
            >
              Bring Tek4All to Your School
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== SABITEK - LEARNING INFRASTRUCTURE ===== */}
      <section className="bg-soft-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[28px] bg-matte-black px-6 py-14 shadow-panel sm:px-10 md:px-14 md:py-20 lg:px-16">
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(70,75,82,0.35) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="section-label mb-5 text-steel">Learning Infrastructure</p>
                  <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-white md:text-[2.6rem]">Sabitek</h2>
                  <p className="mb-6 font-heading text-lg font-medium text-white/70 md:text-xl">Structured Learning, Powered by AI</p>
                  <p className="mb-8 max-w-lg leading-relaxed text-white/60">
                    The learning infrastructure we use to deliver training cohorts, run structured programmes, and ensure continuous learning across our communities.
                  </p>
                  <div className="mb-10 grid gap-3 sm:grid-cols-2">
                    {SABITEK_FEATURES.map((f) => (
                      <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                        <f.icon size={16} strokeWidth={1.8} className="shrink-0 text-white/60" aria-hidden="true" />
                        <span className="text-sm leading-snug text-white/75">{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://sabitek.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-matte-black font-ui transition-all duration-300 hover:bg-soft-white hover:shadow-cta"
                    >
                      Get Started
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href="https://sabitek.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center rounded-full border border-white/20 px-7 text-sm font-medium text-white/80 font-ui transition-colors duration-300 hover:border-white/50 hover:text-white"
                    >
                      Explore Platform
                    </a>
                  </div>
                </div>

                <FadeIn delay={0.15} direction="none">
                  <div className="relative">
                    <Image
                      src="/images/sabitek-preview.png"
                      alt="Sabitek learning platform on desktop and mobile"
                      width={900}
                      height={650}
                      className="block h-auto w-full rounded-xl"
                      style={{ filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))" }}
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== GALLERY TEASER (from Supabase or fallback) ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-graphite md:text-[2.6rem]">Our Impact in Pictures</h2>
              <p className="text-lg text-dark-steel">Moments from our programmes across Nigeria.</p>
            </div>
            <SectionAction href="/gallery">View Gallery</SectionAction>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {GALLERY_FALLBACK.map((img, i) => (
              <FadeIn key={img} delay={i * 0.06}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[18px] bg-light-gray">
                  <Image
                    src={`${ZYRO_BASE}${img}`}
                    alt="Tek4All community programme"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOG (from Supabase) ===== */}
      {blogPosts.length > 0 && (
        <section className="bg-soft-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-graphite md:text-[2.6rem]">Latest from Tek4All</h2>
                <p className="text-lg text-dark-steel">News, stories, and updates from our community.</p>
              </div>
              <SectionAction href="/blog">Read All</SectionAction>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {blogPosts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.1} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-pale-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative aspect-video overflow-hidden bg-light-gray">
                      {post.cover_image_url && (
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      {post.published_at && (
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-dark-steel font-ui">
                          {new Date(post.published_at).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      )}
                      <h3 className="mb-2.5 font-heading text-lg font-semibold leading-snug text-graphite line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="text-sm leading-relaxed text-dark-steel line-clamp-3">{post.excerpt}</p>}
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SOCIAL FEED (from Supabase) ===== */}
      {socialPosts.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-12 text-center">
              <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-graphite md:text-[2.6rem]">Follow Our Journey</h2>
              <p className="text-lg text-dark-steel">Stay connected on Instagram and LinkedIn.</p>
            </FadeIn>
            <FadeIn>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {socialPosts.slice(0, 4).map((post) => (
                  <a
                    key={post.id}
                    href={post.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-[18px] border border-pale-silver bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative aspect-square bg-soft-white">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.excerpt || "Social post"}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        /* Intentional placeholder: quiet bordered chip on soft white */
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-pale-silver bg-white text-dark-steel shadow-soft">
                            {post.platform === "instagram" ? <Instagram size={22} strokeWidth={1.6} /> : <Linkedin size={22} strokeWidth={1.6} />}
                          </span>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-matte-black/0 transition-colors duration-300 group-hover:bg-matte-black/40">
                        <ExternalLink size={20} className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      {/* Platform badge */}
                      <div className="absolute left-3.5 top-3.5">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-graphite font-ui backdrop-blur-md">
                          {post.platform}
                        </span>
                      </div>
                    </div>
                    {post.excerpt && (
                      <div className="border-t border-pale-silver p-3.5">
                        <p className="text-xs leading-relaxed text-dark-steel line-clamp-2">{post.excerpt}</p>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ===== PARTNER LOGOS (from Supabase) ===== */}
      {partners.length > 0 && (
        <section className="border-y border-pale-silver bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-12 text-center">
              <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-dark-steel font-ui">Trusted By</p>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-graphite md:text-3xl">Our Partners &amp; Supporters</h2>
            </FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 md:gap-x-20">
              {partners.map((partner) => (
                <FadeIn key={partner.id}>
                  {partner.website_url ? (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                      title={partner.name}
                    >
                      <div className="relative h-12 w-28 md:w-32">
                        <Image src={partner.logo_url} alt={partner.name} fill sizes="128px" className="object-contain" />
                      </div>
                    </a>
                  ) : (
                    <div className="opacity-55 grayscale" title={partner.name}>
                      <div className="relative h-12 w-28 md:w-32">
                        <Image src={partner.logo_url} alt={partner.name} fill sizes="128px" className="object-contain" />
                      </div>
                    </div>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
