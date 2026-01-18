/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@vibe/ui", "@vibe/convex"],
  experimental: {
    optimizePackageImports: ["@vibe/ui"],
  },
}

module.exports = nextConfig
