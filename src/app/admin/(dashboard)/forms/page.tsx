"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Handshake, Heart, Users, Check, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { FormSubmission } from "@/lib/types";

const TABS = [
  { type: "all", label: "All", icon: Mail },
  { type: "contact", label: "Contact", icon: Mail },
  { type: "partnership", label: "Partnership", icon: Handshake },
  { type: "volunteer", label: "Volunteer", icon: Heart },
  { type: "newsletter", label: "Newsletter", icon: Users },
];

export default function AdminFormsPage() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    let query = supabase.from("form_submissions").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("form_type", filter);
    const { data } = await query;
    setSubmissions((data ?? []) as FormSubmission[]);
    setLoading(false);
  }, [supabase, filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const markRead = async (id: string) => {
    await supabase.from("form_submissions").update({ is_read: true }).eq("id", id);
    fetchData();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">Form Submissions</h1>
        <p className="text-mid-gray text-sm mt-1">Contact, partnership, volunteer, and newsletter submissions.</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button key={tab.type} onClick={() => { setFilter(tab.type); setLoading(true); }} className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${filter === tab.type ? "bg-near-black text-white" : "bg-white text-mid-gray hover:bg-ash/50"}`}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center"><p className="text-mid-gray">No submissions yet.</p></div>
      ) : (
        <div className="space-y-2">
          {submissions.map((sub) => (
            <div key={sub.id} className={`bg-white rounded-xl shadow-sm overflow-hidden ${!sub.is_read ? "border-l-4 border-near-black" : ""}`}>
              <button onClick={() => setExpanded(expanded === sub.id ? null : sub.id)} className="w-full px-4 py-3 flex items-center gap-4 text-left">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${sub.form_type === "contact" ? "bg-blue-50 text-blue-700" : sub.form_type === "partnership" ? "bg-purple-50 text-purple-700" : sub.form_type === "volunteer" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                  {sub.form_type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-near-black truncate">
                    {(sub.data as Record<string, string>).name || (sub.data as Record<string, string>).email || "Submission"}
                  </p>
                  <p className="text-xs text-mid-gray">{new Date(sub.created_at).toLocaleString()}</p>
                </div>
                {!sub.is_read && <span className="w-2 h-2 rounded-full bg-near-black flex-shrink-0" />}
                <ChevronDown size={16} className={`text-mid-gray transition-transform ${expanded === sub.id ? "rotate-180" : ""}`} />
              </button>
              {expanded === sub.id && (
                <div className="px-4 pb-4 border-t border-ash/50 pt-3">
                  <div className="space-y-2">
                    {Object.entries(sub.data as Record<string, string>).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-xs text-mid-gray capitalize">{key.replace(/_/g, " ")}</span>
                        <p className="text-sm text-near-black">{value}</p>
                      </div>
                    ))}
                  </div>
                  {!sub.is_read && (
                    <button onClick={() => markRead(sub.id)} className="mt-3 flex items-center gap-1.5 text-xs text-mid-gray hover:text-near-black transition-colors">
                      <Check size={12} /> Mark as read
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
