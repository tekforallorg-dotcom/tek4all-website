import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, excerpt, seo_title, meta_description, cover_image_url")
    .eq("slug", slug)
    .single();
  if (!data) return { title: "Post Not Found" };
  return {
    title: data.seo_title || data.title,
    description: data.meta_description || data.excerpt || undefined,
    openGraph: data.cover_image_url ? { images: [data.cover_image_url] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) notFound();
  const post = data as BlogPost;

  return (
    <>
      {/* Hero */}
      <section className="bg-deep-black pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/50 text-sm font-[family-name:var(--font-inter)] hover:text-white/70 transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All Posts
            </Link>
            <div className="flex items-center gap-3 mb-4">
              {post.published_at && (
                <p className="text-white/50 text-sm font-[family-name:var(--font-inter)]">
                  {new Date(post.published_at).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {post.read_time && (
                <p className="text-white/30 text-sm font-[family-name:var(--font-inter)]">
                  {post.read_time}
                </p>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="mx-auto max-w-5xl px-6 -mt-4">
          <FadeIn>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      )}

      {/* Body */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <article className="prose prose-lg max-w-none text-mid-gray leading-relaxed">
              {post.body?.split("\n").map((paragraph, i) =>
                paragraph.trim() ? <p key={i}>{paragraph}</p> : null
              )}
            </article>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
