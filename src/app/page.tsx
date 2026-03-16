import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Monitor, Wifi, Users, Brain, BarChart3, Shield, Sparkles, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { StatCounter } from "@/components/ui/StatCounter";

/* ============================================
   STATIC DATA (will be replaced with Supabase fetches)
   ============================================ */

const IMPACT_STATS = [
  { value: "1,850+", label: "Community Members" },
  { value: "545+", label: "People Trained" },
  { value: "4", label: "Schools Reached" },
  { value: "69", label: "Teachers Trained" },
  { value: "283", label: "Women Trained" },
  { value: "4", label: "Programmes Delivered" },
];

const THREE_PILLARS = [
  {
    icon: Users,
    title: "Community Digital Inclusion",
    description: "Bridging the digital divide through targeted education and hands-on community engagement initiatives.",
    outcome: "Practical skills, confidence, real projects.",
  },
  {
    icon: Wifi,
    title: "Systems & Infrastructure",
    description: "Establishing the physical connectivity and hardware foundations necessary for sustainable access.",
    outcome: "Connectivity, access, safe learning spaces.",
  },
  {
    icon: Monitor,
    title: "Workforce Enablement",
    description: "Empowering organisations with the tools, training, and workflows to adopt digital systems.",
    outcome: "Adoption-focused training and tools.",
  },
];

