import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/admin/login");
  }

  return (
    <>
      {/* Hide root navbar/footer in admin */}
      <style>{`
        body > div > header, body > div > footer, .gradient-cta { display: none !important; }
        body > div > main { padding: 0 !important; }
      `}</style>
    <div className="min-h-screen bg-light-gray flex">
      <AdminSidebar
        userName={profile.full_name || profile.email}
        userRole={profile.role}
      />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl">{children}</div>
      </main>
    </div>
    </>
  );
}
