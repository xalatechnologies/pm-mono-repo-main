const nextConfig = {
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

module.exports = nextConfig;