const FEATURED_PROGRAMMES = [
  {
    slug: "ai4all-school-tours",
    title: "AI4All School Tours",
    category: "Schools & Youth",
    description: "Hands-on school visits introducing AI literacy and ethics to students where they are.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/img_6095-AVLxOx9ROXHxbl2N.jpg",
  },
  {
    slug: "women-in-tek",
    title: "Women-in-Tek",
    category: "Women & Communities",
    description: "AI and digital literacy upskilling for girls and women to earn meaningful income.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/women-in-tek-YNqBgaVlb5hJW2gV.jpg",
  },
  {
    slug: "tek4teachers",
    title: "Tek4Teachers",
    category: "Systems Change",
    description: "Empowering educators with AI workflows and data skills to transform classroom delivery.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/img_6206-m7VDzDbQJgUjkMKr.jpg",
  },
  {
    slug: "nextgen-innovators",
    title: "NextGen Innovators",
    category: "Schools & Youth",
    description: "Coding, robotics, and STEM education nurturing the next generation of tech leaders.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/mobile-hero-A85Erp5VXQF3NNra.jpg",
  },
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

const GALLERY_IMAGES = [
  "13947a-AMqlapqPxVI5D5aD.jpg",
  "d2153507-8151-4d70-9f30-306d831d9f67-m6LjXoZZ5xS54W87.jpg",
  "img_0169-AGB2RoRrZ8T5xn39.JPG",
  "img_6206-m7VDzDbQJgUjkMKr.jpg",
  "women-in-tek-YNqBgaVlb5hJW2gV.jpg",
  "img_6095-AVLxOx9ROXHxbl2N.jpg",
];

const ZYRO_BASE = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/dWxBMoMroJirPV5w/";

/* ============================================
   PAGE COMPONENT
   ============================================ */

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/dWxBMoMroJirPV5w/shutterstock_1237754227-scaled-copy-d957rrLebWFzK6g2.jpg"
          alt="Children learning with technology"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-deep-black/30" />

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

      {/* ===== IMPACT STATS ===== */}
      <section className="bg-deep-black py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {IMPACT_STATS.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== THREE PILLARS ===== */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">What We Do</h2>
            <p className="text-mid-gray max-w-2xl mx-auto text-lg">Three pillars driving sustainable digital inclusion for communities and organisations across Nigeria.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {THREE_PILLARS.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-near-black rounded-xl flex items-center justify-center mb-6">
                    <pillar.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-3">{pillar.title}</h3>
                  <p className="text-mid-gray mb-4 leading-relaxed">{pillar.description}</p>
                  <p className="text-sm font-medium text-near-black/70 font-[family-name:var(--font-inter)]">{"\u2192"} {pillar.outcome}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMMES SNAPSHOT ===== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Our Programmes</h2>
              <p className="text-mid-gray text-lg">Targeted initiatives building skills at every level.</p>
            </div>
            <Link href="/programmes" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PROGRAMMES.map((prog, i) => (
              <FadeIn key={prog.slug} delay={i * 0.1}>
                <Link href={`/programmes/${prog.slug}`} className="group block bg-light-gray rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={prog.image} alt={prog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-near-black text-xs font-medium font-[family-name:var(--font-inter)] px-3 py-1 rounded-full">{prog.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2 group-hover:text-charcoal transition-colors">{prog.title}</h3>
                    <p className="text-mid-gray text-sm leading-relaxed line-clamp-2">{prog.description}</p>
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

      {/* ===== SCHOOLS PIPELINE ===== */}
      <section className="gradient-dark py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-white/50 text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-3">Youth Journey</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">Schools to Innovation Pipeline</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">A structured pathway from first spark to career readiness.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PIPELINE_STEPS.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.12}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors">
                  <span className="text-white/30 font-[family-name:var(--font-heading)] text-5xl font-bold">{s.step}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mt-4 mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-12">
            <Link href="/partnerships" className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
              Bring Tek4All to Your School <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== B2B CORPORATE TRAINING ===== */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-mid-gray text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-2">B2B Services</p>
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
                <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-light-gray rounded-xl flex items-center justify-center mb-5">
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
      <section className="bg-deep-black py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-white/50 text-sm font-medium font-[family-name:var(--font-inter)] uppercase tracking-wider mb-3">Product</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">MoonDesk</h2>
              <p className="text-white/70 text-xl mb-6 leading-relaxed">AI-powered programme management built for NGOs, programme teams, and mission-driven organisations.</p>
              <ul className="space-y-4 mb-8">
                {["Programmes & workstreams — structured, manageable hierarchies", "Task management — assign, track, and report in real time", "Evidence & attachments — link proof of impact directly to tasks", "Reporting dashboards — high-visibility views across all projects"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/moondesk" className="bg-white text-near-black px-8 py-3.5 rounded-full font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2">
                Learn More <ArrowRight size={16} />
              </Link>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                <p className="text-white/30 font-[family-name:var(--font-heading)] text-lg text-center">
                  MoonDesk Dashboard Preview<br /><span className="text-sm text-white/20">Coming soon</span>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== GALLERY TEASER ===== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Our Impact in Pictures</h2>
              <p className="text-mid-gray text-lg">Moments from our programmes across Nigeria.</p>
            </div>
            <Link href="/gallery" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
              View Gallery <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <FadeIn key={img} delay={i * 0.08}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image src={`${ZYRO_BASE}${img}`} alt="Tek4All community programme" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/20 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOG ===== */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-2">Latest from Tek4All</h2>
              <p className="text-mid-gray text-lg">News, stories, and updates from our community.</p>
            </div>
            <Link href="/blog" className="flex items-center gap-2 text-near-black font-medium font-[family-name:var(--font-inter)] hover:gap-3 transition-all">
              Read All <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Bwari Pilot Tech Hub: Bridging the Digital Divide Through Education", excerpt: "Launching mid-2025, this groundbreaking facility in Bwari will offer free hands-on training in coding, digital literacy, and AI.", date: "May 8, 2024" },
              { title: "Join Tek4All as a Volunteer — Make an Impact from Anywhere", excerpt: "Whether you are a tech expert, educator, writer, or community leader, your skills can help empower communities.", date: "May 8, 2024" },
              { title: "AI4All School Tours Launch Announcement", excerpt: "Bringing hands-on AI demonstrations directly to secondary schools across Abuja.", date: "Coming Soon" },
            ].map((post, i) => (
              <FadeIn key={post.title} delay={i * 0.12}>
                <div className="bg-white rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-light-gray aspect-[16/9]" />
                  <div className="p-6">
                    <p className="text-mid-gray text-xs font-[family-name:var(--font-inter)] mb-2">{post.date}</p>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-mid-gray text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL FEED ===== */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-near-black mb-4">Follow Our Journey</h2>
            <p className="text-mid-gray text-lg">Stay connected on Instagram and LinkedIn.</p>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-light-gray rounded-2xl aspect-square flex items-center justify-center">
                  <p className="text-mid-gray/40 text-sm font-[family-name:var(--font-inter)] text-center px-4">Social post<br /><span className="text-xs">Managed from admin</span></p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PARTNER SLIDER ===== */}
      <section className="gradient-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-2">Our Partners & Supporters</h2>
            <p className="text-white/50 text-sm">Logos managed from admin panel</p>
          </FadeIn>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white/20 text-xs font-[family-name:var(--font-inter)]">Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
