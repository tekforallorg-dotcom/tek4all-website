/* ============================================
   TEK4ALL — TypeScript Types
   Matches Supabase schema v1
   ============================================ */

export type UserRole = "super_admin" | "site_admin" | "blog_editor";
export type BlogStatus = "draft" | "published";
export type FormType = "contact" | "partnership" | "volunteer" | "newsletter";
export type SocialPlatform = "instagram" | "linkedin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface Programme {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string | null;
  body: string | null;
  cover_image_url: string | null;
  who_it_serves: string | null;
  outcomes: string | null;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  tier: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  programme_id: string | null;
  event_date: string | null;
  tags: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  consent_confirmed: boolean;
  minors_present: boolean;
  internal_note: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  author_id: string | null;
  category_id: string | null;
  status: BlogStatus;
  seo_title: string | null;
  meta_description: string | null;
  read_time: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  title: string | null;
  excerpt: string | null;
  image_url: string | null;
  external_url: string;
  is_pinned: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface FormSubmission {
  id: string;
  form_type: FormType;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
}

/* ============================================
   Programme categories (constant)
   ============================================ */
export const PROGRAMME_CATEGORIES = [
  "Schools & Youth",
  "Women & Communities",
  "Systems Change",
  "Infrastructure & Access",
  "B2B",
] as const;

export type ProgrammeCategory = (typeof PROGRAMME_CATEGORIES)[number];
