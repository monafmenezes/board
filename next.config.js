/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = {
  nextConfig,
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  }
}
