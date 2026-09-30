/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  async redirects() {
    return [
      {
        source: '/assets/features/:image\\.png',
        destination: '/assets/features/:image.webp',
        permanent: true,
      },
      {
        source: '/assets/blog/:image\\.png',
        destination: '/assets/blog/:image.webp',
        permanent: true,
      },
      {
        source: '/pro',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/dashboard/pro/dashboard',
        destination: '/dashboard/pro/sessions',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
