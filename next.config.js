/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.freepik.com"], // Add the domain(s) you want to allow
  },
};

module.exports = nextConfig;
