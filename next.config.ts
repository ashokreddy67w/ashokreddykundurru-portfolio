import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // The EMAS case study lives at /emas; keep one canonical URL.
  async redirects() {
    const home = "https://ashokreddykundurru.com";
    return [
      // One canonical address for search engines: www and plain http both land on the bare https domain.
      { source: "/:path*", has: [{ type: "host", value: "www.ashokreddykundurru.com" }], destination: `${home}/:path*`, permanent: true },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "ashokreddykundurru.com" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${home}/:path*`,
        permanent: true,
      },
      { source: "/projects/emas-attendance", destination: "/emas", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default createMDX({})(nextConfig);
