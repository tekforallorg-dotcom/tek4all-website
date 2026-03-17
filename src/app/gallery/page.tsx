import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { GalleryAlbum } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and moments from Tek4All's programmes across Nigeria.",
};

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  const albums = (data ?? []) as GalleryAlbum[];

  return (
    <>
      <section className="bg-deep-black pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Gallery
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Moments from our programmes, events, and community engagements across Nigeria.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {albums.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <p className="text-mid-gray text-lg mb-2">No albums yet.</p>
                <p className="text-mid-gray/60 text-sm">
                  Albums will appear here once published from the admin panel.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, i) => (
                <FadeIn key={album.id} delay={i * 0.08}>
                  <Link
                    href={`/gallery/${album.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-light-gray">
                      {album.cover_image_url ? (
                        <Image
                          src={album.cover_image_url}
                          alt={album.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-mid-gray/30 font-[family-name:var(--font-heading)]">
                            {album.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-1">
                        {album.title}
                      </h2>
                      {album.description && (
                        <p className="text-mid-gray text-sm line-clamp-2">
                          {album.description}
                        </p>
                      )}
                      {album.event_date && (
                        <p className="text-mid-gray/50 text-xs mt-2 font-[family-name:var(--font-inter)]">
                          {new Date(album.event_date).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "long",
                          })}
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
