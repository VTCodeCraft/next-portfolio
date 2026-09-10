import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Pin the workspace root.

    Turbopack infers the root by walking up for a lockfile, and there is a
    stray package-lock.json in the user profile directory above this project.
    It won that search, so module resolution ran from C:\Users\trvis and
    could not find anything in this project's node_modules — the visible
    symptom was "Can't resolve 'tailwindcss'", followed by every client
    component failing with "Could not find the module ... in the React Client
    Manifest", because the manifest keys were built from the wrong root.

    Setting this explicitly is the documented fix and keeps the project
    self-contained: it does not depend on which lockfiles happen to exist
    anywhere above the repository.
  */
  turbopack: {
    root: __dirname,
  },
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
