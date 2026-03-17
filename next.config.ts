import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sdwrkbenzexefercvdho.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "assets.zyrosite.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/our-intiatives", destination: "/programmes", permanent: true },
      { source: "/our-initiatives", destination: "/programmes", permanent: true },
      { source: "/blog-list", destination: "/blog", permanent: true },
      { source: "/programs", destination: "/programmes", permanent: true },
      { source: "/partnership", destination: "/partnerships", permanent: true },
      { source: "/moondesk", destination: "https://moondesk.tekforall.org", permanent: false },
    ];
  },
};

export default nextConfig;
