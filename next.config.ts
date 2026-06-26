import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    // Build korar shomoy kono TS (type) error thakleo ignore korbe
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build korar shomoy kono ESLint error thakleo ignore korbe
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;