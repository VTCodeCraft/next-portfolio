import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 75, 95],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vtcodecraft.in",
          },
        ],
        destination: "https://www.vtcodecraft.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
