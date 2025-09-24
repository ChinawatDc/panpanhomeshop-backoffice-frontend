/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  swcMinify: true,
  reactStrictMode: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASEURL_API: process.env.NEXT_PUBLIC_BASEURL_API,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },
};

export default nextConfig;
