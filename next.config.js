/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.contentstack.io" },
      { protocol: "https", hostname: "assets.contentstack.io" },
      { protocol: "https", hostname: "eu-images.contentstack.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Live news image sources
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.newsdata.io" },
      { protocol: "https", hostname: "**.cricbuzz.com" },
      { protocol: "https", hostname: "**.espncricinfo.com" },
      { protocol: "https", hostname: "**.bcci.tv" },
      { protocol: "https", hostname: "**.icc-cricket.com" },
    ],
  },
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION,
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
  },
};

module.exports = nextConfig;

