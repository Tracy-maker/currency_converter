/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  basePath: "/src",
};

export default nextConfig;
