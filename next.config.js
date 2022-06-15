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
    domains: ['joeschmoe.io/']
  }
}
