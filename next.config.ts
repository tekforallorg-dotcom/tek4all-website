import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkrkgdbvtakvopbdvevs.supabase.co",
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
    ];
  },
};

export default nextConfig;
