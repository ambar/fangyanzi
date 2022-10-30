/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // https://nextjs.org/docs/deployment#static-only
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
}

module.exports = nextConfig
