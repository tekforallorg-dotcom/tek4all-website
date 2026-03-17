import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Programme } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Explore Tek4All's programmes: AI education, digital skills training, women empowerment, community Wi-Fi, teacher training, and more.",
};

const CATEGORIES = [
  "All",
  "Schools & Youth",
  "Women & Communities",
  "Systems Change",
  "Infrastructure & Access",
  "B2B",
];

export default async function ProgrammesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("programmes")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  const programmes = (data ?? []) as Programme[];

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Programmes"
        description="Targeted initiatives building digital skills at every level — from schools and communities to organisations and workforce teams."
      />

      {/* Programme Grid */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category tags (static — client filtering can be added later) */}
          <FadeIn className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="bg-white text-near-black text-sm font-medium font-[family-name:var(--font-inter)] px-4 py-2 rounded-full border border-ash"
              >
                {cat}
              </span>
            ))}
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((prog, i) => (
              <FadeIn key={prog.id} delay={i * 0.06}>
                <Link
                  href={
                    prog.slug === "corporate-training"
                      ? "/corporate-training"
                      : prog.slug === "moondesk"
                      ? "https://moondesk.tekforall.org"
                      : `/programmes/${prog.slug}`
                  }
                  className="group block bg-white rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-light-gray">
                    {prog.cover_image_url ? (
                      <Image
                        src={prog.cover_image_url}
                        alt={prog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-mid-gray/30 font-[family-name:var(--font-heading)] text-lg">
                          {prog.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-near-black text-xs font-medium font-[family-name:var(--font-inter)] px-3 py-1 rounded-full">
                        {prog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-near-black mb-2 group-hover:text-charcoal transition-colors">
                      {prog.title}
                    </h2>
                    <p className="text-mid-gray text-sm leading-relaxed line-clamp-3 mb-4">
                      {prog.short_description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-near-black text-sm font-medium font-[family-name:var(--font-inter)] group-hover:gap-2 transition-all">
                      Learn more <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
