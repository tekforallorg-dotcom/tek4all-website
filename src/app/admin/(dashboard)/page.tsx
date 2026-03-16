import { createServerSupabaseClient } from "@/lib/supabase/server";
import { FileText, Users, ImageIcon, BookOpen, MessageSquare, Handshake } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  const [programmes, team, partners, albums, posts, forms] = await Promise.all([
    supabase.from("programmes").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("partner_logos").select("id", { count: "exact", head: true }),
    supabase.from("gallery_albums").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("form_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  const stats = [
    { label: "Programmes", count: programmes.count ?? 0, icon: FileText, href: "/admin/programmes" },
    { label: "Team Members", count: team.count ?? 0, icon: Users, href: "/admin/team" },
    { label: "Partners", count: partners.count ?? 0, icon: Handshake, href: "/admin/partners" },
    { label: "Gallery Albums", count: albums.count ?? 0, icon: ImageIcon, href: "/admin/gallery" },
    { label: "Blog Posts", count: posts.count ?? 0, icon: BookOpen, href: "/admin/blog" },
    { label: "Unread Submissions", count: forms.count ?? 0, icon: MessageSquare, href: "/admin/forms" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-near-black">
          Dashboard
        </h1>
        <p className="text-mid-gray text-sm mt-1">
          Overview of your Tek4All website content.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center">
                <stat.icon size={18} className="text-near-black" />
              </div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-near-black">
                  {stat.count}
                </p>
                <p className="text-sm text-mid-gray">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
