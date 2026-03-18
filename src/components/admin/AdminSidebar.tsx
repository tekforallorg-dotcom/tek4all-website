"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Handshake,
  ImageIcon,
  BookOpen,
  MessageSquare,
  BarChart3,
  Share2,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/types";

interface AdminSidebarProps {
  userName: string;
  userRole: UserRole;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, roles: ["super_admin"] },
  { href: "/admin/programmes", label: "Programmes", icon: FileText, roles: ["super_admin"] },
  { href: "/admin/team", label: "Team", icon: Users, roles: ["super_admin"] },
  { href: "/admin/partners", label: "Partners", icon: Handshake, roles: ["super_admin"] },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon, roles: ["super_admin", "site_admin"] },
  { href: "/admin/blog", label: "Blog", icon: BookOpen, roles: ["super_admin", "site_admin", "blog_editor"] },
  { href: "/admin/stats", label: "Impact Stats", icon: BarChart3, roles: ["super_admin"] },
  { href: "/admin/social", label: "Social Posts", icon: Share2, roles: ["super_admin"] },
  { href: "/admin/forms", label: "Submissions", icon: MessageSquare, roles: ["super_admin"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["super_admin"] },
];

export function AdminSidebar({ userName, userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-ash">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/tek4all-logo.jpg"
            alt="Tek4All"
            width={120}
            height={36}
            className="h-8 w-auto"
          />
        </Link>
        <p className="text-xs text-mid-gray mt-1 font-[family-name:var(--font-inter)]">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-near-black text-white"
                  : "text-mid-gray hover:bg-ash/50 hover:text-near-black"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-ash">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-near-black flex items-center justify-center text-white text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-near-black truncate">
              {userName}
            </p>
            <p className="text-xs text-mid-gray capitalize">
              {userRole.replace("_", " ")}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-mid-gray hover:text-red-600 transition-colors w-full px-3 py-2 rounded-xl hover:bg-red-50"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow-md"
        aria-label="Toggle admin menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-ash z-40 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
