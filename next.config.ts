import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Mengizinkan akses dari jaringan lokal (IP)
  allowedDevOrigins: ['169.254.235.199'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
