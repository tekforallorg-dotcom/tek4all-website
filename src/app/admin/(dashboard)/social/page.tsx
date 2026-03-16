"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SocialPost } from "@/lib/types";

export default function AdminSocialPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ platform: "instagram" | "linkedin"; title: string; excerpt: string; image_url: string; external_url: string }>({ platform: "instagram", title: "", excerpt: "", image_url: "", external_url: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase.from("social_posts").select("*").order("sort_order");
    setPosts((data ?? []) as SocialPost[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `social/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("general").upload(path, file);
    if (!error) {
      const { data: u } = supabase.storage.from("general").getPublicUrl(path);
      setForm({ ...form, image_url: u.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.external_url.trim()) return;
    setSaving(true);
    const maxOrder = posts.length > 0 ? Math.max(...posts.map((p) => p.sort_order)) + 1 : 0;
    await supabase.from("social_posts").insert({ ...form, title: form.title || null, excerpt: form.excerpt || null, image_url: form.image_url || null, sort_order: maxOrder });
    setSaving(false);
    setShowForm(false);
    setForm({ platform: "instagram", title: "", excerpt: "", image_url: "", external_url: "" });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this post?")) return;
    await supabase.from("social_posts").delete().eq("id", id);
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Social Posts</h1>
          <p className="text-mid-gray text-sm mt-1">Curate Instagram and LinkedIn posts for the homepage.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">Add Social Post</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value as "instagram" | "linkedin" })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm">
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Post URL</label>
                <input type="url" value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} placeholder="https://instagram.com/p/..." className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Caption Excerpt (optional)</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Screenshot/Image</label>
                {form.image_url && <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-2"><Image src={form.image_url} alt="" fill className="object-cover" /></div>}
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
              <button onClick={handleSave} disabled={saving || !form.external_url.trim()} className="w-full bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50">{saving ? "Saving..." : "Add Post"}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="animate-pulse bg-white rounded-xl h-40" /> : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center"><p className="text-mid-gray">No curated posts yet.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative aspect-square bg-light-gray">
                {post.image_url && <Image src={post.image_url} alt="" fill className="object-cover" />}
                <span className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-0.5 rounded-full capitalize">{post.platform}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-xs text-mid-gray line-clamp-1 flex-1">{post.excerpt || post.external_url}</p>
                <button onClick={() => handleDelete(post.id)} className="p-1 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600 ml-2"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
