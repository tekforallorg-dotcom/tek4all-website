import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("gallery_albums")
    .select("title, description")
    .eq("slug", slug)
    .single();
  if (!data) return { title: "Album Not Found" };
  return { title: data.title, description: data.description ?? undefined };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: albumData } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!albumData) notFound();
  const album = albumData as GalleryAlbum;

  const { data: photosData } = await supabase
    .from("gallery_photos")
    .select("*")
    .eq("album_id", album.id)
    .order("sort_order");

  const photos = (photosData ?? []) as GalleryPhoto[];

  return (
    <>
      <section className="bg-deep-black pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-white/50 text-sm font-[family-name:var(--font-inter)] hover:text-white/70 transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All Albums
            </Link>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-4">
              {album.title}
            </h1>
            {album.description && (
              <p className="text-white/70 text-lg max-w-2xl">{album.description}</p>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {photos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-mid-gray text-lg">No photos in this album yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, i) => (
                <FadeIn key={photo.id} delay={i * 0.04}>
                  <div className="relative aspect-square rounded-xl overflow-hidden group bg-light-gray">
                    <Image
                      src={photo.image_url}
                      alt={photo.caption || album.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
