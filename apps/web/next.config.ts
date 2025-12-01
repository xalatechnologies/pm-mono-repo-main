import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storagepureminerals.blob.core.windows.net",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
