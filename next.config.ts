import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "www.snapyt.app",
      },
      {
        protocol: "https",
        hostname: "*.googlevideo.com",
      }
    ],
  },
};

export default nextConfig;
