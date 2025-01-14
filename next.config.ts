import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    fallbackNodePolyfills: false,
},
}

export default nextConfig;
