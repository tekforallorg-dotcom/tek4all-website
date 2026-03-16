"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, GripVertical, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { TeamMember } from "@/lib/types";

export default function AdminTeamPage() {
  const supabase = createClient();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({ name: "", role: "", image_url: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order");
    setMembers((data ?? []) as TeamMember[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("team-photos").upload(path, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from("team-photos").getPublicUrl(path);
      setForm({ ...form, image_url: urlData.publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    if (editing) {
      await supabase.from("team_members").update({ name: form.name, role: form.role, image_url: form.image_url || null }).eq("id", editing.id);
    } else {
      const maxOrder = members.length > 0 ? Math.max(...members.map((m) => m.sort_order)) + 1 : 0;
      await supabase.from("team_members").insert({ name: form.name, role: form.role, image_url: form.image_url || null, sort_order: maxOrder });
    }
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", role: "", image_url: "" });
    fetchMembers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    fetchMembers();
  };

  const handleEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({ name: member.name, role: member.role, image_url: member.image_url || "" });
    setShowForm(true);
  };

  const handleToggleVisibility = async (member: TeamMember) => {
    await supabase.from("team_members").update({ is_visible: !member.is_visible }).eq("id", member.id);
    fetchMembers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Team Members</h1>
          <p className="text-mid-gray text-sm mt-1">Manage who appears on the About page.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", role: "", image_url: "" }); }}
          className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">{editing ? "Edit" : "Add"} Team Member</h2>
              <button onClick={() => setShowForm(false)} className="text-mid-gray hover:text-near-black"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Role</label>
                <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Job title" className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm focus:outline-none focus:border-near-black/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-near-black mb-1">Photo</label>
                {form.image_url && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-2">
                    <Image src={form.image_url} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm text-mid-gray" />
                {uploading && <p className="text-xs text-mid-gray mt-1">Uploading...</p>}
              </div>
              <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.role.trim()} className="w-full bg-near-black text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-charcoal transition-colors">
                {saving ? "Saving..." : editing ? "Update" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-mid-gray">No team members yet. Click &ldquo;Add Member&rdquo; to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className={`bg-white rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm ${!member.is_visible ? "opacity-50" : ""}`}>
              <GripVertical size={16} className="text-ash cursor-grab flex-shrink-0" />
              <div className="w-10 h-10 rounded-full overflow-hidden bg-light-gray flex-shrink-0">
                {member.image_url ? (
                  <Image src={member.image_url} alt={member.name} width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-mid-gray text-xs font-bold">{member.name.charAt(0)}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-near-black truncate">{member.name}</p>
                <p className="text-xs text-mid-gray">{member.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleToggleVisibility(member)} className="text-xs text-mid-gray hover:text-near-black px-2 py-1 rounded-lg hover:bg-light-gray transition-colors">
                  {member.is_visible ? "Hide" : "Show"}
                </button>
                <button onClick={() => handleEdit(member)} className="p-1.5 rounded-lg hover:bg-light-gray text-mid-gray hover:text-near-black transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-mid-gray hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
