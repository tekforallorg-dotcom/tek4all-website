# Tek4All Website

**Skilling Lives, Uplifting Minds**

Premium nonprofit website for Technology for All Initiative (Tek4All) — bridging the digital divide in Nigeria.

## Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Database:** Supabase (Postgres + Auth + Storage)
- **Hosting:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin panel (auth-protected)
│   │   ├── (dashboard)/    # Dashboard layout group
│   │   │   ├── blog/       # Blog CRUD
│   │   │   ├── forms/      # Form submissions viewer
│   │   │   ├── gallery/    # Gallery album + photo management
│   │   │   ├── partners/   # Partner logo CRUD
│   │   │   ├── programmes/ # Programme CRUD
│   │   │   ├── settings/   # Site settings (super_admin)
│   │   │   ├── social/     # Social posts curator
│   │   │   ├── stats/      # Impact stats editor
│   │   │   └── team/       # Team member CRUD
│   │   └── login/          # Auth login page
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── corporate-training/
│   ├── gallery/
│   ├── moondesk/
│   ├── partnerships/
│   ├── programmes/
│   └── volunteer/
├── components/
│   ├── admin/              # Admin-specific components
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # Reusable UI components
└── lib/
    ├── supabase/           # Supabase client + server helpers
    └── types.ts            # TypeScript types matching schema
```

## Admin Roles

| Role | Access |
|------|--------|
| `super_admin` | Full access to everything |
| `site_admin` | Content, programmes, gallery, partners, forms |
| `blog_editor` | Blog posts only |

## License

Private — Technology for All Initiative
