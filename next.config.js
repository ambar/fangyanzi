/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 让 router 工作正常
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // 让部署工作正常
  // https://nextjs.org/docs/deployment#static-only
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
}

module.exports = nextConfig
