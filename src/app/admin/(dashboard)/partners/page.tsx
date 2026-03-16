"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PartnerLogo } from "@/lib/types";

export default function AdminPartnersPage() {
  const supabase = createClient();
  const [partners, setPartners] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PartnerLogo | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "", website_url: "", tier: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(async () => {
    const { data } = await supabase.from("partner_logos").select("*").order("sort_order");
    setPartners((data ?? []) as PartnerLogo[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("partner-logos").upload(path, file);
    if (!error) {
      const { data: u } = supabase.storage.from("partner-logos").getPublicUrl(path);
      setForm({ ...form, logo_url: u.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.logo_url.trim()) return;
    setSaving(true);
    const payload = { name: form.name, logo_url: form.logo_url, website_url: form.website_url || null, tier: form.tier || null };
    if (editing) {
      await supabase.from("partner_logos").update(payload).eq("id", editing.id);
    } else {
      const maxOrder = partners.length > 0 ? Math.max(...partners.map((p) => p.sort_order)) + 1 : 0;
      await supabase.from("partner_logos").insert({ ...payload, sort_order: maxOrder });
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", logo_url: "", website_url: "", tier: "" });
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this partner?")) return;
    await supabase.from("partner_logos").delete().eq("id", id);
    fetch();
  };

  const handleEdit = (p: PartnerLogo) => {
    setEditing(p);
    setForm({ name: p.name, logo_url: p.logo_url, website_url: p.website_url || "", tier: p.tier || "" });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Partners</h1>
          <p className="text-mid-gray text-sm mt-1">Logos appear in the homepage partner slider.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", logo_url: "", website_url: "", tier: "" }); }} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "Add"} Partner</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray hover:text-near-black"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Organisation name" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Logo</label>
                {form.logo_url && <div className="relative w-24 h-12 mb-2"><Image src={form.logo_url} alt="Preview" fill className="object-contain" /></div>}
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Website (optional)</label>
                <input type="url" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="https://..." className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Tier (optional)</label>
                <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30">
                  <option value="">No tier</option>
                  <option value="sponsor">Sponsor</option>
                  <option value="partner">Partner</option>
                  <option value="collaborator">Collaborator</option>
                  <option value="supporter">Supporter</option>
                </select>
              </div>
              <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.logo_url.trim()} className="w-full bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-charcoal transition-colors">
                {saving ? "Saving..." : editing ? "Update" : "Add Partner"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
      ) : partners.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center"><p className="text-mid-gray">No partners yet.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div key={p.id} className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 ${!p.is_visible ? "opacity-50" : ""}`}>
              <div className="w-16 h-10 relative flex-shrink-0">{p.logo_url && <Image src={p.logo_url} alt={p.name} fill className="object-contain" />}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-near-black truncate">{p.name}</p>
                {p.tier && <p className="text-xs text-mid-gray capitalize">{p.tier}</p>}
              </div>
              <div className="flex gap-1">
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
