"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ImpactStat } from "@/lib/types";

export default function AdminStatsPage() {
  const supabase = createClient();
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ImpactStat | null>(null);
  const [form, setForm] = useState({ label: "", value: "" });
  const [saving, setSaving] = useState(false);

  const fetchStats = useCallback(async () => {
    const { data } = await supabase.from("impact_stats").select("*").order("sort_order");
    setStats((data ?? []) as ImpactStat[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleSave = async () => {
    if (!form.label.trim() || !form.value.trim()) return;
    setSaving(true);
    if (editing) {
      await supabase.from("impact_stats").update({ label: form.label, value: form.value }).eq("id", editing.id);
    } else {
      const maxOrder = stats.length > 0 ? Math.max(...stats.map((s) => s.sort_order)) + 1 : 0;
      await supabase.from("impact_stats").insert({ label: form.label, value: form.value, sort_order: maxOrder });
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ label: "", value: "" });
    fetchStats();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this stat?")) return;
    await supabase.from("impact_stats").delete().eq("id", id);
    fetchStats();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Impact Stats</h1>
          <p className="text-mid-gray text-sm mt-1">Numbers displayed on the homepage.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ label: "", value: "" }); }} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors">
          <Plus size={16} /> Add Stat
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "Add"} Stat</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input type="text" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="e.g., 1,850+" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g., Community Members" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
              </div>
              <button onClick={handleSave} disabled={saving} className="w-full bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="animate-pulse bg-white rounded-xl h-40" /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)] text-near-black">{stat.value}</p>
              <p className="text-sm text-mid-gray mt-1">{stat.label}</p>
              <div className="flex gap-1 mt-3">
                <button onClick={() => { setEditing(stat); setForm({ label: stat.label, value: stat.value }); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(stat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
