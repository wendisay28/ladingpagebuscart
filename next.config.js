/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 🚨 Ignora errores de ESLint al hacer build en Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚨 Ignora errores de TypeScript al hacer build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
