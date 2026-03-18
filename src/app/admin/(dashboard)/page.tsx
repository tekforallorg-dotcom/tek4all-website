import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { FileText, Users, ImageIcon, BookOpen, MessageSquare, Handshake, BarChart3, Share2, Eye, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // Check role — non-super_admin gets redirected
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/admin/login");

  // Redirect non-super_admin to their allowed area
  if (profile.role === "blog_editor") redirect("/admin/blog");
  if (profile.role === "site_admin") redirect("/admin/blog");

  // Super admin — fetch all stats
  const [programmes, team, partners, albums, photos, posts, forms, unreadForms, socialPosts, stats, recentForms] = await Promise.all([
    supabase.from("programmes").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("partner_logos").select("id", { count: "exact", head: true }),
    supabase.from("gallery_albums").select("id", { count: "exact", head: true }),
    supabase.from("gallery_photos").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("social_posts").select("id", { count: "exact", head: true }),
    supabase.from("impact_stats").select("id", { count: "exact", head: true }),
    supabase.from("form_submissions").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  // Form submissions by type
  const [contactForms, partnerForms, volunteerForms, newsletterForms] = await Promise.all([
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("form_type", "contact"),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("form_type", "partnership"),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("form_type", "volunteer"),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("form_type", "newsletter"),
  ]);

  const contentStats = [
    { label: "Programmes", count: programmes.count ?? 0, icon: FileText, href: "/admin/programmes", color: "#0d141a" },
    { label: "Team Members", count: team.count ?? 0, icon: Users, href: "/admin/team", color: "#1d1e20" },
    { label: "Partners", count: partners.count ?? 0, icon: Handshake, href: "/admin/partners", color: "#0d141a" },
    { label: "Gallery Albums", count: albums.count ?? 0, icon: ImageIcon, href: "/admin/gallery", color: "#1d1e20" },
    { label: "Blog Posts", count: posts.count ?? 0, icon: BookOpen, href: "/admin/blog", color: "#0d141a" },
    { label: "Social Posts", count: socialPosts.count ?? 0, icon: Share2, href: "/admin/social", color: "#1d1e20" },
  ];

  const submissionStats = [
    { label: "Contact", count: contactForms.count ?? 0 },
    { label: "Partnership", count: partnerForms.count ?? 0 },
    { label: "Volunteer", count: volunteerForms.count ?? 0 },
    { label: "Newsletter", count: newsletterForms.count ?? 0 },
  ];

  const recent = (recentForms.data ?? []) as Array<{
    id: string;
    form_type: string;
    data: Record<string, string>;
    is_read: boolean;
    created_at: string;
  }>;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">
          Dashboard
        </h1>
        <p className="text-mid-gray text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening with Tek4All.
        </p>
      </div>

      {/* Top metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d141a" }}>
              <MessageSquare size={16} className="text-white" />
            </div>
            {(unreadForms.count ?? 0) > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
                {unreadForms.count} new
              </span>
            )}
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-near-black">{forms.count ?? 0}</p>
          <p className="text-xs text-mid-gray mt-0.5">Total Submissions</p>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d141a" }}>
              <Eye size={16} className="text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-near-black">{photos.count ?? 0}</p>
          <p className="text-xs text-mid-gray mt-0.5">Gallery Photos</p>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d141a" }}>
              <BarChart3 size={16} className="text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-near-black">{stats.count ?? 0}</p>
          <p className="text-xs text-mid-gray mt-0.5">Impact Stats</p>
        </div>

        <Link href="https://vercel.com/tekforallorg-dotcoms-projects/tek4all-website/analytics" target="_blank" className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d141a" }}>
              <TrendingUp size={16} className="text-white" />
            </div>
            <ArrowUpRight size={14} className="text-mid-gray" />
          </div>
          <p className="text-sm font-semibold font-[family-name:var(--font-heading)] text-near-black">Web Analytics</p>
          <p className="text-xs text-mid-gray mt-0.5">View on Vercel →</p>
        </Link>
      </div>

      {/* Content grid — clickable cards */}
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-near-black mb-4">Content</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentStats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl p-5 hover:shadow-md transition-all group"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f2f2f2" }}>
                    <stat.icon size={18} className="text-near-black" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-near-black">{stat.count}</p>
                    <p className="text-xs text-mid-gray">{stat.label}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-mid-gray/0 group-hover:text-mid-gray transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two-column: Submissions breakdown + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submissions breakdown */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black">Submissions by Type</h2>
            <Link href="/admin/forms" className="text-xs text-mid-gray hover:text-near-black transition-colors font-[family-name:var(--font-inter)]">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {submissionStats.map((s) => {
              const total = (forms.count ?? 1) || 1;
              const pct = Math.round((s.count / total) * 100);
              return (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-near-black font-medium">{s.label}</span>
                    <span className="text-mid-gray">{s.count}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: "#f2f2f2" }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: "#0d141a" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black">Recent Activity</h2>
            <Clock size={14} className="text-mid-gray" />
          </div>
          {recent.length === 0 ? (
            <p className="text-mid-gray text-sm">No recent submissions.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((item) => (
                <div key={item.id} className="flex items-start gap-3 py-2" style={{ borderBottom: "1px solid #f2f2f2" }}>
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: item.is_read ? "#e5e5e5" : "#0d141a" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-near-black truncate">
                      {item.data.name || item.data.email || "Anonymous"}
                    </p>
                    <p className="text-xs text-mid-gray">
                      {item.form_type} · {new Date(item.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0" style={{
                    backgroundColor: item.form_type === "contact" ? "#dbeafe" : item.form_type === "partnership" ? "#f3e8ff" : item.form_type === "volunteer" ? "#dcfce7" : "#fef9c3",
                    color: item.form_type === "contact" ? "#1d4ed8" : item.form_type === "partnership" ? "#7c3aed" : item.form_type === "volunteer" ? "#16a34a" : "#ca8a04",
                  }}>
                    {item.form_type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
