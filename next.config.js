/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Optimize for performance
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Configure compiler for smaller bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Transpile specific packages
  transpilePackages: ["lucide-react"],
  // Disable unnecessary headers
  poweredByHeader: false,
  // Move certain packages to external dependencies
  serverExternalPackages: ["framer-motion"],
  // Optimize asset loading with asset prefix if defined
  assetPrefix: process.env.ASSET_PREFIX ?? undefined,
  // Use Next.js experimental features for bundle optimization
  experimental: {
    // Disable CSS optimization which is causing issues with critters
    optimizeCss: false,
    // Optimize imports for smaller bundles
    optimizePackageImports: ["lucide-react"],
    // Enable server React optimization
    optimizeServerReact: true,
    // Improve data transfer size
    largePageDataBytes: 128 * 1000, // 128KB
    // Advanced bundle analysis (comment out if not needed)
    // bundleAnalyzer: process.env.ANALYZE === "true",
  },
};

export default config;
