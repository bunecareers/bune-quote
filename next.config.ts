import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// Makes the D1 and email bindings available under `next dev`.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Cache Components stay off: they hang on Cloudflare Workers, and the
  // pages are fully static anyway.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
