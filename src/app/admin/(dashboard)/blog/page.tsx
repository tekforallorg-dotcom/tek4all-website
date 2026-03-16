"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", body: "", cover_image_url: "", read_time: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data ?? []) as BlogPost[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("blog").upload(path, file);
    if (!error) {
      const { data: u } = supabase.storage.from("blog").getPublicUrl(path);
      setForm({ ...form, cover_image_url: u.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim()) return;
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = {
      title: form.title, slug, excerpt: form.excerpt || null, body: form.body || null,
      cover_image_url: form.cover_image_url || null, read_time: form.read_time || null,
      status: publish ? "published" as const : "draft" as const,
      published_at: publish ? new Date().toISOString() : null,
    };
    if (editing) {
      await supabase.from("blog_posts").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", slug: "", excerpt: "", body: "", cover_image_url: "", read_time: "" });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };

  const handleEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", body: p.body || "", cover_image_url: p.cover_image_url || "", read_time: p.read_time || "" });
    setShowForm(true);
  };

  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    await supabase.from("blog_posts").update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
    }).eq("id", post.id);
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Blog Posts</h1>
          <p className="text-mid-gray text-sm mt-1">Create and manage blog content.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", slug: "", excerpt: "", body: "", cover_image_url: "", read_time: "" }); }} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "New"} Blog Post</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray hover:text-near-black"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-near-black mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 text-mid-gray" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-near-black mb-1">Read Time</label>
                  <input type="text" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="e.g., 3 min read" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short summary for cards" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Body</label>
                <textarea rows={10} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your post content here..." className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 resize-y font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Featured Image</label>
                {form.cover_image_url && <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2"><Image src={form.cover_image_url} alt="Cover" fill className="object-cover" /></div>}
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleSave(false)} disabled={saving || !form.title.trim()} className="flex-1 border border-ash text-near-black py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-light-gray transition-colors">
                  {saving ? "Saving..." : "Save Draft"}
                </button>
                <button onClick={() => handleSave(true)} disabled={saving || !form.title.trim()} className="flex-1 bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-charcoal transition-colors">
                  {saving ? "Publishing..." : "Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center"><p className="text-mid-gray">No blog posts yet.</p></div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-light-gray flex-shrink-0 relative">
                {post.cover_image_url && <Image src={post.cover_image_url} alt="" fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-near-black truncate">{post.title}</p>
                <p className="text-xs text-mid-gray">{post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {post.status}
              </span>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => togglePublish(post)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray" title={post.status === "published" ? "Unpublish" : "Publish"}>
                  {post.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => handleEdit(post)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
