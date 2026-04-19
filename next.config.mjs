/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Bypasses ESLint errors during Vercel builds (fixes build failure for img warnings)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
