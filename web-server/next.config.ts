import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: false, // Developer modda 2 kere tetiklemeyi engeller.
  // compiler: { removeConsole: process.env.NODE_ENV === "production" }, // console.log/debug çağrılarını koddan tamamen çıkarır.
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self' https: data:;
      script-src 'self' https: 'unsafe-inline' 'unsafe-eval';
      style-src 'self' https: 'unsafe-inline';
      img-src 'self' https: data: blob:;
      font-src 'self' https: data:;
      connect-src 'self' https:;
      frame-src 'self' https:;
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

export default nextConfig;
