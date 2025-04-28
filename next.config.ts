import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  
  images : {
    remotePatterns : [
      {
        protocol : 'https',
        hostname : 'tenor.com'
      }
    ]
  }
};

export default nextConfig;
