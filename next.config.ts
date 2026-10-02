import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Routes from the earlier site structure, kept so old links don't 404.
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/services/:slug*", destination: "/solutions", permanent: true },
      { source: "/industries", destination: "/solutions", permanent: true },
      { source: "/industries/:slug*", destination: "/solutions", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
    ];
  },
};

export default nextConfig;
