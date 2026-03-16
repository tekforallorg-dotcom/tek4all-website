"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, ImageIcon, Eye, EyeOff, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryAlbum } from "@/lib/types";

export default function AdminGalleryPage() {
  const supabase = createClient();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryAlbum | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", cover_image_url: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchAlbums = useCallback(async () => {
    const { data } = await supabase.from("gallery_albums").select("*").order("sort_order");
    setAlbums((data ?? []) as GalleryAlbum[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchAlbums(); }, [fetchAlbums]);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `covers/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (!error) {
      const { data: u } = supabase.storage.from("gallery").getPublicUrl(path);
      setForm({ ...form, cover_image_url: u.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = { title: form.title, slug, description: form.description || null, cover_image_url: form.cover_image_url || null };
    if (editing) {
      await supabase.from("gallery_albums").update(payload).eq("id", editing.id);
    } else {
      const maxOrder = albums.length > 0 ? Math.max(...albums.map((a) => a.sort_order)) + 1 : 0;
      await supabase.from("gallery_albums").insert({ ...payload, sort_order: maxOrder });
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", slug: "", description: "", cover_image_url: "" });
    fetchAlbums();
  };

  const togglePublish = async (album: GalleryAlbum) => {
    await supabase.from("gallery_albums").update({ is_published: !album.is_published }).eq("id", album.id);
    fetchAlbums();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this album and all its photos?")) return;
    await supabase.from("gallery_albums").delete().eq("id", id);
    fetchAlbums();
  };

  const handleEdit = (a: GalleryAlbum) => {
    setEditing(a);
    setForm({ title: a.title, slug: a.slug, description: a.description || "", cover_image_url: a.cover_image_url || "" });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Gallery</h1>
          <p className="text-mid-gray text-sm mt-1">Create programme/event albums and upload photos.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", slug: "", description: "", cover_image_url: "" }); }} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> New Album
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "Create"} Album</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray hover:text-near-black"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} placeholder="e.g., Women-in-Tek March 2025" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Slug</label>
                <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 text-mid-gray" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Description (optional)</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Cover Image</label>
                {form.cover_image_url && <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2"><Image src={form.cover_image_url} alt="Cover" fill className="object-cover" /></div>}
                <input type="file" accept="image/*" onChange={handleUploadCover} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
              <button onClick={handleSave} disabled={saving || !form.title.trim()} className="w-full bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-charcoal transition-colors">
                {saving ? "Saving..." : editing ? "Update Album" : "Create Album"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-48 animate-pulse" />)}</div>
      ) : albums.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center"><p className="text-mid-gray">No albums yet. Create one to start uploading photos.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative aspect-video bg-light-gray">
                {album.cover_image_url ? <Image src={album.cover_image_url} alt={album.title} fill className="object-cover" /> : (
                  <div className="absolute inset-0 flex items-center justify-center"><ImageIcon size={32} className="text-ash" /></div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${album.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {album.is_published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-near-black text-sm mb-1">{album.title}</h3>
                {album.description && <p className="text-xs text-mid-gray line-clamp-1">{album.description}</p>}
                <div className="flex items-center gap-2 mt-3">
                  <Link href={`/admin/gallery/${album.id}`} className="text-xs bg-light-gray px-3 py-1.5 rounded-lg hover:bg-ash transition-colors font-medium">
                    Manage Photos
                  </Link>
                  <button onClick={() => togglePublish(album)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray" title={album.is_published ? "Unpublish" : "Publish"}>
                    {album.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => handleEdit(album)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(album.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
