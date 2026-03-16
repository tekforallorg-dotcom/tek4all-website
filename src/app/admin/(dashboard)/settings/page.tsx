"use client";

import { useState, useEffect, useCallback } from "react";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_heading: "Skilling Lives, Uplifting Minds",
    hero_subtext: "Equipping underserved communities and organisations with the digital skills and tools to thrive in the AI era.",
    contact_email: "impact@tekforall.org",
    contact_phone: "+234-703-106-4144",
    contact_address: "Ventures Park, 5 Kwaji Close, Maitama, Abuja 904101, FCT, Nigeria",
    footer_tagline: "Bridging the digital divide through practical skills, inclusive access, and future-ready systems.",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const mapped: Record<string, string> = {};
      data.forEach((row) => {
        mapped[row.key] = typeof row.value === "string" ? row.value : (row.value as Record<string, string>).text || JSON.stringify(row.value);
      });
      setSettings((prev) => ({ ...prev, ...mapped }));
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value: { text: value }, updated_at: new Date().toISOString() }, { onConflict: "key" });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="animate-pulse bg-white rounded-xl h-64" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Site Settings</h1>
          <p className="text-mid-gray text-sm mt-1">Global site configuration. Super admin only.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-near-black text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-charcoal transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4">Homepage Hero</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input type="text" value={settings.hero_heading} onChange={(e) => setSettings({ ...settings, hero_heading: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtext</label>
              <textarea rows={2} value={settings.hero_subtext} onChange={(e) => setSettings({ ...settings, hero_subtext: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm resize-none" />
            </div>
          </div>
        </div>
        <hr className="border-ash" />
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4">Contact Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={settings.contact_email} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" value={settings.contact_phone} onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" value={settings.contact_address} onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
            </div>
          </div>
        </div>
        <hr className="border-ash" />
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4">Footer</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Tagline</label>
            <input type="text" value={settings.footer_tagline} onChange={(e) => setSettings({ ...settings, footer_tagline: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-ash text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
