import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,      // ← tambahkan ini
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenor.com',
      },
    ],
  },
};

export default nextConfig;
