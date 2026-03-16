"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Programme } from "@/lib/types";
import { PROGRAMME_CATEGORIES } from "@/lib/types";

const EMPTY = { title: "", slug: "", category: "Schools & Youth", short_description: "", body: "", cover_image_url: "", who_it_serves: "", outcomes: "" };

export default function AdminProgrammesPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Programme | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const { data } = await supabase.from("programmes").select("*").order("sort_order");
    setItems((data ?? []) as Programme[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("programmes").upload(path, file);
    if (!error) {
      const { data: u } = supabase.storage.from("programmes").getPublicUrl(path);
      setForm({ ...form, cover_image_url: u.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = { title: form.title, slug, category: form.category, short_description: form.short_description || null, body: form.body || null, cover_image_url: form.cover_image_url || null, who_it_serves: form.who_it_serves || null, outcomes: form.outcomes || null };
    if (editing) {
      await supabase.from("programmes").update(payload).eq("id", editing.id);
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((p) => p.sort_order)) + 1 : 0;
      await supabase.from("programmes").insert({ ...payload, sort_order: maxOrder });
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this programme?")) return;
    await supabase.from("programmes").delete().eq("id", id);
    fetchData();
  };

  const handleEdit = (p: Programme) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, category: p.category, short_description: p.short_description || "", body: p.body || "", cover_image_url: p.cover_image_url || "", who_it_serves: p.who_it_serves || "", outcomes: p.outcomes || "" });
    setShowForm(true);
  };

  const toggleFeatured = async (p: Programme) => {
    await supabase.from("programmes").update({ is_featured: !p.is_featured }).eq("id", p.id);
    fetchData();
  };

  const togglePublish = async (p: Programme) => {
    await supabase.from("programmes").update({ is_published: !p.is_published }).eq("id", p.id);
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Programmes</h1>
          <p className="text-mid-gray text-sm mt-1">Manage programme pages and content.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY); }} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> Add Programme
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "Add"} Programme</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray hover:text-near-black"><X size={20} /></button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30">
                    {PROGRAMME_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Content</label>
                <textarea rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30 resize-y font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Who It Serves</label>
                  <input type="text" value={form.who_it_serves} onChange={(e) => setForm({ ...form, who_it_serves: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Outcomes</label>
                  <input type="text" value={form.outcomes} onChange={(e) => setForm({ ...form, outcomes: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                {form.cover_image_url && <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2"><Image src={form.cover_image_url} alt="" fill className="object-cover" /></div>}
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
            </div>
            <button onClick={handleSave} disabled={saving || !form.title.trim()} className="w-full mt-4 bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-charcoal transition-colors">
              {saving ? "Saving..." : editing ? "Update" : "Add Programme"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <div key={p.id} className={`bg-white rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm ${!p.is_published ? "opacity-50" : ""}`}>
              <div className="w-12 h-8 rounded-lg overflow-hidden bg-light-gray flex-shrink-0 relative">
                {p.cover_image_url && <Image src={p.cover_image_url} alt="" fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-near-black truncate">{p.title}</p>
                <p className="text-xs text-mid-gray">{p.category}</p>
              </div>
              {p.is_featured && <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />}
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => toggleFeatured(p)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray" title="Toggle featured"><Star size={14} /></button>
                <button onClick={() => togglePublish(p)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray">{p.is_published ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
