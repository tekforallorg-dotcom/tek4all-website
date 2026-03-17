import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "News, stories, and updates from Tek4All's community and programmes.",
};

export default async function BlogPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];

  return (
    <>
      <PageHero
        eyebrow="Stories & Updates"
        title="Blog"
        description="News, stories, and updates from our community."
      />

      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <p className="text-mid-gray text-lg mb-2">No posts yet.</p>
                <p className="text-mid-gray/60 text-sm">
                  Blog posts will appear here once published from the admin panel.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-light-gray">
                      {post.cover_image_url ? (
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-mid-gray/30 font-[family-name:var(--font-heading)]">
                            Tek4All
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {post.published_at && (
                          <p className="text-mid-gray text-xs font-[family-name:var(--font-inter)]">
                            {new Date(post.published_at).toLocaleDateString("en-NG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        )}
                        {post.read_time && (
                          <p className="text-mid-gray/50 text-xs font-[family-name:var(--font-inter)]">
                            {post.read_time}
                          </p>
                        )}
                      </div>
                      <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-2 group-hover:text-charcoal transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-mid-gray text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
