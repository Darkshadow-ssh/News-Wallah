import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }, { protocol: 'https', hostname: 'cdn.cnn.com' }, { protocol: 'https', hostname: 'media.cnn.com' }, { protocol: 'https', hostname: 'www.nytimes.com' }, { protocol: 'https', hostname: 'static01.nyt.com' }, { protocol: 'https', hostname: 'newsapi.org' },{ protocol: 'https', hostname: 'variety.com' }, { protocol: 'https', hostname: 'dims.apnews.com' }],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard for ANY host
        port: '',
        pathname: '/**', // Wildcard for ANY path
      },
    ]
  },
};

export default nextConfig;
