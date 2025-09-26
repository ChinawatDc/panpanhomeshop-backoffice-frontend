/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  swcMinify: true,
  reactStrictMode: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASEURL_API_DOC: process.env.NEXT_PUBLIC_BASEURL_API_DOC,
    NEXT_PUBLIC_BASEURL_API_DEV: process.env.NEXT_PUBLIC_BASEURL_API_DEV,
    NEXT_PUBLIC_BASEURL_API_PROD: process.env.NEXT_PUBLIC_BASEURL_API_PROD,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },
};

export default nextConfig;
