import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
   output: 'export',
    images: {
      unoptimized: true,
    },
};

module.exports = nextConfig;
