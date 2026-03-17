import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Wifi, Users, Brain, BarChart3, Shield, Sparkles, ChevronRight, Instagram, Linkedin, ExternalLink } from "lucide-react";
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

const B2B_SERVICES = [
  { icon: Brain, title: "AI for Work & Operations", description: "Streamlining workflows and automating routine tasks for operational efficiency." },
  { icon: BarChart3, title: "Data Literacy & Dashboards", description: "Turning raw data into actionable insights and visual stories." },
  { icon: Sparkles, title: "Change Enablement", description: "Strategies to drive adoption and manage the cultural shift to digital." },
  { icon: Shield, title: "Responsible & Secure AI", description: "Navigating ethics, privacy, and security in the age of intelligence." },
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

/* ============================================
   PAGE — fetches all dynamic content
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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/dWxBMoMroJirPV5w/shutterstock_1237754227-scaled-copy-d957rrLebWFzK6g2.jpg"
          alt="Children learning with technology"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,20,26,0.35)" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center text-white pt-20">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 max-w-4xl mx-auto">
            Skilling Lives,<br />Uplifting Minds
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Equipping underserved communities and organisations with the digital skills and tools to thrive in the AI era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programmes" className="bg-white text-near-black px-8 py-4 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors text-base">
              Our Programmes
            </Link>
            <Link href="/partnerships" className="border border-white/40 text-white px-8 py-4 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-white/10 transition-colors text-base">
              Partner With Us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS (from Supabase) ===== */}
      {stats.length > 0 && (
        <section style={{ backgroundColor: "#0d141a" }} className="py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {stats.map((stat) => (
                <StatCounter key={stat.id} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== THREE PILLARS ===== */}
      <section style={{ backgroundColor: "#f7f7f7" }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">What We Do</h2>
            <p className="text-mid-gray max-w-2xl mx-auto text-lg">Three pillars driving sustainable digital inclusion for communities and organisations across Nigeria.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {THREE_PILLARS.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "#111" }}>
                    <pillar.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-3">{pillar.title}</h3>
                  <p className="text-mid-gray mb-4 leading-relaxed">{pillar.description}</p>
                  <p className="text-sm font-medium font-[family-name:var(--font-inter)]" style={{ color: "rgba(17,17,17,0.6)" }}>{"\u2192"} {pillar.outcome}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMMES (from Supabase) ===== */}
      {programmes.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Our Programmes</h2>
                <p className="text-mid-gray text-lg">Targeted initiatives building skills at every level.</p>
              </div>
              <Link href="/programmes" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
                View All <ArrowRight size={16} />
              </Link>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programmes.slice(0, 4).map((prog, i) => (
                <FadeIn key={prog.id} delay={i * 0.1}>
                  <Link
                    href={prog.slug === "corporate-training" ? "/corporate-training" : prog.slug === "moondesk" ? "https://moondesk.tekforall.org" : `/programmes/${prog.slug}`}
                    className="group block rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {prog.cover_image_url ? (
                        <Image src={prog.cover_image_url} alt={prog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#e5e5e5" }}>
                          <span className="text-mid-gray/40 font-[family-name:var(--font-heading)]">{prog.title}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="text-near-black text-xs font-medium font-[family-name:var(--font-inter)] px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
                          {prog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2">{prog.title}</h3>
                      <p className="text-mid-gray text-sm leading-relaxed line-clamp-2">{prog.short_description}</p>
                      <span className="inline-flex items-center gap-1 text-near-black text-sm font-medium font-[family-name:var(--font-inter)] mt-3 group-hover:gap-2 transition-all">
                        Learn more <ChevronRight size={14} />
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
      <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #0d141a 0%, #1d1e20 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-10">
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-3">Youth Journey</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">Schools to Innovation Pipeline</h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="max-w-2xl mx-auto text-lg">A structured pathway from first spark to career readiness.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PIPELINE_STEPS.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.12}>
                <div className="rounded-2xl p-6 h-full transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>{s.step}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mt-4 mb-2">{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm leading-relaxed">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/partnerships" className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
              Bring Tek4All to Your School <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== B2B CORPORATE TRAINING ===== */}
      <section style={{ backgroundColor: "#f7f7f7" }} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-mid-gray text-xs font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-2">B2B Services</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Corporate Training</h2>
              <p className="text-mid-gray text-lg max-w-xl">Upskill your workforce with practical AI, data, and digital transformation training.</p>
            </div>
            <Link href="/corporate-training" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {B2B_SERVICES.map((svc, i) => (
              <FadeIn key={svc.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#f2f2f2" }}>
                    <svc.icon size={20} className="text-near-black" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2">{svc.title}</h3>
                  <p className="text-mid-gray text-sm leading-relaxed">{svc.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOONDESK TEASER ===== */}
      <section className="relative" style={{ backgroundColor: "#0d141a" }}>
        {/* Subtle ambient glow */}
        <div className="absolute pointer-events-none" style={{ top: "20%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(50,55,65,0.4) 0%, transparent 70%)" }} aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:pt-20 md:pb-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
            {/* Text */}
            <FadeIn>
              <div className="lg:sticky lg:top-32 lg:py-8">
                <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }} className="mb-3">Product</p>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-2">MoonDesk</h2>
                <p className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-medium mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>AI-Powered Programme Management</p>
                <p style={{ color: "rgba(255,255,255,0.5)" }} className="mb-6 leading-relaxed">Built for NGOs, programme teams, and mission-driven organisations.</p>
                <ul className="space-y-3 mb-8">
                  {["Clear ownership and timelines", "Task completion with evidence linked to work", "AI assistant that understands your programmes", "CRM and opportunity tracking built in"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="https://moondesk.tekforall.org" target="_blank" rel="noopener noreferrer" className="bg-white text-near-black px-7 py-3 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2 text-sm">
                    Book a Demo <ArrowRight size={14} />
                  </a>
                  <a href="https://moondesk.tekforall.org" target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-full font-medium font-[family-name:var(--font-inter)] text-sm inline-flex items-center gap-2 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
                    Explore Features
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Product mockup — phone pops out below section */}
            <FadeIn delay={0.2}>
              <div className="relative" style={{ marginBottom: "-80px" }}>
                <Image
                  src="/images/moondesk-preview.png"
                  alt="MoonDesk dashboard — desktop and mobile"
                  width={800}
                  height={600}
                  className="w-full h-auto block relative"
                  style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))" }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== GALLERY TEASER (from Supabase or fallback) ===== */}
      <section className="bg-white py-16 md:py-20" style={{ paddingTop: "120px" }}>
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Our Impact in Pictures</h2>
              <p className="text-mid-gray text-lg">Moments from our programmes across Nigeria.</p>
            </div>
            <Link href="/gallery" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
              View Gallery <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_FALLBACK.map((img, i) => (
              <FadeIn key={img} delay={i * 0.08}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image src={`${ZYRO_BASE}${img}`} alt="Tek4All community programme" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 group-hover:bg-near-black/20 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOG (from Supabase) ===== */}
      {blogPosts.length > 0 && (
        <section style={{ backgroundColor: "#f7f7f7" }} className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Latest from Tek4All</h2>
                <p className="text-mid-gray text-lg">News, stories, and updates from our community.</p>
              </div>
              <Link href="/blog" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
                Read All <ArrowRight size={16} />
              </Link>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.12}>
                  <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden h-full" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: "#f2f2f2" }}>
                      {post.cover_image_url && (
                        <Image src={post.cover_image_url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>
                    <div className="p-6">
                      {post.published_at && (
                        <p className="text-mid-gray text-xs font-[family-name:var(--font-inter)] mb-2">
                          {new Date(post.published_at).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      )}
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2 line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="text-mid-gray text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>}
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
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="text-center mb-8">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">Follow Our Journey</h2>
              <p className="text-mid-gray text-lg">Stay connected on Instagram and LinkedIn.</p>
            </FadeIn>
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialPosts.slice(0, 4).map((post) => (
                  <a
                    key={post.id}
                    href={post.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden relative"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <div className="relative aspect-square">
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.excerpt || "Social post"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {post.platform === "instagram" ? <Instagram size={32} className="text-mid-gray/30" /> : <Linkedin size={32} className="text-mid-gray/30" />}
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/40 transition-colors flex items-center justify-center">
                        <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {/* Platform badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full font-[family-name:var(--font-inter)] capitalize" style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
                          {post.platform}
                        </span>
                      </div>
                    </div>
                    {post.excerpt && (
                      <div className="p-3">
                        <p className="text-mid-gray text-xs line-clamp-2">{post.excerpt}</p>
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
        <section className="py-14 md:py-16" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #f2f2f2", borderBottom: "1px solid #f2f2f2" }}>
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="text-center mb-8">
              <p className="text-xs font-medium uppercase mb-2" style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.15em", color: "rgba(0,0,0,0.35)" }}>Trusted By</p>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold" style={{ color: "#111" }}>Our Partners & Supporters</h2>
            </FadeIn>
            <div className="flex items-center justify-center gap-10 md:gap-14 flex-wrap">
              {partners.map((partner) => (
                <FadeIn key={partner.id}>
                  {partner.website_url ? (
                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block opacity-60 hover:opacity-100 transition-opacity" title={partner.name}>
                      <div className="relative h-12 w-28 md:w-32">
                        <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" />
                      </div>
                    </a>
                  ) : (
                    <div className="opacity-60" title={partner.name}>
                      <div className="relative h-12 w-28 md:w-32">
                        <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" />
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
