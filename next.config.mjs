/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js image optimization for better performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Allow external images if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.soundhelix.com',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig