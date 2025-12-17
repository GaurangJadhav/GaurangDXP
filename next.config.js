/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.contentstack.io",
      "assets.contentstack.io",
      "eu-images.contentstack.com",
      "img.youtube.com",
      "i.ytimg.com",
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

