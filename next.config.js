/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    allowedDevOrigins: ['itzdevoo.com']
  }
}

module.exports = nextConfig