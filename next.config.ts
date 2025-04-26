import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['images.unsplash.com'],
    unoptimized: true,  // disables all next/image optimizations
    remotePatterns: [], // empty allowed patterns
  }
};

export default nextConfig;
