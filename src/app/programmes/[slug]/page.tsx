import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Programme } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("programmes")
    .select("title, short_description")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Programme Not Found" };

  return {
    title: data.title,
    description: data.short_description ?? undefined,
  };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("programmes")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) notFound();

  const programme = data as Programme;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-black pt-32 pb-20 md:pt-40 md:pb-28">
        {programme.cover_image_url && (
          <>
            <Image
              src={programme.cover_image_url}
              alt={programme.title}
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-deep-black/60" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-white/50 text-sm font-[family-name:var(--font-inter)] hover:text-white/70 transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All Programmes
            </Link>
            <span className="block bg-white/10 text-white text-xs font-medium font-[family-name:var(--font-inter)] px-3 py-1 rounded-full w-fit mb-4">
              {programme.category}
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
              {programme.title}
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              {programme.short_description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="md:col-span-2">
              <FadeIn>
                <div className="prose prose-lg max-w-none text-mid-gray leading-relaxed">
                  {programme.body?.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {programme.who_it_serves && (
                <FadeIn delay={0.1}>
                  <div className="bg-off-white rounded-2xl p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-near-black uppercase tracking-wider mb-2">
                      Who It Serves
                    </h3>
                    <p className="text-mid-gray text-sm leading-relaxed">
                      {programme.who_it_serves}
                    </p>
                  </div>
                </FadeIn>
              )}

              {programme.outcomes && (
                <FadeIn delay={0.2}>
                  <div className="bg-off-white rounded-2xl p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-near-black uppercase tracking-wider mb-2">
                      Outcomes
                    </h3>
                    <p className="text-mid-gray text-sm leading-relaxed">
                      {programme.outcomes}
                    </p>
                  </div>
                </FadeIn>
              )}

              <FadeIn delay={0.3}>
                <div className="bg-near-black rounded-2xl p-6 text-center">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-2">
                    Support This Programme
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Partner with us to scale this initiative.
                  </p>
                  <Link
                    href="/partnerships"
                    className="bg-white text-near-black px-6 py-2.5 rounded-full text-sm font-medium font-[family-name:var(--font-inter)] hover:bg-off-white transition-colors inline-flex items-center gap-2"
                  >
                    Partner <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
