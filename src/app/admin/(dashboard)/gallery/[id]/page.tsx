"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/types";

export default function AdminAlbumPhotosPage() {
  const params = useParams();
  const albumId = params.id as string;
  const supabase = createClient();

  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchData = useCallback(async () => {
    const [albumRes, photosRes] = await Promise.all([
      supabase.from("gallery_albums").select("*").eq("id", albumId).single(),
      supabase.from("gallery_photos").select("*").eq("album_id", albumId).order("sort_order"),
    ]);
    setAlbum(albumRes.data as GalleryAlbum | null);
    setPhotos((photosRes.data ?? []) as GalleryPhoto[]);
    setLoading(false);
  }, [supabase, albumId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleUploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const maxOrder = photos.length > 0 ? Math.max(...photos.map((p) => p.sort_order)) : 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop();
      const path = `${albumId}/${Date.now()}-${i}.${ext}`;
      const { error } = await supabase.storage.from("gallery").upload(path, file);
      if (!error) {
        const { data: u } = supabase.storage.from("gallery").getPublicUrl(path);
        await supabase.from("gallery_photos").insert({
          album_id: albumId,
          image_url: u.publicUrl,
          sort_order: maxOrder + i + 1,
        });
      }
    }

    setUploading(false);
    fetchData();
    e.target.value = "";
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm("Remove this photo?")) return;
    await supabase.from("gallery_photos").delete().eq("id", photoId);
    fetchData();
  };

  const toggleConsent = async (photo: GalleryPhoto) => {
    await supabase.from("gallery_photos").update({ consent_confirmed: !photo.consent_confirmed }).eq("id", photo.id);
    fetchData();
  };

  const toggleMinors = async (photo: GalleryPhoto) => {
    await supabase.from("gallery_photos").update({ minors_present: !photo.minors_present }).eq("id", photo.id);
    fetchData();
  };

  if (loading) return <div className="animate-pulse bg-white rounded-xl h-64" />;
  if (!album) return <p className="text-mid-gray">Album not found.</p>;

  return (
    <div>
      <Link href="/admin/gallery" className="inline-flex items-center gap-2 text-mid-gray text-sm hover:text-near-black transition-colors mb-4">
        <ArrowLeft size={14} /> Back to Albums
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">{album.title}</h1>
          <p className="text-mid-gray text-sm mt-1">{photos.length} photos</p>
        </div>
        <label className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors cursor-pointer">
          {uploading ? <><Upload size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Upload Photos</>}
          <input type="file" accept="image/*" multiple onChange={handleUploadPhotos} className="hidden" disabled={uploading} />
        </label>
      </div>

      {photos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-mid-gray">No photos yet. Upload some to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
              <div className="relative aspect-square">
                <Image src={photo.image_url} alt={photo.caption || "Photo"} fill className="object-cover" />
                <button onClick={() => handleDelete(photo.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-mid-gray cursor-pointer">
                    <input type="checkbox" checked={photo.consent_confirmed} onChange={() => toggleConsent(photo)} className="rounded" />
                    Consent
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-mid-gray cursor-pointer">
                    <input type="checkbox" checked={photo.minors_present} onChange={() => toggleMinors(photo)} className="rounded" />
                    Minors
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
