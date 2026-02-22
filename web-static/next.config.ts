import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // export mode
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: false, // Developer modda 2 kere tetiklemeyi engeller.
  // compiler: { removeConsole: process.env.NODE_ENV === "production" }, // console.log/debug çağrılarını koddan tamamen çıkarır.
  images: {
    unoptimized: true, // export mode
    qualities: [75, 100],
  },
};

export default nextConfig;
